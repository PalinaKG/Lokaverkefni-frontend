import React, { useEffect, useState, Label} from 'react'
import { API_SERVER } from '../settings';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid} from "recharts";
import randomColor from 'randomcolor'
import { CircularProgress } from '@material-ui/core';

var subID = []
var subID1 = []
var subID2 = []
var graphData = []
var counter = 0
var graph = <CircularProgress></CircularProgress>

const Graph = (props) => {
    const [loaded, setLoaded] = useState(false);
    var counter = 0
    var graphData = []
      useEffect(() => {
        
        subID1 = []

        fetch(API_SERVER + "/api/generalinfo/?groups=" + props.group, {
          method: "GET",
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((result) => {
              subID1 = []
              result.forEach(element => {
                subID1.push(element.subjectid)
              });


              fetch(API_SERVER + "/api/subject/?birthyear__gte=" + props.birthyear1 + "&birthyear__lte=" + props.birthyear2 + "&gender=" + props.gender, {
                method: "GET",
                headers: {
                  Authorization: `JWT ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((result) => {
                    subID2 = []
                    result.forEach(element => {
                      subID2.push(element.subjectid)
                    });
                    subID = []
                    for (var i=0; i<subID1.length; i++)
                    {
                      for (var j=0; j<subID2.length; j++)
                      {
                        if (subID1[i] === subID2[j])
                        {
                          subID.push(subID1[i])
                        }
                      }
                    }

                    fetchHR()
                })
                
                .catch((err) => {
                    console.log("ERROR" + err)
                });
            }, [props]);



              
          })
          
        
        
       



        const fetchHR = () => {
          graphData = []
          
            console.log(subID)
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
                  counter=subID.length
                  for (var j = 0; j<subID.length; j++)
                  {
                    var subResult = []
                    for (var i = 0; i<result.length; i++)
                    {
                    
                      if (result[i].subjectid == subID[j])
                      {
                        subResult.push(result[i])
                        
                      }
                      
                    
                    
                    // console.log(counter)
                    // console.log(i)
                    }
                    graphData.push(subResult)
                    counter--
                  }
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
                
        
                  if (counter == 0)
                  { 
                    console.log(graphData)
                    // label={{ value: props.xasis, position: "outsideMiddle", dy: 13, dx: 0}}
                    graph = (
                      <LineChart width={600} height={400}  data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" />
                      <XAxis  dataKey={props.xasis} allowDuplicatedCategory={false}  label={{ value: props.xasis, position: "outsideMiddle", dy: 13, dx: 0}} />
                      <YAxis  dataKey={props.yasis}  domain={props.ydom} label={{ value: props.title, position: "outsideMiddle", angle: -90, dx: -20}}/>
                      <Tooltip />
                      <Legend />
                      {graphData.map((s) => (
                      <Line stroke={randomColor()} dataKey={props.yasis} data={s} name={"subjectid: " + s[0].subjectid} key={s[0].subjectid + props.yasis} />
                      ))}
                    </LineChart>
                  
                  )
                  console.log(graph)
                  console.log(props.group)
                  console.log(props.birthyear1)
                  console.log(props.birthyear2)
                  setLoaded(true)
                  console.log("HELLLOOOOO")
                  }  
              })
              .catch((err) => {
                  console.log("ERROR: " + err)
              });
      
        }

        return (
            <div style={{marginLeft : '0px'}}>
              {!loaded && <CircularProgress   style={{marginLeft : '35%', marginTop: '150px'}} ></CircularProgress>}
              {loaded && graph}

              
            </div>
          );
}
export default Graph