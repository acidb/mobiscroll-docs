### apiKey {#opt-google-apiKey}

string

The API Key obtained from the Google API Console Credentials page.
### auth {#opt-google-auth}

"client" &#124; "server"

When set to `'server'`, server-side endpoints must be implemented to get the auth access token from Google.
### authUrl {#opt-google-authUrl}

string

Server side endpoint for receiving an access token from Google on sign in, when the `auth` option is set to `'server'`.
### clientId {#opt-google-clientId}

string

The client ID obtained from the Google API Console Credentials page.
### gapi {#opt-google-gapi}

any

The gapi object, if already loaded. If not specified, the library will load it.
### gis {#opt-google-gis}

any

The Google Identity Services client library, if already loaded. If not specified, the library will load it.
### refreshUrl {#opt-google-refreshUrl}

string

Server side endpoint for receiving a new access token from Google on expiry, when the `auth` option is set to `'server'`.
### scopes {#opt-google-scopes}

string

Specify custom scopes for Google authentication.
The default scopes are
`'https://www.googleapis.com/auth/calendar.events.public.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events.owned'`
### timezone {#opt-google-timezone}

string

If specified, the event dates will be returned in this timezone.
### timezonePlugin {#opt-google-timezonePlugin}

[MbscTimezonePlugin](#type-MbscTimezonePlugin)

The timezone plugin, needed if timezone is specified.

The [`MbscTimezonePlugin`](#type-MbscTimezonePlugin) type has the following properties:
 - `createDate`: *(s: any, year: string &#124; number &#124; Date &#124; MbscTimezonedDate, month: number, date: number, h: number, min: number, sec: number, ms: number) => MbscTimezonedDate* - 
 - `parse`: *(date: string &#124; number, s: any) => MbscTimezonedDate* - 


