import React, { Component } from "react";
import service from "./model-service";
//var ogs = require("open-graph-scraper");

class EmbeddedMedia extends Component {
  state = {
    source: null,
    visible: false
  };

  componentDidMount() {
    if (this.props.targetUrl) {
      this.scrap(this.props.targetUrl);
    }
  }

  scrap = url => {
    var ogData = service.getOGData(url);
    ogData.then(this.handleResults).catch(this.handleError);
  };

  handleResults = results => {
    this.setState({
      source: results.data.ogImage.url,
      visible: true
    });
  };

  handleError = error => {
    this.setState({
      source: null,
      visible: false
    });
  };
  render() {
    return this.state.visible
      ? <img
          src={this.state.source}
          height={this.props.height}
          width={this.props.width}
        />
      : null;
  }
}

export default EmbeddedMedia;
