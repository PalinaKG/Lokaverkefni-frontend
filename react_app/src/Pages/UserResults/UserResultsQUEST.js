import React, { useState, useEffect } from "react";
import styles from "./Results.module.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { Button, Radio } from "@material-ui/core";
import { API_SERVER } from "../../settings";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ResultsMenu from "../../Components/ResultsMenu";
import { CartesianGrid, BarChart, Bar, XAxis, YAxis } from "recharts";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

var subID1 = [];
var subID2 = [];
var type = [];
var res1 = 0;
var res2 = 0;
var res3 = 0;
var res4 = 0;
var res5 = 0;
var res6 = 0;
const data0 = [];
const data1 = [];
const data2 = [];
var msGoldenValue = "";
var nauseaValue = "";
var graph0 = "";
var graph1 = "";
var graph2 = "";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    maxWidth: 360,
  },
}));

const ResultsQuest = (props) => {
  const [loaded0, setLoaded0] = useState(false);
  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const [loaded3, setLoaded3] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const classes = useStyles();

  const [allGroups, setAllGroups] = useState([]);
  const [groups1, setGroups1] = useState();
  const [groups2, setGroups2] = useState();
  const [groups1ID, setGroups1ID] = useState();
  const [groups2ID, setGroups2ID] = useState();
  const [groups1Name, setGroups1Name] = useState("");
  const [groups2Name, setGroups2Name] = useState("");

  // const [loaded, setLoaded] = useState(false)
  // const classes = useStyles();

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

  const handleGroups1 = (event) => {
    setLoaded0(false);
    setLoaded1(false);
    setLoaded2(false);
    setLoaded3(false);
    setLoaded(false);
    var str = event.target.value;
    var id = str.substr(0, 1);
    var name = str.substr(1);
    setGroups1Name(name);
    setGroups1ID(id);
  };

  const handleGroups2 = (event) => {
    setLoaded0(false);
    setLoaded1(false);
    setLoaded2(false);
    setLoaded3(false);
    setLoaded(false);
    var str = event.target.value;
    var id = str.substr(0, 1);
    var name = str.substr(1);
    setGroups2Name(name);
    setGroups2ID(id);
  };

  const handleButton = () => {
    setLoaded3(true);
  };

  useEffect(() => {
    fetchGroups();
    subID1 = [];
    subID2 = [];
    res1 = 0;
    res2 = 0;
    res3 = 0;
    res4 = 0;
    res5 = 0;
    res6 = 0;

    fetch(API_SERVER + "/api/msgolden/?type=0", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        var subLength = 0;
        for (let res of result) {
          if (res.groups == groups1ID) {
            res1 = res1 + res[msGoldenValue];
            subLength = subLength + 1;
          } else if (res.groups == groups2ID) {
            res2 = res2 + res[msGoldenValue];
            subLength = subLength + 1;
          }
        }
        data0[0] = { group: groups1Name, res: res1 / subLength };
        data0[1] = { group: groups2Name, res: res2 / subLength };
        graph0 = (
          <div style={{ width: "400px" }}>
            <p>{msGoldenValue} BEFORE virtual reality experience: </p>
            <BarChart
              width={320}
              height={300}
              data={data0}
              margin={{ left: 50 }}
              barSize={40}
            >
              <XAxis
                dataKey="group"
                scale="point"
                padding={{ left: 30, right: 30 }}
              />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="res" fill="#8884d8" />
            </BarChart>
          </div>
        );
        setLoaded0(true);
      })
      .catch((err) => {});

    fetch(API_SERVER + "/api/msgolden/?type=1", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        var subLength = 0;
        for (let res of result) {
          if (res.groups == groups1ID) {
            res3 = res3 + res[msGoldenValue];
            subLength = subLength + 1;
          } else if (res.groups == groups2ID) {
            res4 = res4 + res[msGoldenValue];
            subLength = subLength + 1;
          }
        }

        data1[0] = { group: groups1Name, res: res3 / subLength }; //Not concussion
        data1[1] = { group: groups2Name, res: res4 / subLength }; //Concussion
        graph1 = (
          <div style={{ width: "900px" }}>
            <p>{msGoldenValue} AFTER virtual reality experience: </p>
            <BarChart
              width={320}
              height={300}
              data={data1}
              margin={{ left: 50 }}
              barSize={40}
            >
              <XAxis
                dataKey="group"
                scale="point"
                padding={{ left: 30, right: 30 }}
              />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="res" fill="#8884d8" />
            </BarChart>
          </div>
        );
        setLoaded1(true);
      })
      .catch((err) => {});

    fetch(API_SERVER + "/api/nausea/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        var subLength = 0;
        for (let res of result) {
          if (res.groups == groups1ID) {
            res5 = res5 + res[nauseaValue];
            subLength = subLength + 1;
          } else if (res.groups == groups2ID) {
            res6 = res6 + res[nauseaValue];
            subLength = subLength + 1;
          }
        }

        data2[0] = { group: groups1Name, res: res5 / subLength };
        data2[1] = { group: groups2Name, res: res6 / subLength };
        graph2 = (
          <div style={{ width: "900px" }}>
            <p> Nauseated in -{nauseaValue}- in general: </p>
            <BarChart
              width={320}
              height={300}
              data={data2}
              margin={{ left: 50 }}
              barSize={40}
            >
              <XAxis
                dataKey="group"
                scale="point"
                padding={{ left: 30, right: 30 }}
              />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="res" fill="#8884d8" />
            </BarChart>
          </div>
        );
        setLoaded2(true);
      })
      .catch((err) => {});
  }, [props, msGoldenValue, nauseaValue]);

  function handleMSGolden(e) {
    msGoldenValue = e.target.value;
    setLoaded0(false);
    setLoaded1(false);
  }

  function handleNausea(e) {
    nauseaValue = e.target.value;
    setLoaded2(false);
  }

  useEffect(() => {
    if (loaded0 && loaded1 && loaded2 && loaded3) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  });

  return (
    <div className={styles.container}>
      <div>
        <ResultsMenu type="user" />
      </div>
      <div>
        <div style={{ width: 500, marginLeft: 20, height: 70 }}>
          <h3> Comparison for questionnaire results:</h3>
        </div>
        <div>
          <p>Select two groups to compare</p>
          <Select
            style={{ width: 100, marginLeft: 92, marginBottom: 30 }}
            required
            value={groups1}
            onChange={(event) => handleGroups1(event)}
          >
            <option></option>
            {allGroups.map((g) => (
              <option value={g.groupsid + g.name}>
                {g.name + "(" + g.groupsid + ")"}
              </option>
            ))}
          </Select>

          <Select
            style={{ width: 100, marginLeft: 92, marginBottom: 30 }}
            required
            value={groups2}
            onChange={(event) => handleGroups2(event)}
          >
            <option></option>
            {allGroups.map((g) => (
              <option value={g.groupsid + g.name}>
                {g.name + "(" + g.groupsid + ")"}
              </option>
            ))}
          </Select>
          <Button style={{ marginLeft: 20 }} onClick={handleButton}>
            Get results
          </Button>
        </div>
        <Paper>
          <div className={styles.graphsContainer}>
            <div className={styles.container2}>
              <InputLabel
                style={{ marginLeft: 0, marginRight: 10, marginTop: 45 }}
              >
                {" "}
                Motion Sickness symptoms:{" "}
              </InputLabel>
              <Select
                style={{ width: 200 }}
                value={msGoldenValue}
                onChange={handleMSGolden}
              >
                <MenuItem></MenuItem>
                <MenuItem value={"fatigue"}>Fatigue</MenuItem>
                <MenuItem value={"headache"}>Headache</MenuItem>
                <MenuItem value={"eyestrain"}>Eyestrain</MenuItem>
                <MenuItem value={"incrsalvation"}>Increased Saliva</MenuItem>
                <MenuItem value={"blurredvision"}>Blurred Vision</MenuItem>
                <MenuItem value={"diffoffocus"}>Difficulty Focusing</MenuItem>
                <MenuItem value={"sweat"}>Sweat</MenuItem>
                <MenuItem value={"nausea"}>Nausea</MenuItem>
                <MenuItem value={"dizziness"}>Dizziness</MenuItem>
                <MenuItem value={"gendiscomfort"}>General Discomfort</MenuItem>
              </Select>
              <div
                style={{
                  marginLeft: "5%",
                  marginBottom: "50px",
                  display: "flex",
                }}
              >
                {loaded && graph0}
                {!loaded && loaded3 && (
                  <CircularProgress
                    style={{ marginTop: 150, marginLeft: 200 }}
                  ></CircularProgress>
                )}
                {loaded && graph1}
                {!loaded && loaded3 && (
                  <CircularProgress
                    style={{ marginTop: 150, marginLeft: 200 }}
                  ></CircularProgress>
                )}
              </div>
            </div>
            <Divider orientation="vertical" flexItem />
            <div style={{ width: 300 }}>
              <div>
                <InputLabel
                  style={{ marginLeft: 40, marginRight: 0, marginTop: 45 }}
                >
                  {" "}
                  Nausea by transport/entertainment:{" "}
                </InputLabel>
                <Select
                  style={{ marginLeft: 40, width: 200 }}
                  value={nauseaValue}
                  onChange={handleNausea}
                >
                  <MenuItem></MenuItem>
                  <MenuItem value={"trains"}>Trains</MenuItem>
                  <MenuItem value={"airplanes"}>Airplanes</MenuItem>
                  <MenuItem value={"smallboats"}>Small Boats</MenuItem>
                  <MenuItem value={"ships"}>Ships</MenuItem>
                  <MenuItem value={"swings"}>Swings in playgrounds</MenuItem>
                  <MenuItem value={"roundabout"}>
                    Roundabouts in playgrounds
                  </MenuItem>
                  <MenuItem value={"funfair"}>Funfair</MenuItem>
                  <MenuItem value={"busses"}>Busses</MenuItem>
                  <MenuItem value={"cars"}>Cars</MenuItem>
                </Select>
              </div>

              <div
                style={{
                  marginLeft: "5%",
                  marginBottom: "50px",
                  display: "flex",
                }}
              >
                {loaded && graph2}
                {!loaded && loaded3 && (
                  <CircularProgress
                    style={{ marginTop: 150, marginLeft: 140 }}
                  ></CircularProgress>
                )}
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default ResultsQuest;
