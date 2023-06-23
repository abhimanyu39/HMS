import React, { Component, useState, useEffect } from "react";
import { Schedule } from "grommet-icons";
import {
  Box,
  Button,
  Heading,
  Form,
  Text,
  TextArea,
  Grommet,
  Calendar,
  DropButton,
  MaskedInput,
  Keyboard,
  Select,
} from "grommet";
import "../App.css";
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
var theDate;
var theTime;
var endTime;
var theConcerns;
var theSymptoms;
var theDoc;
var theDiagnosis;
var thePrescription;
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

const DropContent = ({
  date: initialDate,
  time: initialTime,
  onClose,
  apptDetails,
}) => {
  const [date, setDate] = React.useState(apptDetails.date);
  const [time, setTime] = React.useState(apptDetails.starttime);

  const close = () => {
    theDate = date;
    theTime = time;
    //time is string, store it as [hour, min]
    let parsedTime = theTime?.split(":");
    let startHour;
    let endHour;
    //parse hr string to in and add one hour to start hour

    startHour = parseInt(parsedTime[0], 10);
    endHour = startHour + 1;

    //rejoin into string
    endTime = `${endHour}:00`;

    onClose(date || initialDate, time || initialTime);
  };

  return (
    <Box align="center">
      <Calendar
        animate={false}
        date={date || initialDate}
        onSelect={setDate}
        showAdjacentDays={false}
        required
      />
      <Box flex={false} pad="medium" gap="small">
        <Keyboard
          required
          onEnter={(event) => {
            event.preventDefault(); // so drop doesn't re-open
            close();
          }}
        >
          <MaskedInput
            mask={[
              {
                length: [1, 2],
                options: [
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17",
                  "18",
                  "19",
                  "20",
                  "21",
                  "22",
                  "23",
                ],
                regexp: /^1[1-2]$|^[0-9]$/,
                placeholder: "hh",
              },
              { fixed: ":" },
              {
                length: 2,
                options: ["00"],
                regexp: /^[0-5][0-9]$|^[0-9]$/,
                placeholder: "mm",
              },
            ]}
            value={time || initialTime}
            name="maskedInput"
            onChange={(event) => setTime(event.target.value)}
            required
          />
        </Keyboard>
        <Box flex={false}>
          <Button label="Done" onClick={close} color="#00739D" />
        </Box>
      </Box>
    </Box>
  );
};

const DateTimeDropButton = ({ apptDetails }) => {
  const [date, setDate] = React.useState(apptDetails.date);
  const [time, setTime] = React.useState(apptDetails.starttime);
  const [open, setOpen] = React.useState();

  const onClose = (nextDate, nextTime) => {
    setDate(nextDate);
    setTime(nextTime);
    setOpen(false);
    setTimeout(() => setOpen(undefined), 1);
  };

  return (
    <Grommet theme={theme}>
      <Box align="center" pad="large">
        <DropButton
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          dropContent={
            <DropContent
              date={date}
              time={time}
              onClose={onClose}
              apptDetails={apptDetails}
            />
          }
        >
          <Box direction="row" gap="small" align="center" pad="small">
            <Text color={date ? undefined : "dark-5"}>
              {date
                ? `${new Date(date).toLocaleDateString()} ${time}`
                : "Select date & time"}
            </Text>
            <Schedule />
          </Box>
        </DropButton>
      </Box>
    </Grommet>
  );
};

const ConcernsTextArea = ({ apptDetails }) => {
  const [value, setValue] = React.useState(apptDetails.concerns);

  const onChange = (event) => {
    setValue(event.target.value);
    theConcerns = event.target.value;
  };

  return (
    <Grommet theme={theme}>
      <Box width="medium" height="xsmall">
        <TextArea
          placeholder="Enter concerns..."
          value={value}
          onChange={onChange}
          fill
          required
        />
      </Box>
    </Grommet>
  );
};

const SymptomsTextArea = ({ apptDetails }) => {
  const [value, setValue] = React.useState(apptDetails.symptoms);

  const onChange = (event) => {
    setValue(event.target.value);
    theSymptoms = event.target.value;
  };
  return (
    <Grommet theme={theme}>
      <Box width="medium" height="xsmall">
        <TextArea
          placeholder="Enter symptoms..."
          value={value}
          onChange={onChange}
          fill
          required
        />
      </Box>
    </Grommet>
  );
};

