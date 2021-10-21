import React from "react";
// import Table from 'react-bootstrap/Table'
// import Container from 'react-bootstrap/Container'

class ElementTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      n: 0,
      m: 0,
      matrix: [[]],
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      n: nextProps.n,
      m: nextProps.m,
      matrix: Array.from({ length: nextProps.n }, () =>
        Array.from({ length: nextProps.m }, () => null)
      ),
    });
  }
  handleChange = (event, row, column) => {
    var copy = this.state.matrix;
    copy[row][column] = event.target.value;
    this.setState({ matrix: copy });
  };
  arrToObject(arr) {
    //assuming header
    var keys = arr[0];
    //vacate keys from main array
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
  }
  render() {
    {
      console.log(this.state.matrix);
    }
    {
      this.arrToObject(this.state.matrix);
    }
    return (
      <div>
        <h1>Table</h1>
        <p>{this.state.n + " " + this.state.m}</p>
        {/* <C>
                    <Table responsive >
                        <tbody>
                            {this.state.matrix.map((row, i) => (
                                <tr key={i}>
                                    {row.map((col, j) => (
                                        <td key={j}> <input
                                            type="text"
                                            onChange={e => this.handleChange(e, i, j)}
                                        /></td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container> */}
      </div>
    );
  }
}

export default ElementTable;
