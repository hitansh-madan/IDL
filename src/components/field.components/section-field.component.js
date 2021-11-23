import React, { Component } from "react";
import TextField from "./text-field.component";
import TableField from "./table-field.component";
import ImageField from "./image-field.component";
import groupButton from "./field.util.components/group-button.component";
export default class SectionField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addFieldType: "",
      addFieldTitle: "",
      fieldCount: 0,
      displayAddField: false,
      sections: this.props.fieldObj,
    };
  }

  handleFieldChange = (field, value) => {
    this.setState(
      (prevState) => ({
        ...prevState,
        sections: {
          ...prevState.sections,
          [field]: value,
        },
      }),
      () =>
        this.props.handleFieldChange(this.props.fieldTitle, this.state.sections)
    );
  };

  handleFieldDelete = (field) => {
    var sections = { ...this.state.sections };
    delete sections[field];
    this.setState({ sections: sections }, () =>
      this.props.handleFieldChange(this.props.fieldTitle, this.state.sections)
    );
  };

  handleAddClick = (fieldtype) => {
    this.setState({
      displayAddField: true,
      addFieldType: fieldtype,
    });
  };

  addField = () => {
    var value = {
      _metadata: {
        id: this.state.fieldCount,
        type: this.state.addFieldType,
      },
    };
    this.handleFieldChange(this.state.addFieldTitle, value);
    this.setState({
      fieldCount: this.state.fieldCount + 1,
      displayAddField: false,
      addFieldType: "",
      addFieldTitle: "",
    });
  };

  // TODO: sort the fields based on their metadata ids in the render method
  render() {
    var fieldObjArr = [],
      fieldArr = [];

    for (var fieldKey in this.state.sections) {
      if (fieldKey == "_metadata") continue;
      let value = this.state.sections[fieldKey];
      fieldObjArr.push({ title: fieldKey, value: value });
    }
    fieldObjArr.sort((a, b) => {
      return a.value._metadata.id > b.value._metadata.id;
    });

    for (var fieldObj of fieldObjArr) {
      switch (fieldObj.value._metadata.type) {
        case "textarea":
          fieldArr.push(
            <TextField
              key={fieldObj.value._metadata.id}
              fieldObj={fieldObj.value}
              fieldTitle={fieldObj.title}
              handleFieldChange={this.handleFieldChange}
              handleFieldDelete={this.handleFieldDelete}
            />
          );
          break;
        case "table":
          fieldArr.push(
            <TableField
              key={fieldObj.value._metadata.id}
              fieldObj={fieldObj.value}
              fieldTitle={fieldObj.title}
              handleFieldChange={this.handleFieldChange}
              handleFieldDelete={this.handleFieldDelete}
            />
          );
          break;
        case "image":
          fieldArr.push(
            <ImageField
              key={fieldObj.value._metadata.id}
              fieldObj={fieldObj.value}
              fieldTitle={fieldObj.title}
              handleFieldChange={this.handleFieldChange}
              handleFieldDelete={this.handleFieldDelete}
            />
          );
          break;
        case "section":
          fieldArr.push(
            <SectionField
              key={fieldObj.value._metadata.id}
              fieldObj={fieldObj.value}
              fieldTitle={fieldObj.title}
              handleFieldChange={this.handleFieldChange}
              handleFieldDelete={this.handleFieldDelete}
            />
          );
          break;
      }
    }

    return (
      <div className="border ps-4">
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

        {fieldArr}

        <div className="btn-group my my-2 " role="group">
          {groupButton("textarea", "➕ Text", this.handleAddClick)}
          {groupButton("table", "➕ Table", this.handleAddClick)}
          {groupButton("image", "➕ Image", this.handleAddClick)}
          {groupButton("section", "➕ Field", this.handleAddClick)}
        </div>

        {this.state.displayAddField && (
          <div className="my-2">
            <input
              type="text"
              className="w-50 d-inline-block form-control"
              placeholder="Field title"
              id="addFieldTitle"
              onChange={(e) => this.setState({ addFieldTitle: e.target.value })}
            />
            <button
              type="button"
              className="btn btn-secondary d-inline-block"
              onClick={this.addField}
            >
              Add
            </button>
          </div>
        )}
      </div>
    );
  }
}
