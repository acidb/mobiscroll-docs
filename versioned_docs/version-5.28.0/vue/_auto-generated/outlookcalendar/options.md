### clientId {#opt-outlook-clientId}

string

The client ID obtained from the Outlook web app.
### msal {#opt-outlook-msal}

any

The Microsoft Authentication Library, if already loaded. If not specified, the library will load it.
### msalClient {#opt-outlook-msalClient}

any

The instance of the client application, if already loaded. If not specified, the library will load it.
### pageSize {#opt-outlook-pageSize}

number

The maximum number of events to retreive with one request. Default value is `1000`.
### redirectUri {#opt-outlook-redirectUri}

string

The location where the authorization server sends the user once the app has been successfully authorized.
Default value is `'http://localhost:3000'`.
### timezone {#opt-outlook-timezone}

string

If specified, the event dates will be returned in this timezone.
### timezonePlugin {#opt-outlook-timezonePlugin}

MbscTimezonePlugin

The timezone plugin, needed if timezone is specified.