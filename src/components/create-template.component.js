import React, { Component } from "react";
import TableField from "./Tabgen";

export default class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      addFieldTitle: "",
      addFieldType: "textarea",
      displayAddField: false,
    };
  }

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

  handleFieldDelete = (index) => {
    var fields = this.state.fields;
    fields.splice(index, 1);
    this.setState({ fields: fields });
  };

  handleSubmit = (event) => {
    console.log(window.deepforms.submitDeepForm("frm"));
    event.preventDefault();
  };

  render() {
    var fieldArr = [];
    var fields = this.state.fields;
    fields.forEach((field, index) => {
      fieldArr.push(
        <Field
          key={index}
          fieldObj={field}
          name={toCamelCase(field.title)}
          index={index}
          handleFieldDelete={this.handleFieldDelete}
        />
      );
    });

    return (
      <form id="frm">
        <label>Product ID:</label>
        <input type="text" name="productId" className="form-control" />
        <label>Product Name:</label>
        <input type="text" name="productName" className="form-control" />
        <label>Product Category:</label>
        <input type="text" name="productCategory" className="form-control" />

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

class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addFieldTitle: "",
      addFieldType: "textarea",
      displayAddField: false,
      fields: this.props.fieldObj.fields || [],
    };
  }

  handleFieldDelete = (index) => {

    console.log(index);
    var fields = this.state.fields;
    fields.splice(index, 1);
    this.setState({ fields: fields });
  }

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
            <input
              type="text"
              name={this.props.name}
              className="form-control"
              placeholder={fieldObj.title + " " + fieldObj.type}
            />
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
              index = {index}
              fieldObj={field}
              name={this.props.name + "." + toCamelCase(field.title)}
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
        <label className = "m-2"><strong>{fieldObj.title + " :"}</strong></label>
        <p
          type="button"
          className="d-inline-block float-end m-2"
          onClick={()=>this.props.handleFieldDelete(this.props.index)}
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
      data-fieldtype={fieldtype}
      className="btn btn-dark border my-2"
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
}

function toCamelCase(str) {
  var retVal = "";

  retVal = str
    .trim()
    .replace(/[^A-Za-z]/g, " ") /* clean up non-letter characters */
    .replace(/(.)/g, function (a, l) {
      return l.toLowerCase();
    })
    .replace(/(\s.)/g, function (a, l) {
      return l.toUpperCase();
    })
    .replace(/[^A-Za-z\u00C0-\u00ff]/g, "");

  return retVal;
}






// import React, { Component } from "react";

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

//   handleFieldChange = (index, field) => {
//     var fields = this.state.fields;
//     fields[index] = field;
//     this.setState({ fields: fields });
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
//           name={toCamelCase(field.title)}
//           index={index}
//           handleFieldChange={this.handleFieldChange}
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
//       fields : this.props.fieldObj.fields || []
//     };
//   }

//   handleFieldChange(index, field) {
//     var fields = this.props.fieldObj.fields;
//     fields[index] = field;
//     this.props.handleFieldChange(this.props.index, fields);
//   }

//   handleFieldDelete(index) {
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
//         fieldComponent = (
//           <div className="my-2 ps-4 pe-2 py-2 border">
//             <label>{fieldObj.title + " :"}</label>
//             <input
//               type="text"
//               name={this.props.name}
//               className="form-control"
//               placeholder={fieldObj.title + " " + fieldObj.type}
//             />
//           </div>
//         );
//         break;
//       case "table":
//         fieldComponent = (
//           <div className="my-2 ps-4 pe-2 py-2 border">
//             <label>{fieldObj.title + " :"}</label>
//             <input
//               type="text"
//               name={this.props.name}
//               className="form-control"
//               placeholder={fieldObj.title + " " + fieldObj.type}
//             />
//           </div>
//         );
//         break;
//       case "image":
//         fieldComponent = (
//           <div className="my-2 ps-4 pe-2 py-2 border">
//             <label>{fieldObj.title + " :"}</label>
//             <input
//               type="file"
//               name={this.props.name}
//               className="form-control"
//               placeholder={fieldObj.title + " " + fieldObj.type}
//             />
//           </div>
//         );
//         break;
//       case "subfield":
//         var fieldArr = [];
//         this.state.fields.forEach((field, index) => {
//           fieldArr.push(
//             <Field
//               key={index}
//               fieldObj={field}
//               name={this.props.name + "." + toCamelCase(field.title)}
//             />
//           );
//         });
//         fieldComponent = (
//           <div className="my-2 ps-4 pe-2 py-2 border">
//             <label>{fieldObj.title + " :"}</label>
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
//     return fieldComponent;
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
//----------------------------------------------------------------------------------------------------------------------

