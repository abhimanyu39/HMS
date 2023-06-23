import React, { Component, useState } from "react";
import { Box, Button, Heading, Grommet, Text, Grid } from "grommet";

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

const SidebarButton = ({ label, ...rest }) => (
  <Button plain {...rest}>
    {({ hover }) => (
      <Box
        background={hover ? "#DADADA" : undefined}
        pad={{ horizontal: "large", vertical: "medium" }}
      >
        <Text size="large">{label}</Text>
      </Box>
    )}
  </Button>
);

const SidebarButtons = () => {
  const [active, setActive] = useState();
  return (
    <Grommet full theme={theme}>
      <Box fill direction="row">
        <Box background="brand">
          {[
            "Add Patient",
            "Add Doctor",
            "Patients List",
            "Doctors List",
            "Sign Out",
          ].map((label) => (
            <SidebarButton
              key={label}
              label={label}
              active={label === active}
              onClick={() => {
                if (label === "Patients List") {
                  window.location = "/patientsList";
                } else if (label === "Sign Out") {
                  fetch("http://localhost:3001/endSession");
                  window.location = "/";
                } else if (label === "Doctors List") {
                  window.location = "/doctorList";
                } else if (label === "Add Patient") {
                  window.location = "/addPatient";
                } else if (label === "Add Doctor") {
                  window.location = "/MakeDoc";
                }
                setActive(label);
              }}
            />
          ))}
        </Box>
      </Box>
    </Grommet>
  );
};

class AdminDashboard extends Component {
  render() {
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
        style={{ borderBottom: "1px solid grey" }}
      >
        <a style={{ color: "inherit", textDecoration: "inherit" }}>
          <Heading level="3" margin="none">
            HMS
          </Heading>
        </a>
      </Box>
    );

    return (
      <Grommet full={true} theme={theme}>
        <Box fill={true}>
          <Header />
          <Grid
            fill
            rows={["auto", "flex"]}
            columns={["auto", "flex"]}
            areas={[
              { name: "sidebar", start: [0, 1], end: [0, 1] },
              { name: "main", start: [1, 1], end: [1, 1] },
            ]}
          >
            <Box
              gridArea="sidebar"
              width="small"
              animation={[
                { type: "fadeIn", duration: 300 },
                { type: "slideRight", size: "xlarge", duration: 150 },
              ]}
            >
              <SidebarButtons />
            </Box>
            <Box gridArea="main" justify="top" align="center">
              <Box align="center" pad="large">
                <Heading color="#000000">Admin Dashboard</Heading>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Grommet>
    );
  }
}

export default AdminDashboard;
