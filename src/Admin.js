import axios from "axios";
import React, { Component } from "react";

export class Admin extends Component {
  state = {
    user: null,
    loading: true,
  };
  CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
  API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];

  SCOPES = "https://www.googleapis.com/auth/calendar.events";
  componentDidMount() {
    axios
      .get("http://192.168.0.106.nip.io:4000/user")
      .then((res) => {
        console.log(res);
        this.setState({
          loading: false,
          user: res.data,
        });
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({
          loading: false,
        });
      });
  }
  render() {
    return (
      <div style={{ fontSize: "2rem", textAlign: "center", padding: "8rem" }}>
        <div style={{ fontSize: "2rem", textAlign: "center", padding: "8rem" }}>
          {this.state.loading
            ? "Loading"
            : this.state.user === null
            ? "No User In Server"
            : "Account: " + this.state.user.email}
        </div>
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
      </div>
    );
  }
}

export default Admin;
