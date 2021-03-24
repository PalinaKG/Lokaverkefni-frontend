import React, { useEffect, useState, Label} from 'react'
import { API_SERVER } from '../settings';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid} from "recharts";
import randomColor from 'randomcolor'
import { CircularProgress } from '@material-ui/core';

var subID = []
var graphData = []
var counter = 0
var graph = <CircularProgress></CircularProgress>

const Graph = (props) => {
    const [loaded, setLoaded] = useState(false);
    var counter = 0
    var graphData = []
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
                  
                  for (var i=0;i<graphData.length; i++)
                  {
                    for (var j=0;j<graphData[i].length;j++)
                    {
                      if(graphData[i][j].interval==0)
                      {
                        graphData[i][j].interval='pre'
                      }
                      else if(graphData[i][j].interval==1)
                      {
                        graphData[i][j].interval='25'
                      }
                      else if(graphData[i][j].interval==2)
                      {
                        graphData[i][j].interval='50'
                      }
                      else if(graphData[i][j].interval==3)
                      {
                        graphData[i][j].interval='75'
                      }
                      else if(graphData[i][j].interval==4)
                      {
                        graphData[i][j].interval='post'
                      }
                    }
                  }
                  counter--
                  if (counter==0)
                  { 
                    // label={{ value: props.xasis, position: "outsideMiddle", dy: 13, dx: 0}}
                    graph = (<LineChart width={900} height={400}  data={graphData}>
                      <CartesianGrid strokeDasharray="3 3" />
                    <XAxis  dataKey={props.xasis} allowDuplicatedCategory={false}  label={{ value: props.xasis, position: "outsideMiddle", dy: 13, dx: 0}} />
                    <YAxis  dataKey={props.yasis}  domain={props.ydom} label={{ value: props.title, position: "outsideMiddle", angle: -90, dx: -20}}/>
                    <Tooltip />
                    <Legend />
                    {graphData.map((s) => (
                    <Line stroke={randomColor()} dataKey={props.yasis} data={s} name={"subjectid: " + s[0].subjectid} key={s[0].subjectid + props.yasis} />
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
            <div style={{marginLeft : '250px'}}>
              {!loaded && <CircularProgress   style={{marginLeft : '35%', marginTop: '150px'}} ></CircularProgress>}
              {loaded && graph}
            </div>
          );
}
export default Graph