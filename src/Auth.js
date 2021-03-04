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
