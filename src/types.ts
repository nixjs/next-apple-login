export namespace Types {
    export type Object<T> = Record<string, T>
    export type Nullable<T> = T | null

    export interface AppleAuthorization {
        code: string
        id_token: string
        state: string
    }

    export interface AppleUser {
        email: string
        name: Types.Object<string>
    }

    export interface AppleResponse {
        code?: string | number
        error?: any
        authorization?: Types.Nullable<AppleAuthorization>
        user?: AppleUser
    }

    export interface ButtonApplePropArg {
        clientId: string // The developer’s client identifier, as provided by WWDR. You must obtain a client identifier from WWDR before you can use Sign In with Apple.
        redirectURI: string // The URI to which the authorization redirects. The URI provided must redirect to a website under your control. Supply this URI to WWDR to enable this feature.
        responseType: 'code' | 'id_token'
        responseMode: 'query' | 'fragment' | 'form_post'
        usePopup?: boolean // A Boolean that enables showing the flow in a popup.
        state?: string // The current state of the request. You create and send this property to Apple, and Apple returns it during authentication. Provide information about the state of your app inside of the property, such as “Initial user authentication request”. Use this property to help authenticate the returned response by comparing Apple’s response to the state you sent.
        nonce?: string // The value that associates a client session and an ID token. This value mitigates replay attacks and is present only if passed during the authorization request.
        scope?: string // The amount of user information requested from Apple. You can request the user’s name or email. You can also choose to request both, or neither. Use space separation when requesting multiple scopes; for example, "scope=name email".
        className?: string
        callback?: (args: AppleResponse) => void
        triggerClick?: () => void
        children?: React.ReactNode
    }
}
