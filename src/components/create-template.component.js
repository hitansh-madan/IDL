import React, { Component } from "react";
// import TableField from "./Tabgen";

export default class CreateTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    console.log(sections);
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
    console.log(JSON.stringify(this.state.sections));

    return (
      <form>
        <label>Product ID:</label>
        <input type="text" className="form-control" />
        <label>Product Name:</label>
        <input type="text" className="form-control" />
        <label>Product Category:</label>
        <input type="text" className="form-control" />

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

class TextField extends Component {
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
            type="text"
            className="form-control"
            value={this.state.data}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

class TableField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.fieldObj,
      _metadata: {
        ...this.props.fieldObj._metadata,
        rows: this.props.fieldObj._metadata.rows
          ? this.props.fieldObj._metadata.rows
          : 0,
        cols: this.props.fieldObj._metadata.cols
          ? this.props.fieldObj._metadata.cols
          : 0,
      },
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
  handleResize = (e, dimension) => {
    this.setState((prevState) => ({
      _metadata: {
        ...prevState._metadata,
        [dimension]: e.target.value,
      },
    }));
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
            type="text"
            className="form-control"
            value={this.state._metadata.rows}
            onChange={(e) => this.handleResize(e, "rows")}
          />
          <input
            type="text"
            className="form-control"
            value={this.state._metadata.cols}
            onChange={(e) => this.handleResize(e, "cols")}
          />
        </div>
      </div>
    );
  }
}

