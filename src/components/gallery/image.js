import React, { Component } from "react";

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgDisplay: true,
      videoDispaly: true,
    };
  }
  handleClick(e) {
    if (this.props.arrange.isCenter) {
      this.props.reverse();
    } else {
      this.props.center();
    }

    e.preventDefault();
  }
  componentWillReceiveProps() {
    console.log(this.props.data.url);
    if (
      !["jpg", "jpeg", "png", "gif", "bmp"].some((ext) => {
        return this.props.data.url.toLowerCase().indexOf(ext) > -1;
      })
    ) {
      this.setState({
        imgDisplay: false,
        videoDispaly: true,
      });
    } else {
      this.setState({
        imgDisplay: true,
        videoDispaly: false,
      });
    }
  }
  render() {
    let styleObj = {};
    if (this.props.arrange.pos) {
      styleObj = Object.assign({}, this.props.arrange.pos);
    }
    if (this.props.arrange.rotate) {
      styleObj["transform"] = `rotate(${this.props.arrange.rotate}deg)`;
    }
    if (this.props.arrange.isCenter) {
      styleObj.zIndex = 11;
    }
    let figureClassName = "img-figure";
    figureClassName += this.props.arrange.isReverse ? " is-reverse" : "";
    return (
      <figure
        className={figureClassName}
        id={this.props.id}
        style={styleObj}
        onClick={this.handleClick.bind(this)}
      >
        <div className="front">
          {this.state.imgDisplay ? (
            <img
              src={this.props.data.url}
              alt={this.props.data.title}
              onError={() => {
                this.setState({ imgDisplay: false });
              }}
            />
          ) : null}
          {this.state.videoDispaly ? (
            <video
              controls
              autoPlay={screen.width>1000?true:false}
              muted
              loop
              src={this.props.data.url}
              alt={this.props.data.title}
              onError={() => {
                this.setState({ videoDispaly: false });
              }}
            />
          ) : null}
          <h3 className="img-title">{this.props.data.title}</h3>
        </div>
        <div className="back" onClick={this.handleClick.bind(this)}>
          <p>{this.props.data.desc}</p>
        </div>
      </figure>
    );
  }
}
export default Image;
