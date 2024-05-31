### apiKey {#opt-google-apiKey}

string

The API Key obtained from the Google API Console Credentials page.
### auth {#opt-google-auth}

"server" &#124; "client"

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

MbscTimezonePlugin

The timezone plugin, needed if timezone is specified.