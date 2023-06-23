import { Box, Button, Form, FormField, Grommet, Heading } from "grommet";
import React, { Component } from "react";

const theme = {
  global: {
    colors: {
      brand: "#000000",
      focus: "#000000",
      active: "#000000",
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
class AdminLogin extends Component {
  render() {
    return (
      <Grommet theme={theme} full>
        <AppBar>
          <a style={{ color: "inherit", textDecoration: "inherit" }} href="/">
            <Heading level="3" margin="none">
              HMS
            </Heading>
          </a>
          <div>
            <Button
              label="Login as Patient"
              style={{
                textAlign: "center",
                margin: "0.5rem",
                border: "1px solid #fff",
              }}
              fill="horizontal"
              href="/"
            />
          </div>
        </AppBar>

        <Box fill align="center" justify="top" pad="medium">
          <Box width="medium" pad="medium">
            <Form
              onReset={(event) => console.log(event)}
              onSubmit={({ value }) => {
                fetch(
                  "http://localhost:3001/checkAdmin?email=" +
                    value.email +
                    "&password=" +
                    value.password
                )
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.data.length === 0) {
                      window.alert("Invalid Log In");
                    } else {
                      window.location = "/adminDashboard";
                    }
                  });
              }}
            >
              <FormField
                color="#00739D"
                label="Admin Email"
                name="email"
                type="email"
                placeholder="Please enter admin email."
                required
              />
              <FormField
                color="#00739D"
                type="password"
                label="Admin Password"
                name="password"
                placeholder="Please enter admin password."
                required
              />
              <Box direction="column" align="center">
                <Button
                  style={{ textAlign: "center", margin: "1rem" }}
                  type="submit"
                  label="Log In"
                  fill="horizontal"
                  primary
                />
              </Box>
            </Form>
          </Box>
        </Box>
      </Grommet>
    );
  }
}

export default AdminLogin;
