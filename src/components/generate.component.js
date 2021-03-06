import React, { useEffect, useState } from "react";
import TemplatesDataService from "../services/templates";
import QRCode from "react-qr-code";
import { createBatch } from "../services/blockchain_interact";


const Generate = (props) => {
  const [template, setTemplate] = useState({});
  const [productId, setProductId] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [generateState, setGenerateState] = useState(false);
  const [qrData, setQrData] = useState({});

  useEffect(() => {
    setGenerateState(false);
  }, [productId]);

  const retrieveTemplate = () => {
    TemplatesDataService.get(productId).then((response) => {
      if (response.data) {
        var qrData = {
          productId: response.data.productId,
          batchNo: batchNo,
          time: Date.now(),
          UUID: crypto.randomUUID() + "-" + Date.now(),
        };
        console.log(qrData);
        createBatch(qrData.UUID);
        setTemplate(response.data);
        setQrData(JSON.stringify(qrData));
      } else setTemplate({});
    });
  };

  const onGenerate = () => {
    retrieveTemplate();
    setGenerateState(true);
  };

  return (
    <div className="my-5">
      <h2 className=" my-4 ">Generate Label</h2>
      <form>
        <label>Product ID:</label>
        <input
          type="text"
          className="form-control"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <label>Batch Number:</label>
        <input
          type="text"
          className="form-control"
          value={batchNo}
          onChange={(e) => setBatchNo(e.target.value)}
        />
      </form>
      <br />
      <div className="btn btn-primary" onClick={onGenerate}>
        Generate
      </div>
      {generateState && (
        <div className="border w-50 m-auto p-5">
          <QRCode value={qrData} />
          <GenerateLabel fieldObj={template.productLabel || {}} />
        </div>
      )}
      {/* <p>{generateState && JSON.stringify(template)}</p> */}
    </div>
  );
};

const GenerateLabel = (props) => {
  console.log(props);
  var fieldObjArr = [],
    fieldArr = [];
  for (var fieldKey in props.fieldObj) {
    if (fieldKey == "_metadata") continue;
    let value = props.fieldObj[fieldKey];
    fieldObjArr.push({ title: fieldKey, value: value });
  }
  fieldObjArr.sort((a, b) => {
    return a.value._metadata.id > b.value._metadata.id;
  });
  console.log(fieldObjArr);
  // return <div/>
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

          // console.log()

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
  console.log(props);
  return (
    <div>
      <h5>{props.fieldTitle}</h5>
      <p>{props.fieldObj.data}</p>
    </div>
  );
};

const Image = (props) => {
  console.log(props);
  return (
    <div>
      <h5>{props.fieldTitle}</h5>
      <img className="w-100" src={props.fieldObj.data}></img>
    </div>
  );
};

const Table = (props) => {
  console.log(props.fieldObj.data[0]);

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
