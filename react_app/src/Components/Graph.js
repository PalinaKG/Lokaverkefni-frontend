import React, { useEffect, useState, Label } from "react";
import { API_SERVER } from "../settings";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import randomColor from "randomcolor";
import { CircularProgress } from "@material-ui/core";

var subID = [];
var subID1 = [];
var subID2 = [];
var subID3 = [];
var graphData1 = [];
var graphData2 = [];
var counter = 0;
var graph1 = <CircularProgress></CircularProgress>;
var graph2 = <CircularProgress></CircularProgress>;

const Graph = (props) => {
  const [loaded, setLoaded] = useState(false);
  var counter = 0;
  var graphData = [];

  useEffect(() => {
    fetch(API_SERVER + "/api/generalinfo/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        fetch(
          API_SERVER +
            "/api/subject/?birthyear__gte=" +
            props.birthyear1 +
            "&birthyear__lte=" +
            props.birthyear2 +
            "&gender=" +
            props.gender,
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
            subID1 = [];
            subID2 = [];
            console.log(result2);
            console.log(props.group1);
            if (props.group1 == "" || props.group1 == undefined) {
              console.log(result2);
              result2.forEach((element) => {
                subID1.push(element.subjectid);
              });
            }
            if (props.group2 == "" || props.group2 == undefined) {
              result2.forEach((element) => {
                subID2.push(element.subjectid);
              });
            }

            for (var i = 0; i < result2.length; i++) {
              for (var j = 0; j < result.length; j++) {
                if (result[j].subjectid === result2[i].subjectid) {
                  if (result[j].groups === props.group1) {
                    subID1.push(result[j].subjectid);
                  } else if (result[j].groups === props.group2) {
                    subID2.push(result[j].subjectid);
                  }
                }
              }
            }
            fetchHR();
          });
      });
  }, [props]);

  const fetchHR = () => {
    graphData1 = [];
    graphData2 = [];

    console.log(subID1);
    console.log(subID2);
    fetch(API_SERVER + "/api/" + props.link, {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // graphData.push(result)
        counter = subID2.length;

        for (var i = 0; i < subID1.length; i++) {
          var subResult1 = [];
          for (var j = 0; j < result.length; j++) {
            if (result[j].subjectid === subID1[i]) {
              subResult1.push(result[j]);
            }
          }

          if (subResult1.length !== 0) {
            graphData1.push(subResult1);
          }
        }

        for (var i = 0; i < subID2.length; i++) {
          var subResult2 = [];
          for (var j = 0; j < result.length; j++) {
            if (result[j].subjectid === subID2[i]) {
              subResult2.push(result[j]);
            }
          }

          if (subResult2.length !== 0) {
            graphData2.push(subResult2);
          }
          counter--;
        }

        for (var i = 0; i < graphData1.length; i++) {
          for (var j = 0; j < graphData1[i].length; j++) {
            if (graphData1[i][j].interval == 0) {
              graphData1[i][j].interval = "pre";
            } else if (graphData1[i][j].interval == 1) {
              graphData1[i][j].interval = "25";
            } else if (graphData1[i][j].interval == 2) {
              graphData1[i][j].interval = "50";
            } else if (graphData1[i][j].interval == 3) {
              graphData1[i][j].interval = "75";
            } else if (graphData1[i][j].interval == 4) {
              graphData1[i][j].interval = "post";
            }
          }
        }

        for (var i = 0; i < graphData2.length; i++) {
          for (var j = 0; j < graphData2[i].length; j++) {
            if (graphData2[i][j].interval == 0) {
              graphData2[i][j].interval = "pre";
            } else if (graphData2[i][j].interval == 1) {
              graphData2[i][j].interval = "25";
            } else if (graphData2[i][j].interval == 2) {
              graphData2[i][j].interval = "50";
            } else if (graphData2[i][j].interval == 3) {
              graphData2[i][j].interval = "75";
            } else if (graphData2[i][j].interval == 4) {
              graphData2[i][j].interval = "post";
            }
          }
        }

        if (counter == 0) {
          console.log(graphData1);
          console.log(graphData2);
          // label={{ value: props.xasis, position: "outsideMiddle", dy: 13, dx: 0}}
          graph1 = (
            <LineChart width={600} height={400} data={graphData1}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={props.xasis}
                allowDuplicatedCategory={false}
                label={{
                  value: props.xasis,
                  position: "outsideMiddle",
                  dy: 13,
                  dx: 0,
                }}
              />
              <YAxis
                dataKey={props.yasis}
                domain={props.ydom}
                label={{
                  value: props.title,
                  position: "outsideMiddle",
                  angle: -90,
                  dx: -20,
                }}
              />
              <Tooltip />
              <Legend />
              {graphData1.map((s) => (
                <Line
                  stroke={randomColor()}
                  dataKey={props.yasis}
                  data={s}
                  name={"subjectid: " + s[0].subjectid}
                  key={s[0].subjectid + props.yasis}
                />
              ))}
            </LineChart>
          );
          console.log(graph1);

          graph2 = (
            <LineChart width={600} height={400} data={graphData2}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={props.xasis}
                allowDuplicatedCategory={false}
                label={{
                  value: props.xasis,
                  position: "outsideMiddle",
                  dy: 13,
                  dx: 0,
                }}
              />
              <YAxis
                dataKey={props.yasis}
                domain={props.ydom}
                label={{
                  value: props.title,
                  position: "outsideMiddle",
                  angle: -90,
                  dx: -20,
                }}
              />
              <Tooltip />
              <Legend />
              {graphData2.map((s) => (
                <Line
                  stroke={randomColor()}
                  dataKey={props.yasis}
                  data={s}
                  name={"subjectid: " + s[0].subjectid}
                  key={s[0].subjectid + props.yasis}
                />
              ))}
            </LineChart>
          );
          setLoaded(true);
        }
      })
      .catch((err) => {
        console.log("ERROR: " + err);
      });
  };

  return (
    <div style={{ marginLeft: "0px" }}>
      {!loaded && (
        <CircularProgress
          style={{ marginLeft: "35%", marginTop: "150px" }}
        ></CircularProgress>
      )}
      {loaded && graph1}
      {loaded && graph2}
    </div>
  );
};
export default Graph;
