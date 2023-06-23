import React, { Component } from "react";

import { Box, Heading, Grommet, Button } from "grommet";

import "../App.css";

const theme = {
  global: {
    colors: {
      brand: "#000000",
      focus: "#000000",
    },
    font: {
      family: "Lato",
    },
  },
};

const AppBar = (props) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    style={{ zIndex: "1" }}
    {...props}
  />
);

export class PatientsList extends Component {
  state = { patientList: [] };
  componentDidMount() {
    this.getNames("");
  }
  getNames(value) {
    let patName = value;
    console.log(patName);
    fetch("http://localhost:3001/getAllPatients")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ patientList: res.data });
      });
  }
  render() {
    const { patientList } = this.state;
    const Body = () => (
      <div className="container">
        <div className="panel panel-default p50 uth-panel">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {patientList.map((patient) => (
                <tr key={patient.id}>
                  <td align="center">{patient.name}</td>
                  <td align="center">{patient.gender} </td>
                  <td align="center">{patient.email}</td>
                  <td align="center">
                    {new Date(patient.date)
                      .toLocaleDateString()
                      .substring(0, 10)}
                  </td>
                  <td>
                    <Button
                      label="Status"
                      href={`/patientStatus/${patient.email}`}
                    ></Button>
                  </td>
                  <td>
                    <Button
                      label="Delete"
                      onClick={() => {
                        let confirm = window.confirm("Are you sure?");
                        if (confirm) {
                          fetch(
                            "http://localhost:3001/deletePatient?email=" +
                              patient.email
                          );
                          window.location.reload();
                        }
                      }}
                    ></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
    return (
      <Grommet theme={theme} full>
        <Box>
          <AppBar>
            <a
              style={{ color: "inherit", textDecoration: "inherit" }}
              href="/adminDashboard"
            >
              <Heading level="3" margin="none">
                HMS
              </Heading>
            </a>
          </AppBar>
          <Body />
        </Box>
      </Grommet>
    );
  }
}

export default PatientsList;
