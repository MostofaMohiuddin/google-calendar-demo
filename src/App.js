import React, { Component } from "react";

class App extends Component {
  state = {
    client: null,
  };

  gapi = window.gapi;
  CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];

  SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  authorize = () => {
    // console.log(this.gapi);
    // if (!gapi) return;
    this.gapi?.load("client:auth2", () => {
      // console.log("loaded");
      // console.log(gapi.client.getToken);
      this.gapi?.client.init({
        apiKey: this.API_KEY,
        clientId: this.CLIENT_ID,
        discoveryDocs: this.DISCOVERY_DOCS,
        scope: this.SCOPES,
      });
      this.gapi?.client.load("calendar", "v3", () => console.log("calendar"));
      this.gapi?.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          this.setState({ client: this.gapi.client });
        });
    });
  };

  getData = () => {
    // console.log(this.state.client);
    this.state.client.calendar.events
      .list({
        calendarId: "primary", // can pass many params for query
      })
      .then((res) => {
        console.log(res.result.items);
      });
  };

  render() {
    return (
      <>
        <div style={{ textAlign: "center" }}>
          <button
            onClick={this.authorize}
            style={{ fontSize: "2rem", margin: "3rem", padding: "1rem" }}
          >
            Add Account
          </button>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            disabled={this.state.client === null}
            onClick={this.getData}
            style={{ fontSize: "2rem", margin: ".5rem", padding: "1rem" }}
          >
            Get Data
          </button>
        </div>
      </>
    );
  }
}

export default App;
