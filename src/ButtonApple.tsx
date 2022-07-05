import React from 'react'
import Script from 'next/script'
import { Types } from './types'

declare let AppleID: any

const generateQueryString = (q: any) => {
    let queryString = ''
    if (q) {
        const queryKeys = Object.keys(q)
        queryKeys.forEach((key) => {
            if (q[key]) {
                if (q[key].toString().length) {
                    queryString += `${key}=${q[key]}&`
                }
            }
        })
        if (queryKeys.length > 0 && queryString[queryString.length - 1] === '&') {
            queryString = queryString.slice(0, -1)
        }
    }
    return queryString
}

export const ButtonApple: React.FC<Types.ButtonApplePropArg & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
    clientId,
    redirectURI,
    responseType,
    responseMode,
    usePopup = true,
    state = 'state',
    nonce = 'nonce',
    scope = 'email name',
    className = 'button--apple',
    children,
    callback,
    triggerClick,
    ...props
}) => {
    const [loaded, setLoaded] = React.useState<boolean>(false)

    const onClickApple = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e) {
            e.preventDefault()
        }
        if (typeof triggerClick === 'function') {
            triggerClick()
        }
        if (!usePopup) {
            window.location.href = `https://appleid.apple.com/auth/authorize?${generateQueryString({
                response_type: responseType,
                response_mode: responseMode,
                client_id: clientId,
                redirect_uri: encodeURIComponent(redirectURI),
                state,
                nonce,
                scope: responseMode === 'query' ? '' : scope,
            })}`
        } else {
            try {
                const data = await AppleID.auth.signIn()
                if (typeof callback === 'function' && data) {
                    callback(data)
                }
            } catch (err) {
                if (typeof callback === 'function') {
                    callback({ error: err })
                }
            }
        }
    }

    React.useEffect(() => {
        if (!usePopup) {
            if (typeof callback === 'function' && responseMode === 'query' && responseType === 'code' && window && window.location) {
                let match
                const pl = /\+/g, // Regex for replacing addition symbol with a space
                    search = /([^&=]+)=?([^&]*)/g,
                    decode = (s: any) => {
                        return decodeURIComponent(s.replace(pl, ' '))
                    },
                    query = window.location.search.substring(1)

                const urlParams: { [key: string]: any } = {}

                while ((match = search.exec(query))) {
                    urlParams[decode(match[1])] = decode(match[2])
                }
                if (urlParams['code']) {
                    callback({
                        code: urlParams['code'],
                    })
                }
            }
        }
    }, [])

    React.useEffect(() => {
        if (usePopup && loaded) {
            AppleID.auth.init({
                clientId,
                scope,
                redirectURI: redirectURI || `${location.protocol}//${location.host}${location.pathname}`,
                state,
                nonce,
                usePopup,
            })
        }
    }, [usePopup, loaded, clientId, scope, redirectURI, state, nonce])

    return (
        <>
            <Script
                src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
                onLoad={() => {
                    setLoaded(true)
                }}
            />
            <button className={className} onClick={onClickApple} {...props}>
                {children}
            </button>
        </>
    )
}

ButtonApple.displayName = 'ButtonApple'
