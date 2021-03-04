import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    client: null,
    GoogleAuth: null,
    access_token: null,
  };

  // api = axios.create({
  //   baseURL:'https://www.googleapis.com/calendar/v3'
  // })

  testEvent = {
    summary: "Testing Event!",
    location: "Mirpur, Dhaka",
    description: "Testing my event",
    start: {
      dateTime: "2021-02-27T09:00:00-07:00",
    },
    end: {
      dateTime: "2021-02-27T17:00:00-07:00",
    },
    // 'recurrence': [
    //   'RRULE:FREQ=DAILY;COUNT=2'
    // ],
    attendees: [{ email: "xyz@gmail.com" }, { email: "abc@example.com" }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

  gapi = window.gapi;
  CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
  API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];

  SCOPES = "https://www.googleapis.com/auth/calendar.events";

  componentDidMount() {
    this.gapi?.load("client:auth2", () => {
      console.log("gapi loaded");
      // console.log(gapi.client.getToken);
    });
  }

  authorize = () => {
    // console.log(this.gapi);
    if (!this.gapi) return;
    // this.gapi?.client.load("calendar", "v3", () => console.log("calendar"));
    // var tempGauth = this.gapi?.auth2.getAuthInstance();

    // tempGauth.signIn().then(() => {
    //   console.log({ ...this.gapi.client });
    //   this.setState({ client: this.gapi.client, GoogleAuth: tempGauth });
    // });

    //     access_type=offline&
    //  include_granted_scopes=true&
    //  response_type=code&
    //  state=state_parameter_passthrough_value&
    //  redirect_uri=https%3A//oauth2.example.com/code&
    //  client_id=client_id

    this.gapi.auth2.authorize(
      {
        client_id: this.CLIENT_ID,
        scope: this.SCOPES,
        response_type: "code",
        access_type: "offline",
        redirect_uri: "http://192.168.0.106.nip.io:4000",
        // prompt: "consent",
      },
      (response) => {
        if (response.error) {
          // An error happened!
          return;
        }
        // The user authorized the application for the scopes requested.
        var accessToken = response.access_token;
        // var idToken = response.id_token;
        console.log(response);
        // You can also now use gapi.client to perform authenticated requests.
        console.log(this.gapi.client);
        this.gapi?.client.load("calendar", "v3", () => console.log("calendar"));
        this.setState({
          client: this.gapi.client,
          access_token: accessToken,
        });
      }
    );
  };

  getCode = () => {
    let str = this.props.location.search;
    let fields = str.substring(1, str.length).split("&");
    let code = fields[0].split("=")[1];
    console.log(code);
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        title: "foo",
        body: "bar",
        userId: 1,
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
  };

  getData = () => {
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
    console.log({ ...this.gapi.client.setToken() });
  };

  insertEvent = () => {
    var request = this.gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: this.testEvent,
    });

    request.execute((event) => {
      console.log(event);
      window.open(event.htmlLink);
    });
  };

  render() {
    return (
      <>
        {/* Sign In Handle */}
        <div style={{ textAlign: "center", fontSize: "2rem" }}>
          {/* {this.state.GoogleAuth !== null && (
            <span>
              {this.state.GoogleAuth.currentUser
                .get()
                .getBasicProfile()
                .getEmail()}
            </span>
          )} */}
          <button
            onClick={this.authorize}
            style={{ fontSize: "2rem", margin: "3rem", padding: "1rem" }}
          >
            Add Account
          </button>
        </div>

        {/* Get Events From Calendar */}
        <div style={{ textAlign: "center" }}>
          <button
            disabled={this.state.client === null}
            onClick={this.getData}
            style={{ fontSize: "2rem", margin: "1rem", padding: "1rem" }}
          >
            Get Data
          </button>
        </div>

        {/* Insert Event in Calendar */}
        <div style={{ textAlign: "center" }}>
          <button
            disabled={this.state.client === null}
            onClick={this.insertEvent}
            style={{ fontSize: "2rem", margin: "1rem", padding: "1rem" }}
          >
            Insert Event
          </button>
        </div>

        <div style={{ margin: "2rem", fontSize: "1.2rem" }}>
          <b>Event details:</b>
          <br />
          {JSON.stringify(this.testEvent)}
        </div>

        <button onClick={this.getCode}>Code</button>

        <a
          href={
            "https://accounts.google.com/o/oauth2/v2/auth?scope=" +
            this.SCOPES +
            "&access_type=offline&include_granted_scopes=true&response_type=code&redirect_uri=http://192.168.0.106.nip.io:4000&client_id=" +
            this.CLIENT_ID +
            "&prompt=consent"
          }
        >
          Authorize
        </a>
      </>
    );
  }
}

export default App;