class ImageField extends Component {
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

class SectionField extends Component {
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

class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addFieldTitle: "",
      addFieldType: "textarea",
      displayAddField: false,
      fields: this.props.fieldObj.fields || [],
      fieldValue: {},
    };
  }

  handleFieldDelete = (index) => {
    console.log(index);
    var fields = this.state.fields;
    fields.splice(index, 1);
    this.setState({ fields: fields });
  };

  handleAddClick = (event) => {
    this.setState({
      addFieldType: event.target.dataset.fieldtype,
      displayAddField: true,
    });
  };

  addField = () => {
    var newField = {
      type: this.state.addFieldType,
      title: this.state.addFieldTitle,
    };
    this.setState((prevState) => ({
      fields: [...prevState.fields, newField],
      displayAddField: false,
    }));
  };

  render() {
    var fieldObj = this.props.fieldObj;
    var fieldComponent;

    switch (fieldObj.type) {
      case "textarea":
        fieldComponent = (
          <div>
            <input
              type="text"
              name={this.props.name + ".title"}
              className="form-control"
              value={this.props.title}
            />
            <input
              type="text"
              name={this.props.name + ".type"}
              className="form-control"
              value={this.props.type}
            />
            <input
              type="text"
              name={this.props.name + ".data"}
              className="form-control"
              placeholder={fieldObj.title + " " + fieldObj.type}
            />
          </div>
        );
        break;
      case "table":
        fieldComponent = (
          <TableField
            type="text"
            name={this.props.name}
            className="form-control"
            placeholder={fieldObj.title + " " + fieldObj.type}
          />
        );
        break;
      case "image":
        fieldComponent = (
          <input
            type="file"
            name={this.props.name}
            className="form-control"
            placeholder={fieldObj.title + " " + fieldObj.type}
          />
        );
        break;
      case "subfield":
        var fieldArr = [];
        this.state.fields.forEach((field, index) => {
          fieldArr.push(
            <Field
              key={index}
              index={index}
              fieldObj={field}
              name={this.props.name + ".subfields"}
              handleFieldDelete={this.handleFieldDelete}
            />
          );
        });
        fieldComponent = (
          <div className="my-2 ps-4 pe-2 py-2 border">
            {fieldArr}
            <div className="btn-group my my-2 " role="group">
              {groupButton("textarea", "Add Text", this.handleAddClick)}
              {groupButton("table", "Add Table", this.handleAddClick)}
              {groupButton("image", "Add Image", this.handleAddClick)}
              {groupButton("subfield", "Add Field", this.handleAddClick)}
            </div>

            {this.state.displayAddField && (
              <div className="my-2">
                <input
                  type="text"
                  className="w-50 d-inline-block form-control"
                  placeholder="Field title"
                  id="addFieldTitle"
                  onChange={(e) =>
                    this.setState({ addFieldTitle: e.target.value })
                  }
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
        break;
      default:
        fieldComponent = <div></div>;
    }
    return (
      <div>
        <label className="m-2">
          <strong>{fieldObj.title + " :"}</strong>
        </label>
        <p
          type="button"
          className="d-inline-block float-end m-2"
          onClick={() => this.props.handleFieldDelete(this.props.fieldTitle)}
        >
          ❌
        </p>
        {fieldComponent}
      </div>
    );
  }
}

function groupButton(fieldtype, buttonText, handleClick) {
  return (
    <button
      type="button"
      className="btn btn-dark border my-2"
      onClick={() => handleClick(fieldtype)}
    >
      {buttonText}
    </button>
  );
}

// import React, { Component } from "react";
// import TableField from "./Tabgen";

// export default class NameForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       fields: [],
//       addFieldTitle: "",
//       addFieldType: "textarea",
//       displayAddField: false,
//     };
//   }

//   handleAddClick = (event) => {
//     this.setState({
//       addFieldType: event.target.dataset.fieldtype,
//       displayAddField: true,
//     });
//   };

//   addField = () => {
//     var newField = {
//       type: this.state.addFieldType,
//       title: this.state.addFieldTitle,
//     };

//     this.setState((prevState) => ({
//       fields: [...prevState.fields, newField],
//       displayAddField: false,
//     }));
//   };

//   handleFieldDelete = (index) => {
//     var fields = this.state.fields;
//     fields.splice(index, 1);
//     this.setState({ fields: fields });
//   };

//   handleSubmit = (event) => {
//     console.log(window.deepforms.submitDeepForm("frm"));
//     event.preventDefault();
//   };

//   render() {
//     var fieldArr = [];
//     var fields = this.state.fields;
//     fields.forEach((field, index) => {
//       fieldArr.push(
//         <Field
//           key={index}
//           fieldObj={field}
//           name={"fields"}
//           index={index}
//           handleFieldDelete={this.handleFieldDelete}
//         />
//       );
//     });

//     return (
//       <form id="frm">
//         <label>Product ID:</label>
//         <input type="text" name="productId" className="form-control" />
//         <label>Product Name:</label>
//         <input type="text" name="productName" className="form-control" />
//         <label>Product Category:</label>
//         <input type="text" name="productCategory" className="form-control" />

//         {fieldArr}

//         <div className="btn-group my my-2 " role="group">
//           {groupButton("textarea", "Add Text", this.handleAddClick)}
//           {groupButton("table", "Add Table", this.handleAddClick)}
//           {groupButton("image", "Add Image", this.handleAddClick)}
//           {groupButton("subfield", "Add Field", this.handleAddClick)}
//         </div>

//         {this.state.displayAddField && (
//           <div className="my-2">
//             <input
//               type="text"
//               className="w-50 d-inline-block form-control"
//               placeholder="Field title"
//               id="addFieldTitle"
//               onChange={(e) => this.setState({ addFieldTitle: e.target.value })}
//             />
//             <button
//               type="button"
//               className="btn btn-secondary d-inline-block"
//               onClick={this.addField}
//             >
//               Add
//             </button>
//           </div>
//         )}

//         <input
//           type="button"
//           value="Submit"
//           className="btn btn-primary my-2 d-block"
//           onClick={this.handleSubmit}
//         />
//       </form>
//     );
//   }
// }

// class Field extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       addFieldTitle: "",
//       addFieldType: "textarea",
//       displayAddField: false,
//       fields: this.props.fieldObj.fields || [],
//       fieldValue : {}
//     };
//   }

//   handleFieldDelete = (index) => {

//     console.log(index);
//     var fields = this.state.fields;
//     fields.splice(index, 1);
//     this.setState({ fields: fields });
//   }

//   handleAddClick = (event) => {
//     this.setState({
//       addFieldType: event.target.dataset.fieldtype,
//       displayAddField: true,
//     });
//   };

//   addField = () => {
//     var newField = {
//       type: this.state.addFieldType,
//       title: this.state.addFieldTitle,
//     };
//     this.setState((prevState) => ({
//       fields: [...prevState.fields, newField],
//       displayAddField: false,
//     }));
//   };

//   render() {
//     var fieldObj = this.props.fieldObj;
//     var fieldComponent;

//     switch (fieldObj.type) {
//       case "textarea":
//         fieldComponent = (<div>
//           <input
//               type="text"
//               name={this.props.name+ ".title"}
//               className="form-control"
//               value = {this.props.title}
//             />
//             <input
//               type="text"
//               name={this.props.name + ".type"}
//               className="form-control"
//               value = {this.props.type}
//             />
//             <input
//               type="text"
//               name={this.props.name + ".data"}
//               className="form-control"
//               placeholder={fieldObj.title + " " + fieldObj.type}
//             />
//             </div>
//         );
//         break;
//       case "table":
//         fieldComponent = (
//             <TableField
//               type="text"
//               name={this.props.name}
//               className="form-control"
//               placeholder={fieldObj.title + " " + fieldObj.type}
//             />
//         );
//         break;
//       case "image":
//         fieldComponent = (
//             <input
//               type="file"
//               name={this.props.name}
//               className="form-control"
//               placeholder={fieldObj.title + " " + fieldObj.type}
//             />
//         );
//         break;
//       case "subfield":
//         var fieldArr = [];
//         this.state.fields.forEach((field, index) => {
//           fieldArr.push(
//             <Field
//               key={index}
//               index = {index}
//               fieldObj={field}
//               name={this.props.name + ".subfields"}
//               handleFieldDelete={this.handleFieldDelete}
//             />
//           );
//         });
//         fieldComponent = (
//           <div className="my-2 ps-4 pe-2 py-2 border">
//             {fieldArr}
//             <div className="btn-group my my-2 " role="group">
//               {groupButton("textarea", "Add Text", this.handleAddClick)}
//               {groupButton("table", "Add Table", this.handleAddClick)}
//               {groupButton("image", "Add Image", this.handleAddClick)}
//               {groupButton("subfield", "Add Field", this.handleAddClick)}
//             </div>

//             {this.state.displayAddField && (
//               <div className="my-2">
//                 <input
//                   type="text"
//                   className="w-50 d-inline-block form-control"
//                   placeholder="Field title"
//                   id="addFieldTitle"
//                   onChange={(e) =>
//                     this.setState({ addFieldTitle: e.target.value })
//                   }
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-secondary d-inline-block"
//                   onClick={this.addField}
//                 >
//                   Add
//                 </button>
//               </div>
//             )}
//           </div>
//         );
//         break;
//       default:
//         fieldComponent = <div></div>;
//     }
//     return (
//       <div>
//         <label className = "m-2"><strong>{fieldObj.title + " :"}</strong></label>
//         <p
//           type="button"
//           className="d-inline-block float-end m-2"
//           onClick={()=>this.props.handleFieldDelete(this.props.index)}
//         >
//           ❌
//         </p>
//         {fieldComponent}
//       </div>
//     );
//   }
// }

// function groupButton(fieldtype, buttonText, handleClick) {
//   return (
//     <button
//       type="button"
//       data-fieldtype={fieldtype}
//       className="btn btn-dark border my-2"
//       onClick={handleClick}
//     >
//       {buttonText}
//     </button>
//   );
// }

// function toCamelCase(str) {
//   var retVal = "";

//   retVal = str
//     .trim()
//     .replace(/[^A-Za-z]/g, " ") /* clean up non-letter characters */
//     .replace(/(.)/g, function (a, l) {
//       return l.toLowerCase();
//     })
//     .replace(/(\s.)/g, function (a, l) {
//       return l.toUpperCase();
//     })
//     .replace(/[^A-Za-z\u00C0-\u00ff]/g, "");

//   return retVal;
// }
