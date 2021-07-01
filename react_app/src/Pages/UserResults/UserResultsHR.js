import React, { useState, useEffect } from "react";
import { API_SERVER } from "../../settings";
import Paper from "@material-ui/core/Paper";
import Barchart from "../../Components/Barchart";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import ResultsMenu from "../../Components/ResultsMenu";
import styles from "./Results.module.css";
import { Button } from "@material-ui/core";

const ResultsHRCON = (props) => {
  const [allGroups, setAllGroups] = useState([]);
  const [groups1, setGroups1] = useState();
  const [groups2, setGroups2] = useState();
  const [groups1ID, setGroups1ID] = useState();
  const [groups2ID, setGroups2ID] = useState();
  const [groups1Name, setGroups1Name] = useState("");
  const [groups2Name, setGroups2Name] = useState("");
  const [loaded, setLoaded] = useState(false);
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

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleGroups1 = (event) => {
    setLoaded(false);

    var str = event.target.value;
    var id = str.substr(0, 1);
    var name = str.substr(1);
    setGroups1Name(name);
    setGroups1ID(id);
    console.log(id);
    console.log(name);
    // setLoaded1(true);
  };

  const handleGroups2 = (event) => {
    setLoaded(false);
    console.log("HELLLOOO2");
    console.log(groups2);
    // setLoaded2(false);
    var str = event.target.value;
    var id = str.substr(0, 1);
    var name = str.substr(1);
    setGroups2Name(name);
    setGroups2ID(id);
    console.log(id);
    console.log(name);
    // setLoaded2(true);
  };

  const handleButton = () => {
    setLoaded(true);
  };

  return (
    <div className={styles.container}>
      <div>
        <ResultsMenu type="user" />
      </div>
      <div style={{ marginRight: 200 }}>
        <div>
          <h2> Comparison for heartrate results:</h2>
        </div>
        <div>
          {/* <Paper style={{ width: 600, height: 150 }}> */}
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
            <MenuItem></MenuItem>
            {allGroups.map((g) => (
              <MenuItem value={g.groupsid + g.name}>
                {g.name + "(" + g.groupsid + ")"}
              </MenuItem>
            ))}
          </Select>
          <Button style={{ marginLeft: 20 }} onClick={handleButton}>
            Get results
          </Button>
          {/* </Paper> */}
        </div>
        {loaded && (
          <Paper
            style={{ width: 850, marginLeft: "auto", marginRight: "auto" }}
          >
            <Barchart
              dataType="bpm"
              group1Name={groups1Name}
              group2Name={" " + groups2Name}
              link="hr/"
              group1={parseInt(groups1ID)}
              group2={parseInt(groups2ID)}
              text="BPM: Beats per minute"
              header="heart rate"
            />
          </Paper>
        )}
      </div>
    </div>
  );
};

export default ResultsHRCON;
