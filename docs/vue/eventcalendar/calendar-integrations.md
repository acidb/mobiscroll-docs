---
sidebar_position: 3
sidebar_label: Calendar integrations
displayed_sidebar: vueSidebar
toc_min_heading_level: 1
toc_max_heading_level: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GoogleMethods from '../_auto-generated/googlecalendar/methods.md';
import GoogleEvents from '../_auto-generated/googlecalendar/events.md';
import GoogleOptions from '../_auto-generated/googlecalendar/options.md';
import OutlookMethods from '../_auto-generated/outlookcalendar/methods.md';
import OutlookEvents from '../_auto-generated/outlookcalendar/events.md';
import OutlookOptions from '../_auto-generated/outlookcalendar/options.md';

# Third party calendar integration

The Calendar Integration is an optional plugin, that includes synchronization with your Google and Outlook calendar services. It can be installed and used with the Mobiscroll Event Calendar as described below.

## Installing the Calendar Integration Plugin

When your Mobiscroll package is created with the [Download Builder](https://download.mobiscroll.com) and you have access to the Calendar Integration, you can choose to include it in the built package. In this case you will need to make sure you checked the Calendar Integration before downloading the package from the download page. After installing your downloaded package, the Calendar Integration will be available for import.

When you're using the full Mobiscroll package from NPM, then you have the possibility to install the Calendar Integration as an additional package (also from NPM). In this case, after successfully using the [Mobiscroll CLI](https://docs.mobiscroll.com/cli) to configure the project, you will have to install the `@mobiscroll/calendar-integration` package from npm. Use the following command:

```bash
npm install @mobiscroll/calendar-integration
```

## Google calendar integration

The Google Calendar Integration is a part of the third party calendar integrations plugin that manages the synchronization with your Google calendar services.

### Public google calendars

Calling the `init` function will do the necessary initializations for the third party. After the init, you can list the events from the public calendar.

```html
<script>
  import { ref } from "vue";
  import { googleCalendarSync} from "@mobiscroll/calendar-integration";

  const myEvents = ref([]);

  // init google client
  googleCalendarSync.init({
    apiKey: 'YOUR_APY_KEY',
    onInit: () => {
      googleCalendarSync.getEvents(
        'PUBLIC_CALENDAR_ID',
        new Date(2022, 1, 1),
        new Date(2022, 3, 0)
      ).then((events) => {
          myEvents.value = events;
      });
    },
  });
</script>
<template>
  <MbscEventcalendar :data="myEvents" />
</template>
```

### Private google calendars

Calling the `init` function will do the necessary initializations for the third party. For this step you need to use an API key and a client ID. After the `init`, you can sign in, list your calendars and events and create, update or delete the events on the calendars you have permission to.

```html
<script>
  import { ref } from "vue";
  import { googleCalendarSync} from "@mobiscroll/calendar-integration";

  const myEvents = ref([]);

  // init google client
  googleCalendarSync.init({
  apiKey: 'YOUR_APY_KEY',
    clientId: 'YOUR_CLIENT_ID',
    onSignedIn: () => {
      googleCalendarSync.getEvents(
        ['MY_FIRST_CALENDAR_ID', 'MY_SECOND_CALENDAR_ID'],
          new Date(2022, 1, 1),
          new Date(2022, 3, 0)
      ).then((events) => {
        myEvents.value = events;
      });
    },
    onSignedOut: () => {
      myEvents.value = [];
    },
});
</script>
<template>
  <MbscEventcalendar :data="myEvents" />
</template>
```

### Server side tokens

By default the authentication happens entirely on the client side. However, since the introduction of the new [Google Identity Services](https://developers.google.com/identity/gsi/web), the received access token, which ensures access to the user's calendars, is only valid for an hour. After expiry, the user will be prompted again for consent.

You can refresh an access token without prompting the user for permission, but this needs to be done server side. To enable this, in the init config object set the auth option to `'server'`, and specify the `authUrl` and `refreshUrl` pointing to your server endpoints.

The `authUrl` endpoint will receive a POST request, containing a unique authorization code. To exchange an authorization code for an access token, send a POST request to the https://oauth2.googleapis.com/token endpoint and set the following parameters:

* `client_id` - The client ID obtained from the Google API Console Credentials page.
* `client_secret` - The client secret obtained from the Google API Console Credentials page.
* `code` - The received authorization code.
* `grant_type` - This field's value must be set to `authorization_code`.
* `redirect_uri` - This field's value must be set to `postmessage`.

``` title="A sample request"
POST /token HTTP/1.1
Host: oauth2.googleapis.com
Content-Type: application/x-www-form-urlencoded

code=4/P7q7W91a-oMsCeLvIaQm6bTrgtp7&
client_id=your_client_id&
client_secret=your_client_secret&
redirect_uri=postmessage&
grant_type=authorization_code
```

``` title="A sample response"
{
  "access_token": "1/fFAGRNJru1FTz70BzhT3Zg",
  "expires_in": 3599,
  "token_type": "Bearer",
  "scope": "https://www.googleapis.com/auth/calendar.events.public.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events.owned",
  "refresh_token": "1//xEoDL4iW3cxlI7yDbSRFYNG01kVKM2C-259HOF2aQbI"
}
```
Return the received response from the request.

The `refreshUrl` endpoint will also receive a POST request, containing the refresh token, received earlier. To refresh an access token, send a POST request to the https://oauth2.googleapis.com/token endpoint and set the following parameters:

* `client_id` - The client ID obtained from the Google API Console Credentials page.
* `client_secret` - The client secret obtained from the Google API Console Credentials page.
* `refresh_token` - The received refresh token.
* `grant_type` - This field's value must be set to `refresh_token`.

``` title="A sample request"
POST /token HTTP/1.1
Host: oauth2.googleapis.com
Content-Type: application/x-www-form-urlencoded

client_id=your_client_id&
client_secret=your_client_secret&
refresh_token=your_refresh_token&
grant_type=refresh_token
```

``` title="A sample response"
{
  "access_token": "1/fFAGRNJru1FTz70BzhT3Zg",
  "expires_in": 3599,
  "token_type": "Bearer",
  "scope": "https://www.googleapis.com/auth/calendar.events.public.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events.owned"
}
```
Return the received response from the request.

#### Complete example

A complete example with Node.js, ASP.NET and PHP

<Tabs>

<TabItem value="node" label="Node.js">

```js
// Client
import { googleCalendarSync } from '@mobiscroll/calendar-integration';

googleCalendarSync.init({
  auth: 'server',
  authUrl: 'http://example.com/auth',
  clientId: 'YOUR_CLIENT_ID',
  refreshUrl: 'http://example.com/refresh',
});

// Server
const http = require('http');
const https = require('https');

const YOUR_CLIENT_ID = 'YOUR_CLIENT_ID';
const YOUR_CLIENT_SECRET = 'YOUR_CLIENT_SECRET';

function getToken(type, codeOrToken, callback) {
    const postData =
        'client_id=' + YOUR_CLIENT_ID + '&' +
        'client_secret=' + YOUR_CLIENT_SECRET + '&' +
        (type === 'refresh' ?
            'grant_type=refresh_token&' +
            'refresh_token=' + codeOrToken
            :
            'grant_type=authorization_code&' +
            'code=' + codeOrToken + '&' +
            'redirect_uri=postmessage&' +
            'code_verifier='
        )

    const postOptions = {
        host: 'oauth2.googleapis.com',
        port: '443',
        path: '/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const postReq = https.request(postOptions, function (response) {
        response.setEncoding('utf8');
        response.on('data', d => {
            callback(d);
        });
    });

    postReq.on('error', (error) => {
        console.log(error)
    });

    // Post the request with data
    postReq.write(postData);
    postReq.end();
}

function getPostData(req, callback) {
    let body = '';

    req.on('data', (data) => {
        body += data;
    });

    req.on('end', () => {
        const parsed = new URLSearchParams(body);
        const data = {}
        for (const pair of parsed.entries()) {
            data[pair[0]] = pair[1];
        }
        callback(data);
    });
}

function checkCSRF(req, res) {
    // Check if CSRF header is present
    if (req.headers['x-requested-with'] === 'XmlHttpRequest') {
        return true;
    }
    // Otherwise end the request
    res.statusCode = 500;
    res.end();
    return false;
}

function sendResponse(res, data) {
    // Set the headers in case of CORS request
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
    // Send data
    res.end(data);
}

const server = http.createServer(function (req, res) {
    if (req.method === 'OPTIONS') { // Handle preflight request (in case of CORS request)
        res.setHeader('Access-Control-Allow-Origin', '*'); // Use your own domain instead of the '*'
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
        res.end();
    } else if (req.url.startsWith('/auth')) { // Handle auth
        if (checkCSRF(req, res)) {
            getPostData(req, (data) => {
                // Exchange auth code to access token (on sign in)
                getToken('auth', data.code, (token) => {
                    sendResponse(res, token);
                });
            });
        }
    } else if (req.url.startsWith('/refresh')) { // Handle refresh
        if (checkCSRF(req, res)) {
            getPostData(req, (data) => {
                // Exchange refresh token to access token (on access token expiry)
                getToken('refresh', data.refresh_token, (token) => {
                    sendResponse(res, token);
                });
            });
        }
    }
});

server.listen(8080);
```

</TabItem>
<TabItem value="cs" label="ASP.NET">

```csharp
class HttpServer
{
    public static HttpListener listener;
    public static string url = "http://localhost:8080/";
    private static readonly HttpClient client = new HttpClient();

    public static Dictionary GetKeyValuePairs(string data)
    {
        return data.Split('&')
            .Select(value => value.Split('='))
            .ToDictionary(pair => pair[0], pair => pair[1]);
    }

    public static void SendResponse(HttpListenerRequest request, HttpListenerResponse resp, string type)
    {
        if (!request.HasEntityBody)
        {
            resp.Close();
        }
        Stream body = request.InputStream;
        StreamReader reader = new StreamReader(body, request.ContentEncoding);
        string codeOrToken = type == "auth" ? GetKeyValuePairs(reader.ReadToEnd())["code"] : GetKeyValuePairs(reader.ReadToEnd())["refresh_token"];
        string postData = "client_id=" + YOUR_CLIENT_ID + "&" +
        "client_secret=" + YOUR_CLIENT_SECRET + "&" +
        (type == "refresh" ?
            "grant_type=refresh_token&" +
            "refresh_token=" + codeOrToken
            :
            "grant_type=authorization_code&" +
            "code=" + codeOrToken + "&" +
            "redirect_uri=postmessage&" +
            "code_verifier=");

        // Set the headers in case of CORS request
        resp.AppendHeader("Access-Control-Allow-Origin", "*");
        resp.AppendHeader("Access-Control-Allow-Headers", "X-Requested-With");

        // Post the request with data
        FormUrlEncodedContent content = new FormUrlEncodedContent(GetKeyValuePairs(postData));
        HttpResponseMessage response = client.PostAsync("https://oauth2.googleapis.com/token", content).Result;

        if (response.IsSuccessStatusCode)
        {
            HttpContent responseContent = response.Content;
            string responseString = responseContent.ReadAsStringAsync().Result;
            byte[] buffer = Encoding.UTF8.GetBytes(responseString);
            // Get a response stream and write the response to it
            resp.ContentLength64 = buffer.Length;
            Stream output = resp.OutputStream;
            output.Write(buffer, 0, buffer.Length);
            output.Close();
        }
        else
        {
            Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
        }
        resp.Close();
    }

    public static bool CheckCSRF(HttpListenerRequest req, HttpListenerResponse resp)
    {
        // Check if CSRF header is present
        if (req.Headers["x-requested-with"] == "XmlHttpRequest")
        {
            return true;
        }
        // Otherwise end the request
        resp.StatusCode = 500;
        resp.Close();
        return false;
    }

    public static async Task HandleIncomingConnections()
    {
        bool runServer = true;

        // Handling requests
        while (runServer)
        {
            HttpListenerContext ctx = await listener.GetContextAsync();
            HttpListenerRequest req = ctx.Request;
            HttpListenerResponse resp = ctx.Response;

            if (req.HttpMethod == "OPTIONS")
            {   // Handle preflight request (in case of CORS request)
                resp.AppendHeader("Access-Control-Allow-Origin", "*");  // Use your own domain instead of the '*'
                resp.AppendHeader("Access-Control-Allow-Headers", "X-Requested-With");
                resp.Close();
            }
            else if (req.Url.ToString().Contains("/auth"))
            {   // Handle auth
                if (CheckCSRF(req, resp))
                {
                    SendResponse(req, resp, "auth");
                }
            }
            else if (req.Url.ToString().Contains("/refresh"))
            {   // Handle refresh
                if (CheckCSRF(req, resp))
                {
                    SendResponse(req, resp, "refresh");
                }
            }
        }
    }

    public static void Main()
    {
        // Create a Http server and start listening for incoming connections
        listener = new HttpListener();
        listener.Prefixes.Add("http://localhost:8080/");
        listener.Start();

        // Handle requests
        Task listenTask = HandleIncomingConnections();
        listenTask.GetAwaiter().GetResult();

        // Close the listener
        listener.Close();
    }
}
```

</TabItem>

<TabItem value="php" label="PHP">

```php
function checkCSRF()
{
    // Check if CSRF header is present
    if ($_SERVER['HTTP_X_REQUESTED_WITH'] === 'XmlHttpRequest') {
        return true;
    }

    // Otherwise end the request
    header("HTTP/1.1 500 Internal Server Error");
    return false;
}

function sendResponse($type)
{
    // Set the headers in case of CORS request
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: X-Requested-With');

    // The data you want to send via POST
    $post_data = [
        "client_id" => $YOUR_CLIENT_ID,
        "client_secret" => $YOUR_CLIENT_SECRET,
        "grant_type" => $type === 'refresh' ? "refresh_token" : "authorization_code",
        "refresh_token" => $type === 'refresh' ? $_POST['refresh_token'] : "",
        "code" => $type === 'refresh' ? "" : $_POST['code'],
        "redirect_uri" => "postmessage",
        "code_verifier" => ""
    ];

    // url-ify the data for the POST
    $data_string = http_build_query($post_data);

    // Open connection
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/x-www-form-urlencoded',
        'Content-Length: ' . strlen($data_string),
    ));

    // Set the url, number of POST vars, POST data
    curl_setopt($ch, CURLOPT_URL, "https://oauth2.googleapis.com/token");
    curl_setopt($ch, CURLOPT_PORT, 443);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    // SSL options are set for testing purposes
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);


    // So that curl_exec returns the contents of the cURL; rather than echoing it
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute post
    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        print curl_error($ch);
    }
    echo $result;
    curl_close($ch);
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { // Handle preflight request (in case of CORS request)
    header('Access-Control-Allow-Origin: *'); // Use your own domain instead of the '*'
    header('Access-Control-Allow-Headers: X-Requested-With');
} else if (htmlspecialchars($_GET["action"]) === 'auth') { // Handle auth
    if (checkCSRF()) {
        sendResponse('auth');
    }
} else if (htmlspecialchars($_GET["action"]) === 'refresh') { // Handle refresh
    if (checkCSRF()) {
        sendResponse('refresh');
    }
}
```

</TabItem>

</Tabs>

### API {#google-api}

<div className="option-list">

#### Configuration options {#google-options}

  <GoogleOptions />

#### Events {#google-events}

  <GoogleEvents />

#### Methods {#google-methods}

  <GoogleMethods />

</div>

## Outlook calendar integration

The Outlook Calendar Integration is a part of the third party calendar integrations plugin that manages the synchronization with your Outlook calendar services.

### Outlook calendars

Calling the `init` function will do the necessary initializations for the third party. For this step you need to use a [client ID](https://docs.microsoft.com/en-us/graph/auth-v2-user). After the init, you can sign in, list your calendars and events and create, update or delete the events on the calendars you have permission to.

```html
<script>
  import { ref } from "vue";
  import { outlookCalendarSync} from "@mobiscroll/calendar-integration";

  const myEvents = ref([]);

  // init outlook client
  outlookCalendarSync.init({
    clientId: 'YOUR_CLIENT_ID',
    onSignedIn: () => {
      outlookCalendarSync.getEvents(
        ['MY_FIRST_CALENDAR_ID', 'MY_SECOND_CALENDAR_ID'],
        new Date(2022, 1, 1),
        new Date(2022, 3, 0)
      ).then((events) => {
        myEvents.value = events;
      });
    },
    onSignedOut: () => {
      myEvents.value = [];
    },
  });
</script>
<template>
  <MbscEventcalendar :data="myEvents" />
</template>
```

### API {#outlook-api}

<div className="option-list">

#### Configuration options {#outlook-config}

  <OutlookOptions />

#### Events {#outlook-events}

  <OutlookEvents />

#### Methods {#outlook-methods}

  <OutlookMethods />

</div>