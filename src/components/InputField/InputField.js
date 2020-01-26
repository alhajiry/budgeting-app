import React, { Component } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import "./style.scss";

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
        <h1 className="input-form-title">REACT TABUNGAN APP (CRUD)</h1>
        <Container className="input-form-container">
          <Row>
            <Col className="input-form-formtosubmit">
              <form ref="inputForm" className="input-form-head">
                <select
                  ref="type"
                  form="inputForm"
                  placeholder="pilih"
                  required
                >
                  <option value="Pemasukan" disabled selected hidden>
                    Pilih
                  </option>
                  <option value="Pemasukan">Pemasukan</option>
                  <option value="Pengeluaran">Pengeluaran</option>
                </select>
                <input
                  type="number"
                  ref="total"
                  placeholder="Jumlah"
                  min="1"
                  required
                />
                <input type="text" ref="name" placeholder="Judul" required />
                <Button
                  variant="primary"
                  onClick={event => this.formSubmit(event)}
                  className="button-submit"
                >
                  Submit
                </Button>
              </form>
            </Col>
            <Col className="input-budgeting-data">
              <p>
                Total Pemasukkan :<br />
                {this.state.income}
              </p>
              <p>
                Total Pengeluaran : <br /> {this.state.outcome}
              </p>
              <p>
                Total Uang : <br /> {this.state.totalMoney}
              </p>
            </Col>
          </Row>

          <Row>
            {datas.length ? (
              <div>
                <Row>
                  <ListGroup horizontal>
                    <ListGroup.Item>Tipe</ListGroup.Item>
                    <ListGroup.Item>Jumlah</ListGroup.Item>
                    <ListGroup.Item>Judul</ListGroup.Item>
                    <ListGroup.Item>Action</ListGroup.Item>
                  </ListGroup>
                </Row>
                {datas.map((data, index) => (
                  <li key={index} className="input-content">
                    <Row>
                      <Col className="input-type">{data.type}</Col>
                      <Col className="input-total">{data.total}</Col>
                      <Col className="input-name">{data.name}</Col>
                      <Col>
                        <Button
                          variant="primary"
                          onClick={() => this.formEdit(index)}
                          className="button-edit"
                        >
                          Edit
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
                          onClick={() => this.formDelete(index)}
                          className="button-delete"
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </li>
                ))}
              </div>
            ) : (
              <div>
                <Row>
                  <ListGroup horizontal>
                    <ListGroup.Item>Tipe</ListGroup.Item>
                    <ListGroup.Item>Jumlah</ListGroup.Item>
                    <ListGroup.Item>Judul</ListGroup.Item>
                    <ListGroup.Item>Action</ListGroup.Item>
                  </ListGroup>
                </Row>
                <Row>
                  <Col>Data Empty</Col>
                  <Col>Data Empty</Col>
                  <Col>Data Empty</Col>
                  <Col>Data Empty</Col>
                </Row>
              </div>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

export default InputField;
