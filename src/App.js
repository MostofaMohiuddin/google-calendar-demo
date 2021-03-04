import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    loadingEvent: false,
    loadingBusy: false,
    userEvents: null,
    userBusy: null,
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

  getUserEventData = () => {
    this.setState({ loadingEvent: true });
    axios
      .get("http://192.168.0.106.nip.io:4000/event-list")
      .then((res) => {
        console.log(res);
        this.setState({
          loadingEvent: false,
          userEvents: res.data.items,
        });
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({
          loadingEvent: false,
        });
      });
  };

  getUserBusyData = () => {
    this.setState({ loadingBusy: true });
    axios
      .get("http://192.168.0.106.nip.io:4000/busy")
      .then((res) => {
        console.log(res);
        this.setState({
          loadingBusy: false,
          userBusy: res.data,
        });
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({
          loadingBusy: false,
        });
      });
  };

  render() {
    return (
      <>
        {/* Event data container */}
        <div className="container " style={{ marginTop: "2rem" }}>
          {this.state.userEvents !== null ? (
            <table class="table table-striped text-center">
              <thead>
                <tr>
                  <th scope="col">Events</th>
                </tr>
              </thead>
              <tbody>
                {this.state.userEvents.map((event) => (
                  <tr>
                    <td>{JSON.stringify(event)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div class="alert alert-info text-center" role="alert">
              Event Data Will Be Shown Here
            </div>
          )}

          <div style={{ textAlign: "center" }}>
            <button
              className="btn btn-primary"
              disabled={this.state.loadingEvent}
              onClick={this.getUserEventData}
              style={{ fontSize: "2rem", margin: "1rem", padding: "1rem" }}
            >
              Get Event Data
            </button>
          </div>
        </div>

        {/* busy data container */}
        <div className="container " style={{ marginTop: "2rem" }}>
          {this.state.userBusy !== null ? (
            <table class="table table-striped text-center">
              <thead>
                <tr>
                  <th scope="col">Events</th>
                </tr>
              </thead>
              <tbody>
                {this.state.userBusy.map((event) => (
                  <tr>
                    <td>{JSON.stringify(event)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div class="alert alert-info text-center" role="alert">
              Busy Data Will Be Shown Here
            </div>
          )}

          <div style={{ textAlign: "center" }}>
            <button
              className="btn btn-primary"
              disabled={this.state.loadingBusy}
              onClick={this.getUserBusyData}
              style={{ fontSize: "2rem", margin: "1rem", padding: "1rem" }}
            >
              Get Busy Data
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default App;
