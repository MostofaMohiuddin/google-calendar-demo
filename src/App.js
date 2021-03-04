import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    loadingEvent: false,
    loadingBusy: false,
    userEvents: null,
    userBusy: null,
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