// import React, { Component } from "react";

// export default class NameForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       productId: "",
//       productName: "",
//       productCategory: "",
//       fields: [],
//       addFieldTitle: "",
//       addFieldType: "textarea",
//       displayAddField: false,
//     };
//   }

//   handleChange = (event) => {
//     this.setState({ [event.target.id]: event.target.value });
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

//   handleFieldChange = (index, field) => {
//     var fields = this.state.fields;
//     fields[index] = field;
//     this.setState({ fields: fields });
//   };

//   handleFieldDelete = (index) => {
//     var fields = this.state.fields;
//     fields.splice(index, 1);
//     this.setState({ fields: fields });
//   };

//   handleAddClick = (event) => {
//     this.setState({
//       addFieldType: event.target.dataset.fieldtype,
//       displayAddField: true,
//     });
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
//           name={toCamelCase(field.title)}
//           index={index}
//           handleFieldChange={this.handleFieldChange}
//           handleFieldDelete={this.handleFieldDelete}
//         />
//       );
//     });

//     return (
//       <form id="frm">
//         <label>Product ID:</label>
//         <input
//           type="text"
//           name="productId"
//           id="productId"
//           className="form-control"
//           onChange={this.handleTextChange}
//         />
//         <label>Product Name:</label>
//         <input
//           type="text"
//           name="productName"
//           id="productName"
//           className="form-control"
//           onChange={this.handleTextChange}
//         />
//         <label>Product Category:</label>
//         <input
//           type="text"
//           name="productCategory"
//           id="productCategory"
//           className="form-control"
//           onChange={this.handleTextChange}
//         />

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
//               onChange={this.handleChange}
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
//   constructor(props){
//     super(props);
//     this.state = {
//       addFieldTitle: "",
//       addFieldType: "textarea",
//       displayAddField: false,
//     }
//   }

//   handleFieldChange(index, field) {
//     var fields = this.props.fieldObj.fields;
//     fields[index] = field;
//     this.props.handleFieldChange(this.props.index, fields);
//   }

//   //addfield function
//   //addfield calls props.handlefieldchange

//   handleFieldDelete(index) {
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
//         fieldComponent = (
//           <div className="my-2 ps-4 pe-2 py-2 border">
//             <label>{fieldObj.title + " :"}</label>
//             <input
//               type="text"
//               name={this.props.name}
//               className="form-control"
//               placeholder={fieldObj.title + " " + fieldObj.type}
//               // id="addFieldTitle"
//               // onChange={this.handleChange}
//             />
//           </div>
//         );
//         break;
//       case "table":
//         fieldComponent = (
//           <div className="my-2 ps-4 pe-2 py-2 border">
//             <label>{fieldObj.title + " :"}</label>
//             <input
//               type="text"
//               name={this.props.name}
//               className="form-control"
//               placeholder={fieldObj.title + " " + fieldObj.type}
//               // id="addFieldTitle"
//               // onChange={this.handleChange}
//             />
//           </div>
//         );
//         break;
//       case "image":
//         fieldComponent = (
//           <div className="my-2 ps-4 pe-2 py-2 border">
//             <label>{fieldObj.title + " :"}</label>
//             <input
//               type="file"
//               name={this.props.name}
//               className="form-control"
//               placeholder={fieldObj.title + " " + fieldObj.type}
//               // id="addFieldTitle"
//               // onChange={this.handleChange}
//             />
//           </div>
//         );
//         break;
//       case "subfield":
//         var fieldArr = [];
//         var fields = fieldObj.fields || [];
//         fields.forEach((field, index) => {
//           fieldArr.push(
//             <Field
//               key={index}
//               fieldObj={field}
//               name={this.props.name + "." + toCamelCase(field.title)}
//             />
//           );
//         });
//         fieldComponent = (
//           <div className="my-2 ps-4 pe-2 py-2 border">
//             <label>{fieldObj.title + " :"}</label>
//             {fieldArr}
//             <div className="btn-group my my-2 " role="group">
//               {groupButton("textarea", "Add Text", this.handleAddClick)}
//               {groupButton("table", "Add Table", this.handleAddClick)}
//               {groupButton("image", "Add Image", this.handleAddClick)}
//               {groupButton("subfield", "Add Field", this.handleAddClick)}
//             </div>
//           </div>
//         );
//         break;
//       default:
//         fieldComponent = <div></div>;
//     }
//     return fieldComponent;
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
