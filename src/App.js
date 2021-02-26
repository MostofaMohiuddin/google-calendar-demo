import React, { Component } from "react";

class App extends Component {
  state = {
    client: null,
    GoogleAuth: null,
  };

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
  API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];

  SCOPES = "https://www.googleapis.com/auth/calendar.events";

  componentDidMount() {
    this.gapi?.load("client:auth2", () => {
      console.log("gapi loaded");
      // console.log(gapi.client.getToken);
      this.gapi?.client.init({
        apiKey: this.API_KEY,
        clientId: this.CLIENT_ID,
        discoveryDocs: this.DISCOVERY_DOCS,
        scope: this.SCOPES,
      });
    });
  }

  authorize = () => {
    // console.log(this.gapi);
    if (!this.gapi) return;
    this.gapi?.client.load("calendar", "v3", () => console.log("calendar"));
    var tempGauth = this.gapi?.auth2.getAuthInstance();

    tempGauth.signIn().then(() => {
      console.log({ ...this.gapi.client });
      this.setState({ client: this.gapi.client, GoogleAuth: tempGauth });
    });
  };

  getData = () => {
    // console.log(this.state.client);
    console.log(
      this.state.GoogleAuth.currentUser.get().getBasicProfile().getEmail()
    );
    this.state.client.calendar.events
      .list({
        calendarId: "primary", // can pass many params for query
      })
      .then((res) => {
        console.log(res.result.items);
      });
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
          {this.state.GoogleAuth !== null && (
            <span>
              {this.state.GoogleAuth.currentUser
                .get()
                .getBasicProfile()
                .getEmail()}
            </span>
          )}
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
      </>
    );
  }
}

export default App;
