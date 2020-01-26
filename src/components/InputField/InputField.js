import React, { Component } from "react";
// import GetData from "../GetData/GetData";

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      isEdit: false,
      datas: [],
      income: 0,
      outcome: 0,
      totalMoney: 0
    };
  }

  componentDidMount() {
    this.refs.type.focus();
  }

  formSubmit = event => {
    event.preventDefault();
    let newDatas = { ...this.state };

    let datas = newDatas.datas;
    let type = this.refs.type.value;
    let total = parseInt(this.refs.total.value);
    let name = this.refs.name.value;

    if (!newDatas.isEdit) {
      let data = {
        type,
        total,
        name
      };
      datas.push(data);
    } else {
      let index = newDatas.index;
      datas[index].type = type;
      datas[index].total = total;
      datas[index].name = name;
    }

    let incomes = newDatas.income;
    let outcomes = newDatas.outcome;
    if (type === "Pemasukan") {
      incomes += total;
    } else if (type === "Pengeluaran") {
      outcomes += total;
    }

    let totalMoneys = incomes - outcomes;

    this.setState({
      datas: datas,
      isEdit: false,
      income: incomes,
      outcome: outcomes,
      totalMoney: totalMoneys
    });

    this.refs.inputForm.reset();
    this.refs.type.focus();
  };

  formDelete = index => {
    let newDatas = { ...this.state };
    let newDatasArray = newDatas.datas;
    let income = newDatas.income;
    let outcome = newDatas.outcome;
    let deletedArray = newDatasArray[index];
    newDatasArray.splice(index, 1);
    let type = deletedArray.type;
    let total = deletedArray.total;

    if (type === "Pemasukan") {
      income -= total;
    } else if (type === "Pengeluaran") {
      outcome -= total;
    }

    let totalMoney = income - outcome;

    this.setState({
      datas: newDatasArray,
      income: income,
      outcome: outcome,
      totalMoney: totalMoney
    });
  };

  formEdit = index => {
    let newDatas = [...this.state.datas];
    let newData = newDatas[index];
    this.refs.type.value = newData.type;
    this.refs.total.value = newData.total;
    this.refs.name.value = newData.name;

    this.setState({
      index: index,
      isEdit: true
    });

    this.refs.type.focus();
  };

  render() {
    let datas = this.state.datas;

    return (
      <div>
        <h1>REACT CRUD App</h1>
        <form ref="inputForm" className="input-form-head">
          <select ref="type" form="inputForm" placeholder="pilih">
            <option value="" disabled selected hidden>
              Pilih
            </option>
            <option value="Pemasukan">Pemasukan</option>
            <option value="Pengeluaran">Pengeluaran</option>
          </select>
          <input type="number" ref="total" placeholder="Jumlah" min="1" />
          <input type="text" ref="name" placeholder="Judul" />
          <button
            onClick={event => this.formSubmit(event)}
            className="button-submit"
          >
            Submit
          </button>
        </form>
        {datas.length ? (
          <div>
            {datas.map((data, index) => (
              <li key={index} className="input-content">
                <span>{data.type}</span>
                <span>{data.total}</span>
                <span>{data.name}</span>
                <button
                  onClick={() => this.formEdit(index)}
                  className="button-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => this.formDelete(index)}
                  className="button-delete"
                >
                  Delete
                </button>
              </li>
            ))}
          </div>
        ) : (
          <div>Data is Empty</div>
        )}
        <p>Total Pemasukkan : {this.state.income}</p>
        <p>Total Pengeluaran : {this.state.outcome}</p>
        <p>Total Uang : {this.state.totalMoney}</p>
      </div>
    );
  }
}

export default InputField;
