import React, { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";
import "./styles.css";
import { Button, CircularProgress } from "@material-ui/core";
import { API_SERVER } from "../settings";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import CustomTooltipContent from "./CustomTooltip";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

var MSValue;
var bpm;
var area;
var groups = [];

var chart = <CircularProgress></CircularProgress>;

var maxheartRate = 0;
var maxEMG = 0;
var maxMS = 0;

fetch(API_SERVER + "/api/hr/max/", {
  method: "GET",
  headers: {
    Authorization: `JWT ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((result) => {
    maxheartRate = result.data.bpm__max;
  });

fetch(API_SERVER + "/api/emg/max/", {
  method: "GET",
  headers: {
    Authorization: `JWT ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((result) => {
    maxEMG = result.data.area__max;
  });

const data = [
  {
    subject: "Heart rate",
  },
  {
    subject: "Muscle Activity",
  },
  {
    subject: "MS Score",
    A: 0.5,
    B: 0.3,
    fullMark: 3,
  },
];
var birthyears = [];
for (var i = 2010; i >= 1900; i = i - 10) {
  birthyears.push(i);
}
var genders = [
  { id: "0", name: "Female" },
  { id: "1", name: "Male" },
];
var intervals = ["Pre", "Post"];

export default function AllResultsChart() {
  const [allGroups, setAllGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedBirthyear, setSelectedBirthyear] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const [loaded3, setLoaded3] = useState(false);
  const [loaded4, setLoaded4] = useState(false);
  const [subID, setSubID] = useState([]);
  const [MSInterval, setMSInterval] = useState("");
  const [HRInterval, setHRInterval] = useState("");
  const [EMGInterval, setEMGInterval] = useState("");
  const [Data, setData] = useState(data);
  const classes = useStyles();

  const handleChangeInterval = (event) => {
    setLoaded(false);
    setLoaded4(false);
    setSelectedInterval(event.target.value);
  };

  const handleChangeGroups = (event) => {
    groups = event.target.value;
    setLoaded(false);
    setLoaded4(false);
    setSelectedGroups(event.target.value);
  };

  const handleChangeBirthyear = (event) => {
    setLoaded(false);
    setLoaded4(false);
    setSelectedBirthyear(event.target.value);
  };

  const handleChangeGender = (event) => {
    setLoaded(false);
    setLoaded4(false);
    setSelectedGender(event.target.value);
  };

  useEffect(() => {
    var tempData = Data;
    tempData[0].fullMark = maxheartRate;
    tempData[1].fullMark = maxEMG;
    setData(tempData);
  }, [maxEMG, maxheartRate, maxMS]);

  useEffect(() => {
    setLoaded(false);
    setLoaded1(false);
    setLoaded2(false);
    setLoaded3(false);
    var tempSubID = [];
    var counter = 0;
    if (selectedBirthyear.length != 0) {
      for (var i = 0; i < selectedBirthyear.length; i++) {
        var start = selectedBirthyear[i];
        var end = start + 9;

        fetch(
          API_SERVER +
            "/api/subject/?birthyear__gte=" +
            start +
            "&birthyear__lte=" +
            end +
            "&gender=" +
            selectedGender,
          {
            method: "GET",
            headers: {
              Authorization: `JWT ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((result2) => {
            console.log(result2);
            setSubID(result2);
          });
      }
    } else {
      fetch(API_SERVER + "/api/subject/?gender=" + selectedGender, {
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result2) => {
          setSubID(result2);
          counter = 0;
        });
    }
  }, [selectedBirthyear, selectedGender, selectedGroups]);

  useEffect(() => {
    setLoaded(false);
    if (selectedInterval == "Pre") {
      setMSInterval("0");
      setHRInterval("0");
      setEMGInterval("1");
    } else if (selectedInterval == "Post") {
      setMSInterval("1");
      setHRInterval("4");
      setEMGInterval("5");
    }
  }, [selectedInterval]);

  useEffect(() => {
    setLoaded1(false);
    setLoaded2(false);
    setLoaded3(false);
    setLoaded(false);
    for (let h = 0; h < selectedGroups.length; h++) {
      fetch(API_SERVER + "/api/msgolden/", {
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          var tempSub = [];
          maxMS = 0.0;
          MSValue = 0.0;
          if (subID.length != 0) {
            for (var i = 0; i < result.length; i++) {
              for (var k = 0; k < subID.length; k++) {
                if (result[i].subjectid === subID[k].subjectid) {
                  maxMS = maxMS + 3;
                  MSValue = MSValue + result[i].nausea + result[i].sweat;
                  tempSub.push(result[i]);
                }
              }
              if (i == result.length - 1) {
                setLoaded1(true);
              }
            }
          } else {
            setLoaded1(false);
          }
          MSValue = MSValue / maxMS;
          let tempData = Data;
          tempData[2][selectedGroups[h]] = MSValue;
          setData(tempData);
        });
      fetch(
        API_SERVER +
          "/api/hr/?interval=" +
          HRInterval +
          "&groups=" +
          selectedGroups[h],
        {
          method: "GET",
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          bpm = 0;
          var counter = 0.0;
          if (subID.length != 0) {
            for (var k = 0; k < subID.length; k++) {
              for (var i = 0; i < result.length; i++) {
                if (result[i].subjectid === subID[k].subjectid) {
                  counter = counter + 1;
                  bpm = bpm + parseInt(result[i].bpm);
                }
              }
              if (k == subID.length - 1) {
                setLoaded2(true);
              }
            }
          } else {
            setLoaded2(false);
          }
          bpm = bpm / counter;
          bpm = bpm / maxheartRate;
          let tempData = Data;
          console.log(selectedGroups);
          console.log(h);
          console.log(selectedGroups[h]);
          tempData[0][selectedGroups[h]] = bpm;
          setData(tempData);
        });

      fetch(
        API_SERVER +
          "/api/emg/?interval" +
          EMGInterval +
          "&groups=" +
          selectedGroups[h],
        {
          method: "GET",
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          area = 0.0;
          var counter = 0.0;
          if (subID.length != 0) {
            for (var k = 0; k < subID.length; k++) {
              for (var i = 0; i < result.length; i++) {
                if (result[i].subjectid === subID[k].subjectid) {
                  area = area + parseFloat(result[i].area);
                  counter = counter + 1;
                }
              }
              if (k == subID.length - 1) {
                setLoaded3(true);
              }
            }
          } else {
            setLoaded3(false);
          }
          area = area / counter;
          area = area / maxEMG;
          let tempData = Data;
          tempData[1][selectedGroups[h]] = area;
          setData(tempData);
        });
    }
  }, [subID, MSInterval]);

  useEffect(() => {
    setLoaded(false);
    console.log(selectedGroups);
    console.log(groups);
    chart = (
      <RadarChart
        cx={300}
        cy={250}
        outerRadius={150}
        width={500}
        height={500}
        data={Data}
      >
        {/* <Tooltip /> */}

        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Tooltip content={<CustomTooltipContent />} />
        <Radar
          name="DATA1"
          dataKey={2}
          stroke={"#8884d8"}
          fill={"#8884d8"}
          fillOpacity={0.6}
          dot={false}
        />
        <Radar
          name="DATA2"
          dataKey={1}
          stroke={"#82ca9d"}
          fill={"#82ca9d"}
          fillOpacity={0.6}
          dot={false}
        />

        {/* {selectedGroups.map((b) => (
          <Radar
            name={"DATA" + b}
            dataKey={b}
            stroke={"#8874d8" + b * 100}
            fill={"#8874d8" + b * 100}
            fillOpacity={0.6}
            dot={false}
          />
        ))} */}
      </RadarChart>
    );
    setLoaded(true);
    console.log(chart);
  }, [Data, selectedGroups]);

  const handleButton = () => {
    setLoaded4(true);
  };

  useEffect(() => {
    if (loaded2 && loaded3 && loaded4) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  });

  useEffect(() => {
    fetch(API_SERVER + "/api/groups/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        var gr = [];
        {
          result.map((s) => gr.push(s));
        }
        setAllGroups(gr);
      });
  }, [selectedGroups]);

  return (
    <div style={{ width: 600 }}>
      <div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Groups</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={selectedGroups}
              onChange={handleChangeGroups}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {allGroups.map((g) => (
                <MenuItem key={g.groupsid} value={g.groupsid}>
                  <Checkbox checked={selectedGroups.indexOf(g.groupsid) > -1} />
                  <ListItemText primary={g.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Birthyear</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={selectedBirthyear}
              onChange={handleChangeBirthyear}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {birthyears.map((b) => (
                <MenuItem key={b} value={b}>
                  <Checkbox checked={selectedBirthyear.indexOf(b) > -1} />
                  <ListItemText primary={b + "-" + (b + 9)} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Gender</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              value={selectedGender}
              onChange={handleChangeGender}
              input={<Input />}
              renderValue={(selected) => selected}
              MenuProps={MenuProps}
            >
              {genders.map((ge) => (
                <MenuItem key={ge.id} value={ge.id}>
                  <Checkbox checked={selectedGender.indexOf(ge.id) > -1} />
                  <ListItemText primary={ge.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Interval</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              value={selectedInterval}
              onChange={handleChangeInterval}
              input={<Input />}
              renderValue={(selected) => selected}
              MenuProps={MenuProps}
            >
              {intervals.map((inter) => (
                <MenuItem key={inter} value={inter}>
                  <Checkbox checked={selectedInterval.indexOf(inter) > -1} />
                  <ListItemText primary={inter} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button style={{ marginLeft: 20 }} onClick={handleButton}>
          Get results
        </Button>
      </div>
      {loaded && chart}
      {console.log(chart)}
      {console.log(loaded1)}
      {console.log(loaded2)}
      {console.log(loaded3)}
      {console.log(loaded4)}
      {console.log(loaded)}
      {!loaded && loaded4 && (
        <CircularProgress style={{ marginTop: 150 }}></CircularProgress>
      )}
    </div>
  );
}
