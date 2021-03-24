import React, { useEffect, useState} from 'react'
import { API_SERVER } from '../settings';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid} from "recharts";
import randomColor from 'randomcolor'
import { CircularProgress } from '@material-ui/core';

var subID = []
var graphData = []
var counter = 0
var graph = <CircularProgress></CircularProgress>
var i = 0

const QGraph = (props) => {
    const [loaded, setLoaded] = useState(false);
    var counter = 0
    var graphData = []
    var i = 0
      useEffect(() => {
        subID = []
        
        
        fetch(API_SERVER + "/api/subject/?birthyear__gte=" + props.birthyear1 + "&birthyear__lte=" + props.birthyear2 + "&gender=" + props.gender, {
            method: "GET",
            headers: {
              Authorization: `JWT ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((result) => {
                subID = []
                result.forEach(element => {
                  subID.push(element.subjectid)
                });
                counter=subID.length
                fetchHR()
            })
            .catch((err) => {
                console.log("ERROR" + err)
            });
        }, [props]);



        const fetchHR = () => {
          graphData = []
          
          subID.forEach(subjectID => {
            fetch(API_SERVER + "/api/" + props.link + subjectID, {
              method: "GET",
              headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((result) => {
                  graphData.push(result)
                  console.log(graphData)
                  counter--
                  if (counter==0)
                  { 
                    
                    graph = (<LineChart width={800} height={400} data={graphData}>
                      <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={props.xasis} allowDuplicatedCategory={false}/>
                    <YAxis  dataKey={props.yasis}  domain={props.ydom}/>
                    <Tooltip />
                    <Legend />
                    {graphData.map((s) => (
                        // console.log("HELLO1", s) +
                        // console.log("HELLO2", props.yasis[3]) +
                    <Line stroke={randomColor()} dataKey={props.yasis} data={s} name={"subjectid: " + s[0].subjectid} key={s[0].subjectid + props.yasis[3]}  /> 
                
                      ))}
                  </LineChart>)
                  setLoaded(true)
                  }  
              })
              .catch((err) => {
                  console.log("ERROR: " + err)
              });
          })
          
        }

        return (
            <div>
              {!loaded && <CircularProgress style={{marginLeft : "50%"}}></CircularProgress>}
              {loaded && console.log(graph)}
              {loaded && graph}
            </div>
          );
}
export default QGraph