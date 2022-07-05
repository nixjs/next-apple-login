# @nixjs23n6/next-apple-login

Apple signin for React using the official Apple JS SDK and Nextjs

## Quick Setup

### Install

Install these dependencies:

`yarn add @nixjs23n6/next-apple-login`

### Setup & Usage

```javascript
import React from 'react'
import getConfig from 'next/config'
import { ButtonApple, AppleResponse } from '@nixjs23n6/next-apple-login'

const { publicRuntimeConfig } = getConfig()

interface LoginPropArg {}

export const Login: React.FC<LoginPropArg> = () => {
    const responseApple = (response: AppleResponse) => {
        console.log(response, response.authorization?.id_token)
    }

    return (
        <ButtonApple
            // The developer’s client identifier, as provided by WWDR.
            clientId={publicRuntimeConfig.NEXT_PUBLIC_APPLE_CLIENT_ID}
            // The URI to which the authorization redirects.
            redirectURI={publicRuntimeConfig.NEXT_PUBLIC_REDIRECT}
            // The type of response requested. Valid values are code and id_token. You can request one or both. When requesting an id_token response type, response_mode must be either fragment or form_post.
            responseType="id_token"
            // The type of response mode expected. Valid values are query, fragment, and form_post. If you requested any scopes, the value must be form_post.
            responseMode="query"
            callback={responseApple}
        >
            <svg className="svg-view">
                <symbol id="svg-apple" viewBox="0 0 21 24" preserveAspectRatio="xMinYMin meet">
                    <path d="M19.3201 17.0726C19.1929 17.441 19.0597 17.7926 18.9181 18.1298C18.5725 18.9266 18.1645 19.6598 17.6917 20.333C17.0485 21.2522 16.5205 21.8882 16.1137 22.241C15.4837 22.8206 14.8081 23.1182 14.0845 23.1338C13.5649 23.1338 12.9397 22.9862 12.2101 22.6874C11.4793 22.3886 10.8073 22.241 10.1929 22.241C9.54852 22.241 8.85732 22.3886 8.11812 22.6874C7.37772 22.9862 6.78132 23.1434 6.32532 23.1578C5.63172 23.1878 4.94052 22.883 4.25052 22.241C3.81012 21.857 3.25932 21.1982 2.59932 20.2658C1.89132 19.2698 1.30932 18.1142 0.853317 16.7966C0.364917 15.3746 0.120117 13.997 0.120117 12.6638C0.120117 11.1362 0.450117 9.81861 1.11132 8.71461C1.63092 7.82781 2.32212 7.12821 3.18732 6.61461C4.05252 6.10101 4.98732 5.83941 5.99412 5.82261C6.54492 5.82261 7.26732 5.99301 8.16492 6.32781C9.06012 6.66381 9.63492 6.83421 9.88692 6.83421C10.0753 6.83421 10.7137 6.63501 11.7961 6.23781C12.8197 5.86941 13.6837 5.71701 14.3917 5.77701C16.3093 5.93181 17.7493 6.68781 18.7081 8.04981C16.9933 9.08901 16.1449 10.5446 16.1617 12.4118C16.1773 13.8662 16.7041 15.077 17.7409 16.0382C18.2113 16.4834 18.7369 16.8278 19.3201 17.0726ZM14.4961 0.366211C14.5117 0.518611 14.5189 0.671011 14.5189 0.822211C14.5189 1.96221 14.1025 3.02661 13.2733 4.01181C12.2713 5.18301 11.0593 5.85981 9.74532 5.75301C9.72852 5.61621 9.71892 5.47221 9.71892 5.32101C9.71892 4.22661 10.1953 3.05541 11.0413 2.09781C11.4637 1.61301 12.0013 1.20981 12.6517 0.88821C13.3021 0.57141 13.9177 0.396211 14.4961 0.366211Z" />
                </symbol>
            </svg>
        </ButtonApple>
    )
}
```
