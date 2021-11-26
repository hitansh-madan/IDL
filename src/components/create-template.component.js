import React, { Component } from "react";
import TextField from "./field.components/text-field.component";
import TableField from "./field.components/table-field.component";
import ImageField from "./field.components/image-field.component";
import SectionField from "./field.components/section-field.component";
import groupButton from "./field.components/field.util.components/group-button.component";
import TemplateDataService from "../services/templates";

export default class CreateTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      productName: "",
      productCategory: "",
      addFieldType: "",
      addFieldTitle: "",
      fieldCount: 0,
      displayAddField: false,
      sections: {
        _metadata: {
          type: "section",
          id: 0,
        },
      },
    };
  }

  handleFieldChange = (field, value) => {
    this.setState((prevState) => ({
      sections: {
        ...prevState.sections,
        [field]: value,
      },
    }));
  };

  handleFieldDelete = (field) => {
    var sections = { ...this.state.sections };
    delete sections[field];
    // console.log(sections);
    this.setState({ sections: sections });
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

  handleSubmit = () => {
    var doc = {
      productId: this.state.productId,
      name: this.state.productName,
      category: this.state.productCategory,
      productLabel: this.state.sections,
    };
    TemplateDataService.create(doc).then((response) => {
      console.log(response);
    });
  };

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
      var propsObj = {
        key: fieldObj.value._metadata.id,
        fieldObj: fieldObj.value,
        fieldTitle: fieldObj.title,
        handleFieldChange: this.handleFieldChange,
        handleFieldDelete: this.handleFieldDelete,
      };

      switch (fieldObj.value._metadata.type) {
        case "textarea":
          fieldArr.push(<TextField {...propsObj} />);
          break;
        case "table":
          fieldArr.push(<TableField {...propsObj} />);
          break;
        case "image":
          fieldArr.push(<ImageField {...propsObj} />);
          break;
        case "section":
          fieldArr.push(<SectionField {...propsObj} />);
          break;
      }
    }
    // console.log(this.state);

    return (
      <form>
        <label>Product ID:</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => this.setState({ productId: e.target.value })}
        />
        <label>Product Name:</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => this.setState({ productName: e.target.value })}
        />
        <label>Product Category:</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => this.setState({ productCategory: e.target.value })}
        />

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

        <input
          type="button"
          value="Submit"
          className="btn btn-primary my-2 d-block"
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
}
