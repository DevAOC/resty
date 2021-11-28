import React from "react";
import axios from "axios";
import "./app.scss";

import Header from "./components/header";
import Footer from "./components/footer";
import Form from "./components/form";
import Results from "./components/results";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      requestParams: {},
    };
  }

  callApi = async (requestParams) => {
    let API_URL = requestParams.url;
    const response = await axios.get(API_URL);

    const data = {
      Headers: response.headers,
      count: response.data.count,
      Response: response.data.results,
    };
    this.setState({ data, requestParams });
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <Form handleApiCall={this.callApi} />
        <div id="requestMethod">
          Request Method: {this.state.requestParams.method}
        </div>
        <div id="url">URL: {this.state.requestParams.url}</div>
        <Results data={this.state.data} />
        <Footer />
      </React.Fragment>
    );
  }
}
