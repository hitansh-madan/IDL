import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { Component } from "react";
import { storage } from "../../firebase";
class ImageField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.fieldObj,
      data: this.props.fieldObj.data ? this.props.fieldObj.data : "",
    };
  }
  formHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    this.uploadFiles(file);
  };
  uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, '/files/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", (snapshot) => {
    }
      , (error) => {
        console.log(error);
      }
      , () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          this.setState({ data: url });
        });
      });
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
            className="input"
            value={this.state.data}
            onChange={this.formHandler}
          />
        </div>
        <div>
          <button>submit</button>
        </div>
      </div>
    );
  }
}

export default ImageField;