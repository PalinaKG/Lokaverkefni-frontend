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

var chart = <CircularProgress></CircularProgress>;
var MSIndex,
  genDiscomfort,
  dizziness,
  stomachAwareness,
  head,
  fatigue,
  physiological,
  neurological;

var maxMS = 0.0;
var maxGenDiscomfort = 0.0;
var maxDizziness = 0.0;
var maxStomachAwareness = 0.0;
var maxHead = 0.0;
var maxFatigue = 0.0;
var maxPhysiological = 0.0;
var maxNeurological = 0.0;
// var maxMSIndex = 0.0;
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
const data = [
  {
    subject: "General Discomfort",

    fullMark: 3,
  },
  {
    subject: "Dizziness and Vertigo",
    fullMark: 3,
  },
  {
    subject: "Stomach-related Index",
    fullMark: 3,
  },
  {
    subject: "Head Index",
    fullMark: 3,
  },
  {
    subject: "Fatigue Index",
    fullMark: 3,
  },
  //   {
  //     subject: "Physiological/Vegetative Index",
  //     fullMark: 3,
  //   },
  //   {
  //     subject: "Neurological/Muscle Strain Index",
  //     fullMark: 3,
  //   },
  {
    subject: "Motion Sickness Index",
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
  { id: "", name: "None" },
];
var intervals = ["", "Pre", "Post"];

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

var tempSubID = [];

const DropDownRadar = (props) => {
  const [allGroups, setAllGroups] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedBirthyear, setSelectedBirthyear] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedInterval, setSelectedInterval] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const [subID, setSubID] = useState([]);
  const [MSInterval, setMSInterval] = useState("");
  const [Data, setData] = useState(data);
  const classes = useStyles();

  useEffect(() => {
    setLoaded1(false);
    setLoaded2(false);
    setLoaded(false);
    if (selectedBirthyear.length != 0) {
      for (var i = 0; i < selectedBirthyear.length; i++) {
        var start = selectedBirthyear[i];
        var end = start + 9;
        tempSubID = [];
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
            result2.map((r) => tempSubID.push(r));
          });
      }
      setSubID(tempSubID);
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
          //   props.subID.push(subID);
        });
    }
  }, [selectedBirthyear, selectedGender, selectedGroups]);

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
        var grID = [];
        {
          result.map((s) => gr.push(s));
          result.map((s) => grID.push(s.groupsid));
        }
        setAllGroups(gr);
        setGroups(grID);
      });
  }, [selectedGroups]);

  const handleChangeInterval = (event) => {
    // props.interval[0] = event.target.value;
    setSelectedInterval(event.target.value);
  };

  const handleChangeGroups = (event) => {
    // props.group[0] = event.target.value;
    setSelectedGroups(event.target.value);
  };

  const handleChangeBirthyear = (event) => {
    // props.birthyear[0] = event.target.value;
    setSelectedBirthyear(event.target.value);
  };

  const handleChangeGender = (event) => {
    // console.log(props);
    // props.gender[0] = event.target.value;
    setSelectedGender(event.target.value);
  };

  useEffect(() => {
    setLoaded(false);
    if (selectedInterval == "Pre") {
      setMSInterval("0");
    } else if (selectedInterval == "Post") {
      setMSInterval("1");
    }
  }, [selectedInterval]);

  useEffect(() => {
    setLoaded1(false);
    setLoaded2(false);
    setLoaded(false);
    // for (let j = 0; j < groups.length; j++) {
    //   console.log(groups[j]);
    fetch(API_SERVER + "/api/msgolden/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        genDiscomfort = 0.0;
        maxGenDiscomfort = 0.0;
        dizziness = 0.0;
        maxDizziness = 0.0;
        stomachAwareness = 0.0;
        maxStomachAwareness = 0.0;
        head = 0.0;
        maxHead = 0.0;
        fatigue = 0.0;
        maxFatigue = 0.0;
        physiological = 0.0;
        maxPhysiological = 0.0;
        neurological = 0.0;
        maxNeurological = 0.0;
        MSIndex = 0.0;
        // maxMSIndex = 0.0;
        if (subID.length != 0) {
          for (var i = 0; i < result.length; i++) {
            for (var k = 0; k < subID.length; k++) {
              if (result[i].subjectid === subID[k].subjectid) {
                genDiscomfort = genDiscomfort + result[i].gendiscomfort;
                maxGenDiscomfort = maxGenDiscomfort + 3;
                dizziness = dizziness + result[i].dizziness;
                maxDizziness = maxDizziness + 3;
                stomachAwareness =
                  stomachAwareness +
                  result[i].sweat +
                  result[i].incrsalvation +
                  result[i].nausea;
                maxStomachAwareness = maxStomachAwareness + 9;
                head = head + result[i].headache + result[i].blurredvision;
                maxHead = maxHead + 6;
                fatigue =
                  fatigue +
                  result[i].fatigue +
                  result[i].eyestrain +
                  result[i].diffoffocus;
                maxFatigue = maxFatigue + 9;
              }
            }
            if (i == result.length - 1) {
              setLoaded1(true);
            }
          }
        } else {
          setLoaded(false);
        }
        let tempData = Data;
        var diz = dizziness / maxDizziness;
        var discom = genDiscomfort / maxGenDiscomfort;
        var stom = stomachAwareness / maxStomachAwareness;
        var h = head / maxHead;
        var fat = fatigue / maxFatigue;

        // tempData[0]["A"] = discom;
        // tempData[1]["A"] = diz;
        // tempData[2]["A"] = stom;
        // tempData[3]["A"] = h;
        // tempData[4]["A"] = fat;
        MSIndex = 0.2 * discom + 0.2 * diz + 0.2 * fat + 0.2 * h;
        tempData[5]["A"] = MSIndex;
        setData(tempData);
        // console.log(tempData);
        props.data[0]["fullMark"] = maxGenDiscomfort;
        props.data[1]["fullMark"] = maxDizziness;
        props.data[2]["fullMark"] = maxStomachAwareness;
        props.data[3]["fullMark"] = maxHead;
        props.data[4]["fullMark"] = maxFatigue;
        props.data[5]["fullMark"] = 1;
        if (props.dataSet == 1) {
          props.data[0]["A"] = discom;
          props.data[1]["A"] = diz;
          props.data[2]["A"] = stom;
          props.data[3]["A"] = h;
          props.data[4]["A"] = fat;
          props.data[5]["A"] = MSIndex;
        } else if (props.dataSet == 2) {
          props.data[0]["B"] = discom;
          props.data[1]["B"] = diz;
          props.data[2]["B"] = stom;
          props.data[3]["B"] = h;
          props.data[4]["B"] = fat;
          props.data[5]["B"] = MSIndex;
        } else if (props.dataSet == 3) {
          props.data[0]["C"] = discom;
          props.data[1]["C"] = diz;
          props.data[2]["C"] = stom;
          props.data[3]["C"] = h;
          props.data[4]["C"] = fat;
          props.data[5]["C"] = MSIndex;
        }
        // else if (props.dataSet == 4) {
        //   props.data[0]["D"] = discom;
        //   props.data[1]["D"] = diz;
        //   props.data[2]["D"] = stom;
        //   props.data[3]["D"] = h;
        //   props.data[4]["D"] = fat;
        //   props.data[5]["D"] = MSIndex;
        // } else if (props.dataSet == 5) {
        //   props.data[0]["E"] = discom;
        //   props.data[1]["E"] = diz;
        //   props.data[2]["E"] = stom;
        //   props.data[3]["E"] = h;
        //   props.data[4]["E"] = fat;
        //   props.data[5]["E"] = MSIndex;
        // }

        // props.dataLoaded = true;
        // props.dataLoaded.assign(false);
      });
    // }
  }, [subID, MSInterval]);

  return (
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
  );
};

export default DropDownRadar;
