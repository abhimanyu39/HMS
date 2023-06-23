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

export class DoctorList extends Component {
  state = { doctorList: [] };
  componentDidMount() {
    this.getNames("");
  }
  getNames(value) {
    let patName = value;
    fetch("http://localhost:3001/docInfo")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState({ doctorList: res.data });
      });
  }
  render() {
    const { doctorList } = this.state;
    const Body = () => (
      <div className="container">
        <div className="panel panel-default p50 uth-panel">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {doctorList.map((doctor) => (
                <tr key={doctor.id}>
                  <td align="center">{doctor.name}</td>
                  <td align="center">{doctor.gender} </td>
                  <td align="center">{doctor.email}</td>
                  <td>
                    <Button
                      label="Delete"
                      onClick={() => {
                        let confirm = window.confirm("Are you sure?");
                        if (confirm) {
                          fetch(
                            "http://localhost:3001/deleteDoc?email=" +
                              doctor.email
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

export default DoctorList;
