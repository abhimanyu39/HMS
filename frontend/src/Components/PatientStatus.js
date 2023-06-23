import React, { Component } from "react";

import {
  Box,
  Heading,
  Grommet,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from "grommet";

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

export class PatientStatus extends Component {
  state = { patientEmail: "", personalDetails: [], appointments: [] };
  componentDidMount() {
    const { email } = this.props.match.params;
    // this.allDiagnoses(email);
    this.setState({
      patientEmail: email,
    });
    this.getPersonalDetails(email);
    this.getAllAppointments(email);
  }

  getPersonalDetails(value) {
    let email = "'" + value + "'";
    fetch("http://localhost:3001/OneHistory?email=" + email)
      .then((res) => res.json())
      .then((res) => this.setState({ personalDetails: res.data }));
  }

  // allDiagnoses(value) {
  //   let email = "'" + value + "'";
  //   fetch("http://localhost:3001/allDiagnoses?patientEmail=" + email)
  //     .then((res) => res.json())
  //     .then((res) => this.setState({ medhiststate2: res.data }));
  // }

  getAllAppointments(value) {
    let email = "'" + value + "'";
    fetch("http://localhost:3001/getAllAppointment?email=" + email)
      .then((res) => res.json())
      .then((res) => this.setState({ appointments: res.data }));
  }

  render() {
    const { personalDetails, appointments } = this.state;

    const Header = () => (
      <Box
        tag="header"
        background="brand"
        pad="small"
        elevation="small"
        justify="between"
        direction="row"
        align="center"
        flex={false}
      >
        <a
          style={{ color: "inherit", textDecoration: "inherit" }}
          href="/adminDashboard"
        >
          <Heading level="3" margin="none">
            HMS
          </Heading>
        </a>
      </Box>
    );
    const Body = () => (
      <div className="container">
        <div className="panel panel-default p50 uth-panel">
          <h2 className="panel panel-default">Personal & Medical History</h2>
          {personalDetails.map((patient) => (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell scope="row">
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>{patient.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell scope="row">
                    <strong>Gender</strong>
                  </TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell />
                  <TableCell>
                    <strong>Address</strong>
                  </TableCell>
                  <TableCell>{patient.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell scope="row"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Conditions</strong>
                  </TableCell>
                  <TableCell>{patient.conditions}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell scope="row"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Surgeries</strong>
                  </TableCell>
                  <TableCell>{patient.surgeries}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell scope="row"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Medications</strong>
                  </TableCell>
                  <TableCell>{patient.medication}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
        </div>
        <hr />
      </div>
    );
    const Body2 = () => (
      <div className="container">
        <div className="panel panel-default p50 uth-panel">
          <div
            style={{ display: "flex", alignItems: "center", columnGap: "30px" }}
          >
            <h2 className="panel panel-default">Appointments</h2>
            <Button
              primary
              style={{ height: "min-content" }}
              label="Schedule appointment"
              href={`/scheduleAppointment/${this.state.patientEmail}/admin`}
            ></Button>
          </div>
          {appointments.map((patient) => (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "30px",
                }}
              >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell scope="row">
                        <strong>Date</strong>
                      </TableCell>
                      <TableCell>{patient.date.split("T")[0]}</TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <strong>Doctor</strong>
                      </TableCell>
                      <TableCell>
                        {patient.doctor === ""
                          ? "Not assigned"
                          : patient.doctor}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="row">
                        <strong>Concerns</strong>
                      </TableCell>
                      <TableCell>{patient.concerns}</TableCell>
                      <TableCell />
                      <TableCell>
                        <strong>Symptoms</strong>
                      </TableCell>
                      <TableCell>{patient.symptoms}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="row"></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Diagnosis</strong>
                      </TableCell>
                      <TableCell>
                        {patient.diagnosis === ""
                          ? "Not available"
                          : patient.diagnosis}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="row"></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Prescription</strong>
                      </TableCell>
                      <TableCell>
                        {patient.prescription === ""
                          ? "Not available"
                          : patient.prescription}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="row"></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button
                  label="Edit"
                  href={`/editAppointment/${patient.id}/${patient.email}`}
                />
              </div>
              <hr />
            </>
          ))}
        </div>
      </div>
    );
    return (
      <Grommet full={true} theme={theme}>
        <Box fill={true}>
          <Header />
          <Body />
          <Body2 />
        </Box>
      </Grommet>
    );
  }
}
export default PatientStatus;
