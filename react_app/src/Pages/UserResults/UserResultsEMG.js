import React, { useState, useEffect } from "react";
import { API_SERVER } from "../../settings";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { CartesianGrid, BarChart, Bar, XAxis, YAxis } from "recharts";
import styles from "./Results.module.css";
import ResultsMenu from "../../Components/ResultsMenu";
import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Barchart from "../../Components/Barchart";
import { authLogin } from "../../Store/authActions";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const ResultsEMG = (props) => {
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
  };

  const handleGroups2 = (event) => {
    setLoaded(false);
    var str = event.target.value;
    var id = str.substr(0, 1);
    var name = str.substr(1);
    setGroups2Name(name);
    setGroups2ID(id);
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
          <h2> Comparison for muscle activity results:</h2>
        </div>
        <div>
          <p>Select two groups to compare</p>
          <Select
            style={{ width: 100, marginLeft: 92, marginBottom: 30 }}
            required
            value={groups1}
            onChange={(event) => handleGroups1(event)}
          >
            <MenuItem></MenuItem>
            {allGroups.map((g) => (
              <MenuItem value={g.groupsid + g.name}>
                {g.name + "(" + g.groupsid + ")"}
              </MenuItem>
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
        {loaded && (
          <Paper
            style={{ width: 850, marginLeft: "auto", marginRight: "auto" }}
          >
            <Barchart
              dataType="area"
              group1Name={groups1Name}
              group2Name={" " + groups2Name}
              link="emg/"
              group1={parseInt(groups1ID)}
              group2={parseInt(groups2ID)}
              text="BPM: Beats per minute"
              header="muscle activity"
            />
          </Paper>
        )}
      </div>
    </div>
  );
};

export default ResultsEMG;
