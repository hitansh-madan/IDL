import React from "react";
import Sheet from "./elementTable";

class TableField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      n: 0,
      m: 0,
      matrix: [[]],
      tableJson: {},
    };
  }

  handleSizeChange = (n, m) => {
    this.setState({
      n: n,
      m: m,
      matrix: Array.from({ length: n }, () =>
        Array.from({ length: m }, () => null)
      ),
    });
  };

  handleChange = (event, row, column) => {
    var copy = this.state.matrix;
    copy[row][column] = event.target.value;
    this.setState({ matrix: copy , tableJson : this.arrToObject(copy)});
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
    console.log(formatted);
    return(formatted);
  }

  render() {
    console.log(this.state.matrix);

    return (
      <div>
        <input type="hidden" className = "d-none" name = {this.props.name} value = {this.state.tableJson}/>
        <input 
          type="text"
          className="form-control"
          placeholder={"Enter the number of rows"}
          onChange={(e) => this.handleSizeChange(e.target.value, this.state.m)}
        />
        <input
          type="text"
          className="form-control"
          placeholder={"Enter the number of columns"}
          onChange={(e) => this.handleSizeChange(this.state.n, e.target.value)}
        />
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
