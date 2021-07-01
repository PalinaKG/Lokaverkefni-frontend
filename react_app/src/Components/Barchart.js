import React, { useState, useEffect } from "react";
import styles from "../Pages/UserResults/Results.module.css";
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import InputLabel from '@material-ui/core/InputLabel';
// import { Button, Radio} from '@material-ui/core';
import { API_SERVER } from "../settings";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ResultsMenu from "./ResultsMenu";
import { CartesianGrid, BarChart, Bar, XAxis, YAxis } from "recharts";

var subID1 = [];
var subID2 = [];
var resPreNoCon = 0;
var resPreCon = 0;
var resPostNoCon = 0;
var resPostCon = 0;

const dataPre = [];
const data25 = [];
const data50 = [];
const data75 = [];
const dataPost = [];

// var graph0 = <CircularProgress></CircularProgress>
// var graph1 = <CircularProgress></CircularProgress>
// var graph2 = <CircularProgress></CircularProgress>
var graphPre = "";
var graph25 = "";
var graph50 = "";
var graph75 = "";
var graphPost = "";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    maxWidth: 360,
  },
}));

const Barchart = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [loaded1, setLoaded1] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setLoaded1(true);
    fetch(API_SERVER + "/api/generalinfo/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        result.forEach((element) => {
          if (element.groups === props.group1) {
            subID1.push(element.subjectid);
          }
          if (element.groups === props.group2) {
            subID2.push(element.subjectid);
          }
        });
      });
    subID1 = [];
    subID2 = [];
    resPreNoCon = 0;
    resPreCon = 0;
    resPostNoCon = 0;
    resPostCon = 0;

    fetch(API_SERVER + "/api/" + props.link, {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        var subLength1 = 0;
        var subLength2 = 0;
        for (let res of result) {
          if (res.groups == props.group1) {
            if (res.interval == 0) {
              resPreNoCon = resPreNoCon + Number(res[props.dataType]);
              subLength1 = subLength1 + 1;
            } else if (res.interval == 4) {
              resPostNoCon = resPostNoCon + Number(res[props.dataType]);
            }
          } else if (res.groups == props.group2) {
            if (res.interval == 0) {
              resPreCon = resPreCon + Number(res[props.dataType]);
              subLength2 = subLength2 + 1;
            } else if (res.interval == 4) {
              resPostCon = resPostCon + Number(res[props.dataType]);
            }
          }
        }

        dataPre[0] = {
          group: props.group1Name,
          res: resPreNoCon / subID1.length,
        }; //Not concussion
        dataPre[1] = {
          group: props.group2Name,
          res: resPreCon / subID2.length,
        }; //Concussion
        dataPost[0] = {
          group: props.group1Name,
          res: resPostNoCon / subID1.length,
        }; //Not concussion
        dataPost[1] = {
          group: props.group2Name,
          res: resPostCon / subID2.length,
        }; //Concussion
        graphPre = (
          <div style={{ width: "400px" }}>
            <p>
              Average {props.header} BEFORE the virtual reality experience:{" "}
            </p>
            <BarChart
              width={300}
              height={300}
              data={dataPre}
              margin={{ left: 50 }}
              barSize={40}
            >
              <XAxis
                dataKey="group"
                scale="point"
                padding={{ left: 30, right: 30 }}
              />
              <YAxis
                label={{
                  value: props.dataType,
                  position: "outsideMiddle",
                  angle: 0,
                  dx: -20,
                }}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="res" fill="#8884d8" />
            </BarChart>
            <h5 styles={{ textAlign: "center" }}> {props.text}</h5>
          </div>
        );
        graphPost = (
          <div style={{ width: "400px" }}>
            <p>Average {props.header} AFTER the virtual reality experience:</p>
            <BarChart
              width={300}
              height={300}
              data={dataPost}
              margin={{ left: 50 }}
              barSize={40}
            >
              <XAxis
                dataKey="group"
                scale="point"
                padding={{ left: 30, right: 30 }}
              />
              <YAxis
                label={{
                  value: props.dataType,
                  position: "outsideMiddle",
                  angle: 0,
                  dx: -20,
                }}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="res" fill="#8884d8" />
            </BarChart>
          </div>
        );
        setLoaded(true);
      })
      .catch((err) => {
        console.log("ERROR" + err);
      });
  }, [props]);

  return (
    <div>
      <div style={{ marginLeft: "5%", marginBottom: "50px", display: "flex" }}>
        {loaded && graphPre}
        {loaded && graphPost}
        {!loaded && loaded1 && (
          <CircularProgress style={{ marginLeft: "50%" }}></CircularProgress>
        )}
      </div>
    </div>
  );
};

export default Barchart;
