import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Radio from "@material-ui/core/Radio";
import * as settings from "../settings";
import { API_SERVER } from "../settings";
import styles from "./Questionnaire.module.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useHistory } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";

var mshtml = { __html: "msgolden.html" };

var birthyears = [];
for (var i = 2020; i >= 1900; i--) {
  birthyears.push(i);
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Questionnaire = () => {
  const [title, setTitle] = useState("Questionnaire");
  const [showing, setShowing] = useState(true);
  const [newGroup, setNewGroup] = useState(0);
  const [allGroups, setAllGroups] = useState([]);

  //subject
  const [subjectID, setSubjectID] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [handedness, setHandedness] = useState("");
  const [birthyear, setBirthyear] = useState("");

  //geninfo
  const [foodTime, setFoodTime] = useState("");
  const [weight, setWeight] = useState("");
  const [caffeine, setCaffeine] = useState("");
  const [nicotine, setNicotine] = useState("");
  const [healthyScale, setHealthyScale] = useState("");
  const [groups, setGroups] = useState("");
  const [noExercise, setNoExercise] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [msdrugs, setMsdrugs] = useState("");
  const [motionsickness, setMotionsickness] = useState("");
  const [comments, setComments] = useState("");

  //     //nausea
  const [cars, setCars] = useState("");
  const [busses, setBusses] = useState("");
  const [airplanes, setAirplanes] = useState("");
  const [smallboats, setSmallboats] = useState("");
  const [ships, setShips] = useState("");
  const [roundabout, setRoundabout] = useState("");
  const [swings, setSwings] = useState("");
  const [funfair, setFunfair] = useState("");
  const [trains, setTrains] = useState("");

  // msgolden before
  const [gendis_b, setgendis_b] = useState("");
  const [fatigue_b, setFatigue_b] = useState("");
  const [headache_b, setHeadache_b] = useState("");
  const [eyestrain_b, setEyestrain_b] = useState("");
  const [diffoffocus_b, setDiffoffocus_b] = useState("");
  const [increasedsaliva_b, setIncreasedsaliva_b] = useState("");
  const [sweating_b, setSweating_b] = useState("");
  const [nausea_b, setNausea_b] = useState("");
  const [blurredvis_b, setBlurredvis_b] = useState("");
  const [dizziness_b, setDizziness_b] = useState("");

  //msgolden after
  const [gendis_a, setGendis_a] = useState("");
  const [fatigue_a, setFatigue_a] = useState("");
  const [headache_a, setHeadache_a] = useState("");
  const [eyestrain_a, setEyestrain_a] = useState("");
  const [diffoffocus_a, setDiffoffocus_a] = useState("");
  const [increasedsaliva_a, setIncreasedsaliva_a] = useState("");
  const [sweating_a, setSweating_a] = useState("");
  const [nausea_a, setNausea_a] = useState("");
  const [blurredvis_a, setBlurredvis_a] = useState("");
  const [dizziness_a, setDizziness_a] = useState("");

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGroup = () => {
    fetch(API_SERVER + "/api/addgroup/", {
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newGroup),
    })
      .catch((error) => {
        console.log("ERROR", error);
      })
      .then((res) => {
        newGroupAlert();
      });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Add a group</h2>
      <p id="simple-modal-description">
        Enter the name of the group you would like to add
      </p>
      <TextField
        onChange={(event) => setNewGroup(event.target.value)}
        id="NewGroup"
        label="Name"
      />
      <Button style={{ backgroundColor: "white" }} onClick={handleGroup}>
        Add group
      </Button>
    </div>
  );

  function submittedAlert() {
    alert("Submitted!");
  }

  function newGroupAlert() {
    alert("The group has been added!");
  }

  // function handleOpen() {
  //   this.setState({
  //     open: true
  //   })
  // };

  // function handleClose() {
  //   this.setState({
  //     open: false
  //   })
  // };

  function handleSubmit(event) {
    event.preventDefault();
    let data = {
      subjectID: subjectID,
      gender: gender,
      height: height,
      handedness: handedness,
      birthyear: birthyear,

      //geninfo
      foodTime: foodTime,
      weight: weight,
      caffeine: caffeine,
      nicotine: nicotine,
      healthyScale: healthyScale,
      groups: groups,
      noExercise: noExercise,
      alcohol: alcohol,
      msdrugs: msdrugs,
      motionsickness: motionsickness,
      comments: comments,

      //nausea
      cars: cars,
      busses: busses,
      airplanes: airplanes,
      smallboats: smallboats,
      ships: ships,
      roundabout: roundabout,
      swings: swings,
      funfair: funfair,
      trains: trains,

      //msgolden before
      gendis_b: gendis_b,
      fatigue_b: fatigue_b,
      headache_b: headache_b,
      eyestrain_b: eyestrain_b,
      diffoffocus_b: diffoffocus_b,
      increasedsaliva_b: increasedsaliva_b,
      sweating_b: sweating_b,
      nausea_b: nausea_b,
      blurredvis_b: blurredvis_b,
      dizziness_b: diffoffocus_b,

      //msgolden after
      gendis_a: gendis_a,
      fatigue_a: fatigue_a,
      headache_a: headache_a,
      eyestrain_a: eyestrain_a,
      diffoffocus_a: diffoffocus_a,
      increasedsaliva_a: increasedsaliva_a,
      sweating_a: sweating_a,
      nausea_a: nausea_a,
      blurredvis_a: blurredvis_a,
      dizziness_a: diffoffocus_a,
    };

    fetch(API_SERVER + "/api/questionnaire/", {
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .catch((error) => {
        console.log("ERROR", error);
      })
      .then((res) => {
        console.log(res);
        console.log(data);
      });
    submittedAlert();
  }

  const fetchGroups = () => {
    fetch(API_SERVER + "/api/groups/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        var g = [];
        {
          result.map((s) => g.push(s));
        }
        setAllGroups(g);
      });
  };

  useEffect(() => {
    fetchGroups();
  }, [newGroup]);

  // const { showing } = this.state;
  return (
    // <div className="Questionnaire">
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <form onSubmit={handleSubmit}>
          <div>
            <button onClick={() => setShowing(!showing)}>
              <h1>QUESTIONNAIRE</h1>
            </button>
            <div style={{ display: showing ? "block" : "none" }}>
              <label style={{ fontWeight: "bold" }}>
                SubjectID:
                <input
                  style={{ width: 100, marginLeft: 66, marginTop: 10 }}
                  type="text"
                  required
                  value={subjectID}
                  onChange={(event) => {
                    setSubjectID(event.target.value);
                  }}
                />
              </label>
              <br />
              <br />
              <label style={{ fontWeight: "bold" }}>
                {" "}
                Group:
                <select
                  style={{ width: 100, marginLeft: 92, marginBottom: 30 }}
                  required
                  value={groups}
                  onChange={(event) => setGroups(event.target.value)}
                >
                  {/* {allGroups.map((g) => (
                    <option value={parseInt(g.groupsid)}>{g.name}</option>
                  ))} */}
                  <option></option>
                  {allGroups.map((g) => (
                    <option value={g.groupsid}>
                      {g.name + "(" + g.groupsid + ")"}
                    </option>
                  ))}
                </select>
                <Button
                  style={{ backgroundColor: "rgb(244, 244, 244)" }}
                  onClick={() => handleOpen()}
                >
                  <AddIcon />
                </Button>
              </label>

              <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  {body}
                </Modal>
              </div>
            </div>
          </div>

          <br />
          <br />
          <label style={{ fontWeight: "bold" }}>
            {" "}
            Gender:
            <select
              style={{ width: 100, marginLeft: 87 }}
              required
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              <option></option>
              <option value="1">Male</option>
              <option value="0">Female</option>
              <option value="2">Other</option>
            </select>
          </label>
          <br />
          <br />

          <label style={{ fontWeight: "bold" }}>
            {" "}
            Birthyear:
            <select
              style={{ width: 100, marginLeft: 75 }}
              required
              value={birthyear}
              onChange={(event) => setBirthyear(event.target.value)}
            >
              <option></option>
              {birthyears.map((s) => (
                <option value={s}>{s}</option>
              ))}
            </select>
          </label>
          <br />
          <br />
          <label style={{ fontWeight: "bold" }}>
            Height:
            <input
              style={{ width: 100, marginLeft: 94, marginRight: 5 }}
              type="number"
              required
              value={height}
              onChange={(event) => setHeight(event.target.value)}
              min="100"
              max="300"
            />
            cm
          </label>
          <br />
          <br />
          {/* <h2>GENERAL INFORMATION</h2>  */}
          <label style={{ fontWeight: "bold" }}>
            Weight:
            <input
              style={{ width: 100, marginLeft: 92, marginRight: 5 }}
              type="number"
              required
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              min="30"
              max="200"
            />
            kg
          </label>
          <br />
          <br />
          <label>
            <div style={{ fontWeight: "bold" }}>
              Right-handed or left-handed?{" "}
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="1"
                  name="handedness"
                  required
                  checked={handedness === "1"}
                  onChange={(event) => setHandedness(event.target.value)}
                />
                Right-handed
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="0"
                  name="handedness"
                  checked={handedness === "0"}
                  onChange={(event) => setHandedness(event.target.value)}
                />
                Left-handed
              </label>
            </div>
          </label>

          <br />

          <label>
            <div style={{ fontWeight: "bold" }}>
              Do you use any source of nicotine on a daily basis?{" "}
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="1"
                  name="nicotine"
                  required
                  checked={nicotine === "1"}
                  onChange={(event) => setNicotine(event.target.value)}
                />
                Yes
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="0"
                  name="nicotine"
                  checked={nicotine === "0"}
                  onChange={(event) => setNicotine(event.target.value)}
                />
                No
              </label>
            </div>
          </label>
          <br />
          <label>
            <div style={{ fontWeight: "bold" }}>
              Have you indulged caffeine today?{" "}
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="1"
                  name="caffeine"
                  required
                  checked={caffeine === "1"}
                  onChange={(event) => setCaffeine(event.target.value)}
                />
                Yes
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="0"
                  name="caffeine"
                  checked={caffeine === "0"}
                  onChange={(event) => setCaffeine(event.target.value)}
                />
                No
              </label>
            </div>
          </label>
          <br />
          <label>
            <div style={{ fontWeight: "bold" }}>
              How healthy do you consider yourself?{" "}
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="5"
                  name="healthy"
                  required
                  checked={healthyScale === "5"}
                  onChange={(event) => setHealthyScale(event.target.value)}
                />
                Very healthy
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="4"
                  name="healthy"
                  checked={healthyScale === "4"}
                  onChange={(event) => setHealthyScale(event.target.value)}
                />
                Healthy
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="3"
                  name="healthy"
                  checked={healthyScale === "3"}
                  onChange={(event) => setHealthyScale(event.target.value)}
                />
                Neutral
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="2"
                  name="healthy"
                  checked={healthyScale === "2"}
                  onChange={(event) => setHealthyScale(event.target.value)}
                />
                Unhealthy
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="1"
                  name="healthy"
                  checked={healthyScale === "1"}
                  onChange={(event) => setHealthyScale(event.target.value)}
                />
                Very unhealthy
              </label>
            </div>
          </label>

          <br />

          <label>
            <div style={{ fontWeight: "bold" }}>
              How long has it been since you last ate?{" "}
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="0"
                  name="food"
                  required
                  checked={foodTime === "0"}
                  onChange={(event) => setFoodTime(event.target.value)}
                />
                Less than an hour
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="1"
                  name="food"
                  checked={foodTime === "1"}
                  onChange={(event) => setFoodTime(event.target.value)}
                />
                Between one and two hours
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="2"
                  name="food"
                  checked={foodTime === "2"}
                  onChange={(event) => setFoodTime(event.target.value)}
                />
                Between two and three hours
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="3"
                  name="food"
                  checked={foodTime === "3"}
                  onChange={(event) => setFoodTime(event.target.value)}
                />
                More than three hours
              </label>
            </div>
          </label>
          <br />

          <label>
            <div style={{ fontWeight: "bold" }}>
              How often a week do you practice any kind of physical activity?{" "}
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="0"
                  name="physical"
                  required
                  checked={noExercise === "0"}
                  onChange={(event) => setNoExercise(event.target.value)}
                />
                Never
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="1"
                  name="physical"
                  checked={noExercise === "1"}
                  onChange={(event) => setNoExercise(event.target.value)}
                />
                Once or twice a week
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="2"
                  name="physical"
                  checked={noExercise === "2"}
                  onChange={(event) => setNoExercise(event.target.value)}
                />
                Three to four times a week
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="3"
                  name="physical"
                  checked={noExercise === "3"}
                  onChange={(event) => setNoExercise(event.target.value)}
                />
                Five to six times a week
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="4"
                  name="physical"
                  checked={noExercise === "4"}
                  onChange={(event) => setNoExercise(event.target.value)}
                />
                Everyday
              </label>
            </div>
          </label>
          <br />

          <label>
            <div style={{ fontWeight: "bold" }}>
              How recently have you indulged alcohol?{" "}
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="0"
                  name="alcohol"
                  required
                  checked={alcohol === "0"}
                  onChange={(event) => setAlcohol(event.target.value)}
                />
                Today
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="1"
                  name="alcohol"
                  checked={alcohol === "1"}
                  onChange={(event) => setAlcohol(event.target.value)}
                />
                Yesterday
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="2"
                  name="alcohol"
                  checked={alcohol === "2"}
                  onChange={(event) => setAlcohol(event.target.value)}
                />
                More than two days ago
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="3"
                  name="alcohol"
                  checked={alcohol === "3"}
                  onChange={(event) => setAlcohol(event.target.value)}
                />
                I don't drink alcohol
              </label>
            </div>
          </label>

          <br />

          <label>
            <div style={{ fontWeight: "bold" }}>
              {" "}
              Do you experience motion sickness?{" "}
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="0"
                  name="ms"
                  required
                  checked={motionsickness === "0"}
                  onChange={(event) => setMotionsickness(event.target.value)}
                />
                No, never
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="1"
                  name="ms"
                  checked={motionsickness === "1"}
                  onChange={(event) => setMotionsickness(event.target.value)}
                />
                Yes, but rarely
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="2"
                  name="ms"
                  checked={motionsickness === "2"}
                  onChange={(event) => setMotionsickness(event.target.value)}
                />
                Yes, sometimes
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="3"
                  name="ms"
                  checked={motionsickness === "3"}
                  onChange={(event) => setMotionsickness(event.target.value)}
                />
                Yes, often
              </label>
            </div>
          </label>

          <br />

          <label>
            <div style={{ fontWeight: "bold" }}>
              Have you ever taken any drugs to minimise your motion sickness?{" "}
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="1"
                  name="msdrugs"
                  required
                  checked={msdrugs === "1"}
                  onChange={(event) => setMsdrugs(event.target.value)}
                />
                Yes
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="0"
                  name="msdrugs"
                  checked={msdrugs === "0"}
                  onChange={(event) => setMsdrugs(event.target.value)}
                />
                No
              </label>
            </div>
          </label>

          <br />
          <label style={{ fontWeight: "bold" }}>
            Any comments?
            <input
              type="text"
              value={comments}
              onChange={(event) => setComments(event.target.value)}
            />
          </label>

          <br />
          <br />

          {/* <h2>NAUSEA</h2>  */}

          <div>
            <label>
              <h3>
                For each of the following types of transport or entertainment,
                please indicate how often you have felt sick or nauseated.
              </h3>
            </label>
            <br />

            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 50, marginTop: 40 }}>
                {" "}
                Cars{" "}
              </p>

              <label>
                Not applicable / Never travelled <br />
                <input
                  style={{ marginLeft: 40 }}
                  type="radio"
                  value="0"
                  name="cars"
                  required
                  checked={cars === "0"}
                  onChange={(event) => setCars(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 20 }}>
                Never felt sick <br />
                <input
                  style={{ marginRight: 40 }}
                  type="radio"
                  value="1"
                  name="cars"
                  checked={cars === "1"}
                  onChange={(event) => setCars(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 20 }}>
                Rarely felt sick <br />
                <input
                  type="radio"
                  value="2"
                  name="cars"
                  checked={cars === "2"}
                  onChange={(event) => setCars(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 10 }}>
                Sometimes felt sick <br />
                <input
                  type="radio"
                  value="3"
                  name="cars"
                  checked={cars === "3"}
                  onChange={(event) => setCars(event.target.value)}
                />
              </label>
              <label>
                Frequently felt sick <br />
                <input
                  type="radio"
                  value="4"
                  name="cars"
                  checked={cars === "4"}
                  onChange={(event) => setCars(event.target.value)}
                />
              </label>
            </div>
            <br />
            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 66 }}> Busses </p>
              <label style={{ marginRight: 77, marginTop: 15 }}>
                <input
                  type="radio"
                  value="0"
                  name="busses"
                  required
                  checked={busses === "0"}
                  onChange={(event) => setBusses(event.target.value)}
                />
              </label>

              <label style={{ marginRight: 60, marginTop: 15 }}>
                <input
                  type="radio"
                  value="1"
                  name="busses"
                  checked={busses === "1"}
                  onChange={(event) => setBusses(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 61, marginTop: 15 }}>
                <input
                  type="radio"
                  value="2"
                  name="busses"
                  checked={busses === "2"}
                  onChange={(event) => setBusses(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 72, marginTop: 15 }}>
                <input
                  type="radio"
                  value="3"
                  name="busses"
                  checked={busses === "3"}
                  onChange={(event) => setBusses(event.target.value)}
                />
              </label>
              <label style={{ marginTop: 15 }}>
                <input
                  type="radio"
                  value="4"
                  name="busses"
                  checked={busses === "4"}
                  onChange={(event) => setBusses(event.target.value)}
                />
              </label>
            </div>
            <br />
            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 78 }}> Ships </p>
              <label style={{ marginRight: 77, marginTop: 15 }}>
                <input
                  type="radio"
                  value="0"
                  name="ships"
                  required
                  checked={ships === "0"}
                  onChange={(event) => setShips(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 60, marginTop: 15 }}>
                <input
                  type="radio"
                  value="1"
                  name="ships"
                  checked={ships === "1"}
                  onChange={(event) => setShips(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 61, marginTop: 15 }}>
                <input
                  type="radio"
                  value="2"
                  name="ships"
                  checked={ships === "2"}
                  onChange={(event) => setShips(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 72, marginTop: 15 }}>
                <input
                  type="radio"
                  value="3"
                  name="ships"
                  checked={ships === "3"}
                  onChange={(event) => setShips(event.target.value)}
                />
              </label>
              <label style={{ marginTop: 15 }}>
                <input
                  type="radio"
                  value="4"
                  name="ships"
                  checked={ships === "4"}
                  onChange={(event) => setShips(event.target.value)}
                />
              </label>
            </div>
            <br />

            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 36 }}>
                {" "}
                Small boats{" "}
              </p>
              <label style={{ marginRight: 77, marginTop: 15 }}>
                <input
                  type="radio"
                  value="0"
                  name="smallboats"
                  required
                  checked={smallboats === "0"}
                  onChange={(event) => setSmallboats(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 60, marginTop: 15 }}>
                <input
                  type="radio"
                  value="1"
                  name="smallboats"
                  checked={smallboats === "1"}
                  onChange={(event) => setSmallboats(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 61, marginTop: 15 }}>
                <input
                  type="radio"
                  value="2"
                  name="smallboats"
                  checked={smallboats === "2"}
                  onChange={(event) => setSmallboats(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 72, marginTop: 15 }}>
                <input
                  type="radio"
                  value="3"
                  name="smallboats"
                  checked={smallboats === "3"}
                  onChange={(event) => setSmallboats(event.target.value)}
                />
              </label>
              <label style={{ marginTop: 15 }}>
                <input
                  type="radio"
                  value="4"
                  name="smallboats"
                  checked={smallboats === "4"}
                  onChange={(event) => setSmallboats(event.target.value)}
                />
              </label>
            </div>
            <br />

            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 52 }}> Airplanes </p>
              <label style={{ marginRight: 76, marginTop: 15 }}>
                <input
                  type="radio"
                  value="0"
                  name="airplanes"
                  required
                  checked={airplanes === "0"}
                  onChange={(event) => setAirplanes(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 60, marginTop: 15 }}>
                <input
                  type="radio"
                  value="1"
                  name="airplanes"
                  checked={airplanes === "1"}
                  onChange={(event) => setAirplanes(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 61, marginTop: 15 }}>
                <input
                  type="radio"
                  value="2"
                  name="airplanes"
                  checked={airplanes === "2"}
                  onChange={(event) => setAirplanes(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 72, marginTop: 15 }}>
                <input
                  type="radio"
                  value="3"
                  name="airplanes"
                  checked={airplanes === "3"}
                  onChange={(event) => setAirplanes(event.target.value)}
                />
              </label>
              <label style={{ marginTop: 15 }}>
                <input
                  type="radio"
                  value="4"
                  name="airplanes"
                  checked={airplanes === "4"}
                  onChange={(event) => setAirplanes(event.target.value)}
                />
              </label>
            </div>
            <br />

            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 25 }}>
                {" "}
                Roundabouts{" "}
              </p>
              <label style={{ marginRight: 77, marginTop: 15 }}>
                <input
                  type="radio"
                  value="0"
                  name="roundabouts"
                  required
                  checked={roundabout === "0"}
                  onChange={(event) => setRoundabout(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 60, marginTop: 15 }}>
                <input
                  type="radio"
                  value="1"
                  name="roundabouts"
                  checked={roundabout === "1"}
                  onChange={(event) => setRoundabout(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 61, marginTop: 15 }}>
                <input
                  type="radio"
                  value="2"
                  name="roundabouts"
                  checked={roundabout === "2"}
                  onChange={(event) => setRoundabout(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 72, marginTop: 15 }}>
                <input
                  type="radio"
                  value="3"
                  name="roundabouts"
                  checked={roundabout === "3"}
                  onChange={(event) => setRoundabout(event.target.value)}
                />
              </label>
              <label style={{ marginTop: 15 }}>
                <input
                  type="radio"
                  value="4"
                  name="roundabouts"
                  checked={roundabout === "4"}
                  onChange={(event) => setRoundabout(event.target.value)}
                />
              </label>
            </div>
            <br />

            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 67 }}> Swings </p>
              <label style={{ marginRight: 77, marginTop: 15 }}>
                <input
                  type="radio"
                  value="0"
                  name="swings"
                  required
                  checked={swings === "0"}
                  onChange={(event) => setSwings(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 60, marginTop: 15 }}>
                <input
                  type="radio"
                  value="1"
                  name="swings"
                  checked={swings === "1"}
                  onChange={(event) => setSwings(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 61, marginTop: 15 }}>
                <input
                  type="radio"
                  value="2"
                  name="swings"
                  checked={swings === "2"}
                  onChange={(event) => setSwings(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 72, marginTop: 15 }}>
                <input
                  type="radio"
                  value="3"
                  name="swings"
                  checked={swings === "3"}
                  onChange={(event) => setSwings(event.target.value)}
                />
              </label>
              <label style={{ marginTop: 15 }}>
                <input
                  type="radio"
                  value="4"
                  name="swings"
                  checked={swings === "4"}
                  onChange={(event) => setSwings(event.target.value)}
                />
              </label>
            </div>
            <br />

            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 68 }}> Funfair </p>
              <label style={{ marginRight: 77, marginTop: 15 }}>
                <input
                  type="radio"
                  value="0"
                  name="funfair"
                  required
                  checked={funfair === "0"}
                  onChange={(event) => setFunfair(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 60, marginTop: 15 }}>
                <input
                  type="radio"
                  value="1"
                  name="funfair"
                  checked={funfair === "1"}
                  onChange={(event) => setFunfair(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 61, marginTop: 15 }}>
                <input
                  type="radio"
                  value="2"
                  name="funfair"
                  checked={funfair === "2"}
                  onChange={(event) => setFunfair(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 72, marginTop: 15 }}>
                <input
                  type="radio"
                  value="3"
                  name="funfair"
                  checked={funfair === "3"}
                  onChange={(event) => setFunfair(event.target.value)}
                />
              </label>
              <label style={{ marginTop: 15 }}>
                <input
                  type="radio"
                  value="4"
                  name="funfair"
                  checked={funfair === "4"}
                  onChange={(event) => setFunfair(event.target.value)}
                />
              </label>
            </div>
            <br />

            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 75 }}> Trains </p>
              <label style={{ marginRight: 76, marginTop: 15 }}>
                <input
                  type="radio"
                  value="0"
                  name="trains"
                  required
                  checked={trains === "0"}
                  onChange={(event) => setTrains(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 60, marginTop: 15 }}>
                <input
                  type="radio"
                  value="1"
                  name="trains"
                  checked={trains === "1"}
                  onChange={(event) => setTrains(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 61, marginTop: 15 }}>
                <input
                  type="radio"
                  value="2"
                  name="trains"
                  checked={trains === "2"}
                  onChange={(event) => setTrains(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 72, marginTop: 15 }}>
                <input
                  type="radio"
                  value="3"
                  name="trains"
                  checked={trains === "3"}
                  onChange={(event) => setTrains(event.target.value)}
                />
              </label>
              <label style={{ marginTop: 15 }}>
                <input
                  type="radio"
                  value="4"
                  name="trains"
                  checked={trains === "4"}
                  onChange={(event) => setTrains(event.target.value)}
                />
              </label>
            </div>
          </div>

          <br />
          <br />
          {/* <h2>MS GOLDEN</h2>  */}
          <br />
          <div>
            <label>
              <h3>
                <u>Before</u> the virtual reality experience please indicate how
                you are feeling right now.{" "}
              </h3>
            </label>
            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p
                style={{ fontWeight: "bold", marginRight: 141, marginTop: 20 }}
              >
                {" "}
                General discomfort{" "}
              </p>
              <label style={{ marginRight: 38 }}>
                None <br />
                <input
                  type="radio"
                  value="0"
                  name="gendis1"
                  required
                  checked={gendis_b === "0"}
                  onChange={(event) => setgendis_b(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 37 }}>
                Slight <br />
                <input
                  type="radio"
                  value="1"
                  name="gendis1"
                  checked={gendis_b === "1"}
                  onChange={(event) => setgendis_b(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 12 }}>
                Moderate <br />
                <input
                  type="radio"
                  value="2"
                  name="gendis1"
                  checked={gendis_b === "2"}
                  onChange={(event) => setgendis_b(event.target.value)}
                />
              </label>
              <label>
                Severe <br />
                <input
                  type="radio"
                  value="3"
                  name="gendis1"
                  checked={gendis_b === "3"}
                  onChange={(event) => setgendis_b(event.target.value)}
                />
              </label>
            </div>

            <br />

            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 221 }}> Fatigue </p>
              <label>
                <input
                  style={{ marginRight: 54, marginTop: 15 }}
                  type="radio"
                  value="0"
                  name="fati1"
                  required
                  checked={fatigue_b === "0"}
                  onChange={(event) => setFatigue_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginRight: 55, marginTop: 15 }}
                  type="radio"
                  value="1"
                  name="fati1"
                  checked={fatigue_b === "1"}
                  onChange={(event) => setFatigue_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginRight: 54, marginTop: 15 }}
                  type="radio"
                  value="2"
                  name="fati1"
                  checked={fatigue_b === "2"}
                  onChange={(event) => setFatigue_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginTop: 15 }}
                  type="radio"
                  value="3"
                  name="fati1"
                  checked={fatigue_b === "3"}
                  onChange={(event) => setFatigue_b(event.target.value)}
                />
              </label>
            </div>

            <br />

            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 205 }}> Headache </p>
              <label>
                <input
                  style={{ marginRight: 54, marginTop: 15 }}
                  type="radio"
                  value="0"
                  name="headache1"
                  required
                  checked={headache_b === "0"}
                  onChange={(event) => setHeadache_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginRight: 55, marginTop: 15 }}
                  type="radio"
                  value="1"
                  name="headache1"
                  checked={headache_b === "1"}
                  onChange={(event) => setHeadache_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginRight: 54, marginTop: 15 }}
                  type="radio"
                  value="2"
                  name="headache1"
                  checked={headache_b === "2"}
                  onChange={(event) => setHeadache_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginTop: 15 }}
                  type="radio"
                  value="3"
                  name="headache1"
                  checked={headache_b === "3"}
                  onChange={(event) => setHeadache_b(event.target.value)}
                />
              </label>
            </div>

            <br />

            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 204 }}>
                {" "}
                Eye strain{" "}
              </p>
              <label>
                <input
                  style={{ marginRight: 54, marginTop: 15 }}
                  type="radio"
                  value="0"
                  name="eyestrain1"
                  required
                  checked={eyestrain_b === "0"}
                  onChange={(event) => setEyestrain_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginRight: 55, marginTop: 15 }}
                  type="radio"
                  value="1"
                  name="eyestrain1"
                  checked={eyestrain_b === "1"}
                  onChange={(event) => setEyestrain_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginRight: 54, marginTop: 15 }}
                  type="radio"
                  value="2"
                  name="eyestrain1"
                  checked={eyestrain_b === "2"}
                  onChange={(event) => setEyestrain_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginTop: 15 }}
                  type="radio"
                  value="3"
                  name="eyestrain1"
                  checked={eyestrain_b === "3"}
                  onChange={(event) => setEyestrain_b(event.target.value)}
                />
              </label>
            </div>

            <br />

            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 30 }}>
                {" "}
                Difficulty focusing or concentrating{" "}
              </p>
              <label>
                <input
                  style={{ marginRight: 54, marginTop: 15 }}
                  type="radio"
                  value="0"
                  name="difffoc1"
                  required
                  checked={diffoffocus_b === "0"}
                  onChange={(event) => setDiffoffocus_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginRight: 55, marginTop: 15 }}
                  type="radio"
                  value="1"
                  name="difffoc1"
                  checked={diffoffocus_b === "1"}
                  onChange={(event) => setDiffoffocus_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginRight: 54, marginTop: 15 }}
                  type="radio"
                  value="2"
                  name="difffoc1"
                  checked={diffoffocus_b === "2"}
                  onChange={(event) => setDiffoffocus_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginTop: 15 }}
                  type="radio"
                  value="3"
                  name="difffoc1"
                  checked={diffoffocus_b === "3"}
                  onChange={(event) => setDiffoffocus_b(event.target.value)}
                />
              </label>
            </div>

            <br />

            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 161 }}>
                {" "}
                Increased saliva{" "}
              </p>
              <label>
                <input
                  style={{ marginRight: 54, marginTop: 15 }}
                  type="radio"
                  value="0"
                  name="saliva1"
                  required
                  checked={increasedsaliva_b === "0"}
                  onChange={(event) => setIncreasedsaliva_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginRight: 55, marginTop: 15 }}
                  type="radio"
                  value="1"
                  name="saliva1"
                  checked={increasedsaliva_b === "1"}
                  onChange={(event) => setIncreasedsaliva_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginRight: 54, marginTop: 15 }}
                  type="radio"
                  value="2"
                  name="saliva1"
                  checked={increasedsaliva_b === "2"}
                  onChange={(event) => setIncreasedsaliva_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginTop: 15 }}
                  type="radio"
                  value="3"
                  name="saliva1"
                  checked={increasedsaliva_b === "3"}
                  onChange={(event) => setIncreasedsaliva_b(event.target.value)}
                />
              </label>
            </div>

            <br />

            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 209 }}> Sweating </p>
              <label>
                <input
                  style={{ marginRight: 54, marginTop: 15 }}
                  type="radio"
                  value="0"
                  name="sweating1"
                  required
                  checked={sweating_b === "0"}
                  onChange={(event) => setSweating_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginRight: 55, marginTop: 15 }}
                  type="radio"
                  value="1"
                  name="sweating1"
                  checked={sweating_b === "1"}
                  onChange={(event) => setSweating_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginRight: 54, marginTop: 15 }}
                  type="radio"
                  value="2"
                  name="sweating1"
                  checked={sweating_b === "2"}
                  onChange={(event) => setSweating_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginTop: 15 }}
                  type="radio"
                  value="3"
                  name="sweating1"
                  checked={sweating_b === "3"}
                  onChange={(event) => setSweating_b(event.target.value)}
                />
              </label>
            </div>

            <br />

            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 221 }}> Nausea </p>
              <label>
                <input
                  style={{ marginRight: 54, marginTop: 15 }}
                  type="radio"
                  value="0"
                  name="nausea1"
                  required
                  checked={nausea_b === "0"}
                  onChange={(event) => setNausea_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginRight: 55, marginTop: 15 }}
                  type="radio"
                  value="1"
                  name="nausea1"
                  checked={nausea_b === "1"}
                  onChange={(event) => setNausea_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginRight: 54, marginTop: 15 }}
                  type="radio"
                  value="2"
                  name="nausea1"
                  checked={nausea_b === "2"}
                  onChange={(event) => setNausea_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginTop: 15 }}
                  type="radio"
                  value="3"
                  name="nausea1"
                  checked={nausea_b === "3"}
                  onChange={(event) => setNausea_b(event.target.value)}
                />
              </label>
            </div>

            <br />

            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 176 }}>
                {" "}
                Blurred vision{" "}
              </p>
              <label>
                <input
                  style={{ marginRight: 54, marginTop: 15 }}
                  type="radio"
                  value="0"
                  name="blurr1"
                  required
                  checked={blurredvis_b === "0"}
                  onChange={(event) => setBlurredvis_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginRight: 55, marginTop: 15 }}
                  type="radio"
                  value="1"
                  name="blurr1"
                  checked={blurredvis_b === "1"}
                  onChange={(event) => setBlurredvis_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginRight: 54, marginTop: 15 }}
                  type="radio"
                  value="2"
                  name="blurr1"
                  checked={blurredvis_b === "2"}
                  onChange={(event) => setBlurredvis_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginTop: 15 }}
                  type="radio"
                  value="3"
                  name="blurr1"
                  checked={blurredvis_b === "3"}
                  onChange={(event) => setBlurredvis_b(event.target.value)}
                />
              </label>
            </div>

            <br />

            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 137 }}>
                {" "}
                Dizziness or vertigo{" "}
              </p>
              <label>
                <input
                  style={{ marginRight: 54, marginTop: 15 }}
                  type="radio"
                  value="0"
                  name="dizzvert1"
                  required
                  checked={dizziness_b === "0"}
                  onChange={(event) => setDizziness_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginRight: 55, marginTop: 15 }}
                  type="radio"
                  value="1"
                  name="dizzvert1"
                  checked={dizziness_b === "1"}
                  onChange={(event) => setDizziness_b(event.target.value)}
                />{" "}
              </label>
              <label>
                <input
                  style={{ marginRight: 54, marginTop: 15 }}
                  type="radio"
                  value="2"
                  name="dizzvert1"
                  checked={dizziness_b === "2"}
                  onChange={(event) => setDizziness_b(event.target.value)}
                />
              </label>
              <label>
                <input
                  style={{ marginTop: 15 }}
                  type="radio"
                  value="3"
                  name="dizzvert1"
                  checked={dizziness_b === "3"}
                  onChange={(event) => setDizziness_b(event.target.value)}
                />
              </label>
            </div>
          </div>
          <br />
          <br />
          <br />

          <div>
            <label>
              <h3>
                {" "}
                Now <u>after</u> the virtual reality experience please indicate
                how you are feeling.{" "}
              </h3>
            </label>
            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p
                style={{ fontWeight: "bold", marginRight: 141, marginTop: 20 }}
              >
                {" "}
                General discomfort{" "}
              </p>
              <label style={{ marginRight: 38 }}>
                None <br />
                <input
                  type="radio"
                  value="0"
                  name="gendis2"
                  required
                  checked={gendis_a === "0"}
                  onChange={(event) => setGendis_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 37 }}>
                Slight <br />
                <input
                  type="radio"
                  value="1"
                  name="gendis2"
                  checked={gendis_a === "1"}
                  onChange={(event) => setGendis_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 12 }}>
                Moderate <br />
                <input
                  type="radio"
                  value="2"
                  name="gendis2"
                  checked={gendis_a === "2"}
                  onChange={(event) => setGendis_a(event.target.value)}
                />
              </label>
              <label>
                Severe <br />
                <input
                  type="radio"
                  value="3"
                  name="gendis2"
                  checked={gendis_a === "3"}
                  onChange={(event) => setGendis_a(event.target.value)}
                />
              </label>
            </div>

            <br />
            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 221 }}> Fatigue </p>
              <label style={{ marginRight: 51, marginTop: 15 }}>
                <input
                  type="radio"
                  value="0"
                  name="fatigue2"
                  required
                  checked={fatigue_a === "0"}
                  onChange={(event) => setFatigue_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 51, marginTop: 15 }}>
                <input
                  type="radio"
                  value="1"
                  name="fatigue2"
                  checked={fatigue_a === "1"}
                  onChange={(event) => setFatigue_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 52, marginTop: 15 }}>
                <input
                  type="radio"
                  value="2"
                  name="fatigue2"
                  checked={fatigue_a === "2"}
                  onChange={(event) => setFatigue_a(event.target.value)}
                />
              </label>
              <label style={{ marginTop: 15 }}>
                <input
                  type="radio"
                  value="3"
                  name="fatigue2"
                  checked={fatigue_a === "3"}
                  onChange={(event) => setFatigue_a(event.target.value)}
                />
              </label>
            </div>

            <br />
            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 205 }}> Headache </p>
              <label style={{ marginRight: 51, marginTop: 15 }}>
                <input
                  type="radio"
                  value="0"
                  name="headache2"
                  required
                  checked={headache_a === "0"}
                  onChange={(event) => setHeadache_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 51, marginTop: 15 }}>
                <input
                  type="radio"
                  value="1"
                  name="headache2"
                  checked={headache_a === "1"}
                  onChange={(event) => setHeadache_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 52, marginTop: 15 }}>
                <input
                  type="radio"
                  value="2"
                  name="headache2"
                  checked={headache_a === "2"}
                  onChange={(event) => setHeadache_a(event.target.value)}
                />
              </label>
              <label style={{ marginTop: 15 }}>
                <input
                  type="radio"
                  value="3"
                  name="headache2"
                  checked={headache_a === "3"}
                  onChange={(event) => setHeadache_a(event.target.value)}
                />
              </label>
            </div>

            <br />
            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 204 }}>
                {" "}
                Eye strain{" "}
              </p>
              <label style={{ marginRight: 51, marginTop: 15 }}>
                <input
                  type="radio"
                  value="0"
                  name="eyestrain2"
                  required
                  checked={eyestrain_a === "0"}
                  onChange={(event) => setEyestrain_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 51, marginTop: 15 }}>
                <input
                  type="radio"
                  value="1"
                  name="eyestrain2"
                  checked={eyestrain_a === "1"}
                  onChange={(event) => setEyestrain_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 52, marginTop: 15 }}>
                <input
                  type="radio"
                  value="2"
                  name="eyestrain2"
                  checked={eyestrain_a === "2"}
                  onChange={(event) => setEyestrain_a(event.target.value)}
                />
              </label>
              <label style={{ marginTop: 15 }}>
                <input
                  type="radio"
                  value="3"
                  name="eyestrain2"
                  checked={eyestrain_a === "3"}
                  onChange={(event) => setEyestrain_a(event.target.value)}
                />
              </label>
            </div>

            <br />
            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 30 }}>
                {" "}
                Difficulty focusing or concentrating{" "}
              </p>
              <label style={{ marginRight: 51, marginTop: 15 }}>
                <input
                  type="radio"
                  value="0"
                  name="difffoc2"
                  required
                  checked={diffoffocus_a === "0"}
                  onChange={(event) => setDiffoffocus_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 51, marginTop: 15 }}>
                <input
                  type="radio"
                  value="1"
                  name="difffoc2"
                  checked={diffoffocus_a === "1"}
                  onChange={(event) => setDiffoffocus_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 52, marginTop: 15 }}>
                <input
                  type="radio"
                  value="2"
                  name="difffoc2"
                  checked={diffoffocus_a === "2"}
                  onChange={(event) => setDiffoffocus_a(event.target.value)}
                />
              </label>
              <label style={{ marginTop: 15 }}>
                <input
                  type="radio"
                  value="3"
                  name="difffoc2"
                  checked={diffoffocus_a === "3"}
                  onChange={(event) => setDiffoffocus_a(event.target.value)}
                />
              </label>
            </div>

            <br />
            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 161 }}>
                {" "}
                Increased saliva{" "}
              </p>
              <label style={{ marginRight: 51, marginTop: 15 }}>
                <input
                  type="radio"
                  value="0"
                  name="saliva2"
                  required
                  checked={increasedsaliva_a === "0"}
                  onChange={(event) => setIncreasedsaliva_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 51, marginTop: 15 }}>
                <input
                  type="radio"
                  value="1"
                  name="saliva2"
                  checked={increasedsaliva_a === "1"}
                  onChange={(event) => setIncreasedsaliva_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 52, marginTop: 15 }}>
                <input
                  type="radio"
                  value="2"
                  name="saliva2"
                  checked={increasedsaliva_a === "2"}
                  onChange={(event) => setIncreasedsaliva_a(event.target.value)}
                />
              </label>
              <label style={{ marginTop: 15 }}>
                <input
                  type="radio"
                  value="3"
                  name="saliva2"
                  checked={increasedsaliva_a === "3"}
                  onChange={(event) => setIncreasedsaliva_a(event.target.value)}
                />
              </label>
            </div>

            <br />
            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 209 }}> Sweating </p>
              <label style={{ marginRight: 51, marginTop: 15 }}>
                <input
                  type="radio"
                  value="0"
                  name="sweat2"
                  required
                  checked={sweating_a === "0"}
                  onChange={(event) => setSweating_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 51, marginTop: 15 }}>
                <input
                  type="radio"
                  value="1"
                  name="sweat2"
                  checked={sweating_a === "1"}
                  onChange={(event) => setSweating_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 52, marginTop: 15 }}>
                <input
                  type="radio"
                  value="2"
                  name="sweat2"
                  checked={sweating_a === "2"}
                  onChange={(event) => setSweating_a(event.target.value)}
                />
              </label>
              <label style={{ marginTop: 15 }}>
                <input
                  type="radio"
                  value="3"
                  name="sweat2"
                  checked={sweating_a === "3"}
                  onChange={(event) => setSweating_a(event.target.value)}
                />
              </label>
            </div>

            <br />
            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 221 }}> Nausea </p>
              <label style={{ marginRight: 51, marginTop: 15 }}>
                <input
                  type="radio"
                  value="0"
                  name="nausea2"
                  required
                  checked={nausea_a === "0"}
                  onChange={(event) => setNausea_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 51, marginTop: 15 }}>
                <input
                  type="radio"
                  value="1"
                  name="nausea2"
                  checked={nausea_a === "1"}
                  onChange={(event) => setNausea_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 52, marginTop: 15 }}>
                <input
                  type="radio"
                  value="2"
                  name="nausea2"
                  checked={nausea_a === "2"}
                  onChange={(event) => setNausea_a(event.target.value)}
                />
              </label>
              <label style={{ marginTop: 15 }}>
                <input
                  type="radio"
                  value="3"
                  name="nausea2"
                  checked={nausea_a === "3"}
                  onChange={(event) => setNausea_a(event.target.value)}
                />
              </label>
            </div>

            <br />
            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 176 }}>
                {" "}
                Blurred vision{" "}
              </p>
              <label style={{ marginRight: 51, marginTop: 15 }}>
                <input
                  type="radio"
                  value="0"
                  name="blurr2"
                  required
                  checked={blurredvis_a === "0"}
                  onChange={(event) => setBlurredvis_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 51, marginTop: 15 }}>
                <input
                  type="radio"
                  value="1"
                  name="blurr2"
                  checked={blurredvis_a === "1"}
                  onChange={(event) => setBlurredvis_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 52, marginTop: 15 }}>
                <input
                  type="radio"
                  value="2"
                  name="blurr2"
                  checked={blurredvis_a === "2"}
                  onChange={(event) => setBlurredvis_a(event.target.value)}
                />
              </label>
              <label style={{ marginTop: 15 }}>
                <input
                  type="radio"
                  value="3"
                  name="blurr2"
                  checked={blurredvis_a === "3"}
                  onChange={(event) => setBlurredvis_a(event.target.value)}
                />
              </label>
            </div>

            <br />
            <div
              className="radio"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <p style={{ fontWeight: "bold", marginRight: 137 }}>
                {" "}
                Dizziness or vertigo{" "}
              </p>
              <label style={{ marginRight: 51, marginTop: 15 }}>
                <input
                  type="radio"
                  value="0"
                  name="dizzvert2"
                  required
                  checked={dizziness_a === "0"}
                  onChange={(event) => setDizziness_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 51, marginTop: 15 }}>
                <input
                  type="radio"
                  value="1"
                  name="dizzvert2"
                  checked={dizziness_a === "1"}
                  onChange={(event) => setDizziness_a(event.target.value)}
                />
              </label>
              <label style={{ marginRight: 52, marginTop: 15 }}>
                <input
                  type="radio"
                  value="2"
                  name="dizzvert2"
                  checked={dizziness_a === "2"}
                  onChange={(event) => setDizziness_a(event.target.value)}
                />
              </label>
              <label style={{ marginTop: 15 }}>
                <input
                  type="radio"
                  value="3"
                  name="dizzvert2"
                  checked={dizziness_a === "3"}
                  onChange={(event) => setDizziness_a(event.target.value)}
                />
              </label>
            </div>
          </div>
          <br />

          {/* <div dangerouslySetInnerHTML={mshtml} /> */}

          <input type="submit" value="Submit" />

          <br />
          <br />
        </form>
      </div>
    </div>
  );
};
export default Questionnaire;