const DiagnosisTextArea = ({ apptDetails }) => {
  const [value, setValue] = React.useState(apptDetails.diagnosis);

  const onChange = (event) => {
    setValue(event.target.value);
    theDiagnosis = event.target.value;
  };
  return (
    <Grommet theme={theme}>
      <Box width="medium" height="xsmall">
        <TextArea
          placeholder="Enter diagnosis..."
          value={value}
          onChange={onChange}
          fill
          required
        />
      </Box>
    </Grommet>
  );
};

const PrescriptionTextArea = ({ apptDetails }) => {
  const [value, setValue] = React.useState(apptDetails.prescription);

  const onChange = (event) => {
    setValue(event.target.value);
    thePrescription = event.target.value;
  };
  return (
    <Grommet theme={theme}>
      <Box width="medium" height="xsmall">
        <TextArea
          placeholder="Enter prescription..."
          value={value}
          onChange={onChange}
          fill
          required
        />
      </Box>
    </Grommet>
  );
};

function DoctorsDropdown({ apptDetails }) {
  const [value, setValue] = useState(apptDetails.doctor);
  const [doctorsList, setList] = useState([]);
  const [totalList, setTotalList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/docInfo")
      .then((res) => res.json())
      .then((res) => {
        setTotalList(res.data);
        let arr = [];
        res.data.forEach((i) => {
          let tmp = `${i.name} (${i.email})`;
          arr.push(tmp);
        });
        setList(arr);
      });
  }, []);
  const onChange = (event) => {
    setValue(event.value);
    let doc = event.value.match(/\((.*)\)/)[1];
    theDoc = doc;
  };
  return (
    <Select
      options={doctorsList}
      value={doctorsList.filter((item) => item.includes(value))}
      placeholder="Select Doctor"
      onChange={onChange}
      fill
      required
    />
  );
}

export class EditAppointment extends Component {
  constuctor() {}
  state = { apptId: "", apptDetails: "", patientEmail: "" };
  componentDidMount() {
    const { id } = this.props.match.params;
    const { email } = this.props.match.params;
    this.setState({ apptId: id, patientEmail: email });

    this.getAppointment(id);
  }
  getAppointment(id) {
    fetch("http://localhost:3001/getAppt?id=" + id)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ apptDetails: res.data[0] });
        let detail = res.data[0];
        theDate = detail.data;
        theTime = detail.starttime;
        endTime = detail.endtime;
        theConcerns = detail.concerns;
        theSymptoms = detail.symptoms;
        theDiagnosis = detail.diagnosis;
        thePrescription = detail.prescription;
        theDoc = detail.doctor;
      });
  }
  render() {
    return (
      <Grommet theme={theme} full>
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
        <Box align="center" pad="small" gap="small">
          <Form
            onSubmit={({ value }) => {
              fetch(
                "http://localhost:3001/editAppointment?time=" +
                  theTime +
                  "&endTime=" +
                  endTime +
                  "&date=" +
                  theDate +
                  "&concerns=" +
                  theConcerns +
                  "&symptoms=" +
                  theSymptoms +
                  "&doc=" +
                  theDoc +
                  "&diagnosis=" +
                  theDiagnosis +
                  "&prescription=" +
                  thePrescription +
                  "&id=" +
                  this.state.apptId
              )
                .then((res) => res.json())
                .then((res) => {
                  window.alert("Appointment modified!");
                  window.location = "/patientStatus/" + this.state.patientEmail;
                });
            }}
          >
            {this.state.apptDetails && (
              <>
                <Box align="center" gap="small">
                  <DoctorsDropdown apptDetails={this.state.apptDetails} />
                </Box>
                <DateTimeDropButton
                  apptDetails={this.state.apptDetails}
                ></DateTimeDropButton>
                <ConcernsTextArea apptDetails={this.state.apptDetails} />
                <br />
                <SymptomsTextArea apptDetails={this.state.apptDetails} />
                <br />
                <DiagnosisTextArea apptDetails={this.state.apptDetails} />
                <br />
                <PrescriptionTextArea apptDetails={this.state.apptDetails} />
                <br />
                <Box align="center" pad="small" gap="small">
                  <Button label="Submit" type="submit" primary />
                </Box>
              </>
            )}
          </Form>
        </Box>
      </Grommet>
    );
  }
}
export default EditAppointment;
