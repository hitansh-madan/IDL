import React from "react";
class TableField extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        tableState: {
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
          data: this.props.fieldObj.data ? this.props.fieldObj.data : "",
        },
        matrix: [[]],
        // tableJson: {},
      };
    }
  
    handleSizeChange = (n, m) => {
      this.setState(
        (prev) => ({
          ...prev,
          tableState: {
            ...prev.tableState,
            _metadata: {
              ...prev.tableState._metadata,
              rows: n,
              cols: m,
            },
          },
          matrix: Array.from({ length: n }, () =>
            Array.from({ length: m }, () => null)
          ),
        }),
        () => {
          this.props.handleFieldChange(
            this.props.fieldTitle,
            this.state.tableState
          );
        }
      );
    };
  
    handleChange = (event, row, column) => {
      var copy = this.state.matrix;
      copy[row][column] = event.target.value;
  
      this.setState(
        (prev) => ({
          ...prev,
          matrix: copy,
          tableState: {
            ...prev.tableState,
            data: this.arrToObject(copy),
          },
        }),
        () => {
          this.props.handleFieldChange(
            this.props.fieldTitle,
            this.state.tableState
          );
        }
      );
  
      // this.setState({ matrix: copy, tableJson: this.arrToObject(copy) });
    };
  
    arrToObject(arr) {
      var keys = arr[0];
      var newArr = arr.slice(1, arr.length);
  
      var formatted = [],
        data = newArr,
        cols = keys,
        l = cols.length;
      for (var i = 0; i < data.length; i++) {
        var d = data[i],
          o = {};
        for (var j = 0; j < l; j++) o[cols[j]] = d[j];
        formatted.push(o);
      }
      return formatted;
    }
  
    render() {
      // console.log(this.state);
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
          <input
            type="text"
            className="form-control"
            placeholder={"Enter the number of rows"}
            onChange={(e) =>
              this.handleSizeChange(
                parseInt(e.target.value) + 1,
                this.state.tableState._metadata.cols
              )
            }
          />
          <input
            type="text"
            className="form-control"
            placeholder={"Enter the number of columns"}
            onChange={(e) =>
              this.handleSizeChange(
                this.state.tableState._metadata.rows,
                e.target.value
              )
            }
          />
          <br />
          <table className="table table-bordered">
            <tbody>
              {this.state.matrix.map((row, i) => (
                <tr key={i} className="p-0 m-0">
                  {row.map((col, j) => (
                    <td key={j} className="  p-0 m-0">
                      <input
                        className="border-0"
                        type="textarea"
                        className="form-control font-weight-bold"
                        onChange={(e) => this.handleChange(e, i, j)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {/* <Sheet n={this.state.n} m={this.state.m} /> */}
        </div>
      );
    }
  }
  
  export default TableField;