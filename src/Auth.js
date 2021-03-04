// Important : this file is not in use

import React, { Component } from "react";
import axios from "axios";

export class Auth extends Component {
  CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
  API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  componentDidMount() {
    let str = this.props.location.search;
    let fields = str.substring(1, str.length).split("&");
    let code = fields[0].split("=")[1];
    code = code.replace("%2", "/0");
    console.log(code);

    axios
      .post("https://oauth2.googleapis.com/token", {
        code: code,
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
        redirect_uri: "http://192.168.0.106.nip.io:3000",
        grant_type: "authorization_code",
      })
      .then((res) => console.log(res))
      .catch((error) => {
        if (error.response) {
          //do something
          console.log(error.response);
        } else if (error.request) {
          //do something else
          console.log(error.request);
        } else if (error.message) {
          //do something other than the other two
          console.log(error.message);
        }
      });
  }
  render() {
    return (
      <div>
        <a href="/">Chill Go Back Home</a>
      </div>
    );
  }
}

export default Auth;

// http://192.168.0.106.nip.io:3000/auth?code=4%2F0AY0e-g4DEQGvBW4EcurlG1NovUylP_B628tWLuWQGWrhfnlqqs_iq4pCln21RvWHREIwBw&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events#

// componentDidMount() {
//   this.gapi?.load("client:auth2", () => {
//     console.log("gapi loaded");
//   });
// }

// authorize = () => {
//   // console.log(this.gapi);
//   if (!this.gapi) return;
//   // this.gapi?.client.load("calendar", "v3", () => console.log("calendar"));
//   // var tempGauth = this.gapi?.auth2.getAuthInstance();

//   // tempGauth.signIn().then(() => {
//   //   console.log({ ...this.gapi.client });
//   //   this.setState({ client: this.gapi.client, GoogleAuth: tempGauth });
//   // });

//   //     access_type=offline&
//   //  include_granted_scopes=true&
//   //  response_type=code&
//   //  state=state_parameter_passthrough_value&
//   //  redirect_uri=https%3A//oauth2.example.com/code&
//   //  client_id=client_id

//   this.gapi.auth2.authorize(
//     {
//       client_id: this.CLIENT_ID,
//       scope: this.SCOPES,
//       response_type: "code",
//       access_type: "offline",
//       redirect_uri: "http://192.168.0.106.nip.io:4000",
//       // prompt: "consent",
//     },
//     (response) => {
//       if (response.error) {
//         // An error happened!
//         return;
//       }
//       // The user authorized the application for the scopes requested.
//       var accessToken = response.access_token;
//       // var idToken = response.id_token;
//       console.log(response);
//       // You can also now use gapi.client to perform authenticated requests.
//       console.log(this.gapi.client);
//       this.gapi?.client.load("calendar", "v3", () => console.log("calendar"));
//       this.setState({
//         client: this.gapi.client,
//         access_token: accessToken,
//       });
//     }
//   );
// };

// getCode = () => {
//   let str = this.props.location.search;
//   let fields = str.substring(1, str.length).split("&");
//   let code = fields[0].split("=")[1];
//   console.log(code);
//   axios
//     .post("https://jsonplaceholder.typicode.com/posts", {
//       title: "foo",
//       body: "bar",
//       userId: 1,
//     })
//     .then((res) => console.log(res))
//     .catch((error) => {
//       if (error.response) {
//         //do something
//         console.log(error.response);
//       } else if (error.request) {
//         //do something else
//         console.log(error.request);
//       } else if (error.message) {
//         //do something other than the other two
//         console.log(error.message);
//       }
//     });
// };

// getData = () => {
// console.log(this.state.client);
// console.log(
//   this.state.GoogleAuth.currentUser.get().getBasicProfile().getEmail()
// );
// this.state.client.calendar.events
//   .list({
//     calendarId: "primary", // can pass many params for query
//   })
//   .then((res) => {
//     console.log(res.result.items);
//   });
// axios
//   .get("https://www.googleapis.com/calendar/v3/primary/events/", {
//     params: { access_token: this.state.access_token },
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//   .then((res) => {
//     console.log(res);
//   });
//   console.log({ ...this.gapi.client.setToken() });
// };

// insertEvent = () => {
//   var request = this.gapi.client.calendar.events.insert({
//     calendarId: "primary",
//     resource: this.testEvent,
//   });

//   request.execute((event) => {
//     console.log(event);
//     window.open(event.htmlLink);
//   });
// };
