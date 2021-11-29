import React, { Component } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../firebase";

export default class ImageField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.fieldObj,
      data: this.props.fieldObj.data ? this.props.fieldObj.data : "",
    };
  }

  handleChange = (url) => {
    this.setState({ data: url }, () => {
      this.props.handleFieldChange(this.props.fieldTitle, this.state);
    });
  };

  formHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    this.uploadFiles(file);
  };

  uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, "/files/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          this.handleChange(url);
        });
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
            onChange={this.formHandler}
          />
        </div>
      </div>
    );
  }
}
