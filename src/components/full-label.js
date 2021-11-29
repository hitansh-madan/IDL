import React, { useEffect, useState } from "react";
import TemplatesDataService from "../services/templates";

const Generate = (props) => {
  const [template,setTemplate] = useState({});
  useEffect(() => {
    retrieveTemplate();
  }, []);

  const retrieveTemplate = () => {
    var productId = new URLSearchParams(props.location.search).get("id");
    TemplatesDataService.get(productId).then((response) => {
      setTemplate(response.data || {});
    });
  };

  return (
    <div className="my-5 mx-2">
      <GenerateLabel fieldObj={template.productLabel || {}} />
    </div>
  );
};

const GenerateLabel = (props) => {
    console.log(props.fieldObj);
  var fieldObjArr = [],
    fieldArr = [];
  for (var fieldKey in props.fieldObj) {
    if (fieldKey == "_metadata") continue;
    let value = props.fieldObj[fieldKey];
    fieldObjArr.push({ title: fieldKey, value: value });
  }
  fieldObjArr.sort((a, b) => {
    console.log(a);
    return a.value._metadata.id > b.value._metadata.id;
  });
  return (
    <div>
      {props.fieldTitle && <h5>{props.fieldTitle}</h5>}
      <div className="ps-3">
        {fieldObjArr.map((fieldObj) => {
          var propsObj = {
            key: fieldObj.value._metadata.id,
            fieldObj: fieldObj.value,
            fieldTitle: fieldObj.title,
          };


          switch (fieldObj.value._metadata.type) {
            case "textarea":
              return <Text {...propsObj} />;
            case "table":
              return <Table {...propsObj} />;
            case "image":
              return <Image {...propsObj} />;
            case "section":
              return <GenerateLabel {...propsObj} />;
          }
        })}
      </div>
    </div>
  );
};

const Text = (props) => {
  return (
    <div>
      <h5>{props.fieldTitle}</h5>
      <p>{props.fieldObj.data}</p>
    </div>
  );
};

const Image = (props) => {
  return (
    <div>
      <h5>{props.fieldTitle}</h5>
      <img className="w-100" src={props.fieldObj.data}></img>
    </div>
  );
};

const Table = (props) => {
  var keys = [];
  for (var key in props.fieldObj.data[0]) keys.push(key);
  return (
    <div>
      <h5>{props.fieldTitle}</h5>

      <table className="table border border-round table p-4">
        <thead>
          <tr>
            {keys.map((heading) => {
              return <th scope="col">{heading}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {props.fieldObj.data.map((row) => {
            return (
              <tr>
                {keys.map((key) => {
                  return <td>{row[key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Generate;
