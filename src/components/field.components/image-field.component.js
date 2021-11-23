import React, { Component } from "react";
export default class ImageField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.fieldObj,
      data: this.props.fieldObj.data ? this.props.fieldObj.data : "",
    };
  }

  handleChange = (event) => {
    this.setState(
      {
        data: event.target.value,
      },
      () => {
        this.props.handleFieldChange(this.props.fieldTitle, this.state);
      }
    );
  };

  render() {
    return (
      <div>
        <label className="m-2">
          <strong>{this.props.fieldTitle + " :"}</strong>
        </label>
        <p
          type="button"
          className="d-inline-block float-end m-2"
          onClick={() => this.props.handleFieldDelete(this.props.fieldTitle)}
        >
          ❌
        </p>
        <div>
          <input
            type="file"
            className="form-control"
            value={this.state.data}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
