import React, { Component } from "react";
import service from "./model-service";
import glamorous from "glamorous";

const EmbeddedImage = glamorous.a({
  display: "block",
  width: "auto"
});

const ImgContainer = glamorous.img({
  maxWidth: "100%",
  maxHeight: "100%",
  minWidth: "100%",
  borderRadius: "8px"
});

const IframeContainer = glamorous.iframe({
  maxWidth: "100%",
  maxHeight: "100%",
  minWidth: "100%",
  borderRadius: "8px"
});

class EmbeddedMedia extends Component {
  state = {
    source: null,
    visible: false
  };

  componentDidMount() {
    if (this.props.targetUrl) {
      this.getMedia(this.props.targetUrl);
    }
  }

  getMedia = url => {
    var ogData = service.getOGData(url);
    ogData.then(this.handleResults).catch(this.handleError);
  };

  handleResults = results => {
    this.setState({
      source: results.data,
      visible: true
    });
  };

  handleError = error => {
    this.setState({
      source: null,
      visible: false
    });
  };

  getHref = () => {
    if (this.state.source.ogUrl) return this.state.source.ogUrl;
  };

  renderMedia = () => {
    return this.state.source.ogVideo ? this.renderVideo() : this.renderImage();
  };

  renderImage = () => {
    return (
      <ImgContainer
        src={this.state.source.ogImage.url}
        alt={this.state.source.ogTitle}
      />
    );
  };

  renderVideo = () => {
    if (this.state.source.ogVideo.type === "video/mp4") {
      return this.renderImage();
    } else if (this.state.source.ogVideo.type === "text/html") {
      //Removes the query string in order to avoid autoplay in twitter videos.
      return (
        <IframeContainer
          src={this.state.source.ogVideo.url.split("?")[0]}
          width={this.state.source.ogVideo.width}
          height={this.state.source.ogVideo.height}
        />
      );
    }
  };

  render() {
    return this.state.visible &&
      <EmbeddedImage href={this.getHref()} target="_blank">
        {this.renderMedia()}
      </EmbeddedImage>;
  }
}

export default EmbeddedMedia;
