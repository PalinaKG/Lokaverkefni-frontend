import React, { useEffect, useState} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { API_SERVER } from '../settings';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid} from "recharts";
import randomColor from 'randomcolor'
import { CircularProgress } from '@material-ui/core';

var subID = []
var subject = []
var counter = 0
var graph = <CircularProgress></CircularProgress>

const Graph = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [subIDLoaded, setSubIDLoaded] = useState(false)
      useEffect(() => {
        subID = []
        subject = []
        counter = 0
        fetch(API_SERVER + "/api/subject/" + props.link, {
            method: "GET",
            headers: {
              Authorization: `JWT ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((result) => {
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
          subID.forEach(subjectID => {
            fetch(API_SERVER + "/api/" + props.type + "/?subjectid=" + subjectID, {
              method: "GET",
              headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((result) => {
                  subject.push(result)
                  counter--
                  if (counter==0)
                  { 
                    
                    graph = (<LineChart width={800} height={400} data={subject}
                    margin={{ top: 50, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={props.xasis} allowDuplicatedCategory={false}/>
                    <YAxis  dataKey={props.yasis}  domain={props.xdom}/>
                    <Tooltip />
                    <Legend />
                    {subject.map((s) => (
                    <Line stroke={randomColor()} dataKey={props.yasis} data={s} name={"subjectid: " + s[0].subjectid} key={s[0].subjectid}  />
                      ))}
                    {/* <Line type="monotone" dataKey="bpm" stroke="#8884d8" /> */}
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
              {loaded && graph}
            </div>
          );
}
export default Graph