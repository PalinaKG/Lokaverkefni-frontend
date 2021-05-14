import React, { useState, useEffect} from 'react';
import styles from './Results.module.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Button, Radio} from '@material-ui/core';
import { API_SERVER } from '../settings';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { CartesianGrid, BarChart, Bar, XAxis, YAxis} from "recharts";
import Divider from '@material-ui/core/Divider';

var subID1 = []
var subID2 = []
var type = []
var res1 = 0
var res2 = 0
var res3 = 0
var res4 = 0
var res5 = 0
var res6 = 0
const data0 = []
const data1 = []
const data2 = []
var msGoldenValue = ""
var nauseaValue = ""
// var graph0 = <CircularProgress></CircularProgress>
// var graph1 = <CircularProgress></CircularProgress>
// var graph2 = <CircularProgress></CircularProgress>
var graph0 = ""
var graph1 = ""
var graph2 = ""


const useStyles = makeStyles((theme) => ({
    root: {
      width: 200,
      maxWidth: 360,
    },
  }));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

const ResultsQuest = (props) => {
    const [loaded0, setLoaded0] = useState(false);
    const [loaded1, setLoaded1] = useState(false);
    const [loaded2, setLoaded2] = useState(false);
    const classes = useStyles();

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
                subID1 = []
                subID2 = []
                res1 = 0
                res2 = 0
                res3 = 0
                res4 = 0
                res5 = 0
                res6 = 0
  
                result.forEach(element => {
                    if (element.groups == "0")
                    {
                        subID1.push(element.subjectid)
                    }
                    else {
                        subID2.push(element.subjectid)
                    }
                  });




                  fetch(API_SERVER + "/api/msgolden/?type=0", {
                    method: "GET",
                    headers: {
                      Authorization: `JWT ${localStorage.getItem("token")}`,
                      "Content-Type": "application/json",
                    },
                  })
                    .then((res) => res.json())
                    .then((result) => {
                        for (let res of result)
                        {
                            for (let sub of subID1)
                            {
                                if (res.subjectid == sub)
                                {
                                    res1 = res1 + res[msGoldenValue]
                                }
                            }
                            for (let sub of subID2)
                            {
                                if (res.subjectid == sub)
                                {
                                    res2 = res2 + res[msGoldenValue]
                                }
                            }
                        }
                        data0[0] = {group: "No concussion", res: (res1 / subID1.length)}  //Not concussion
                        data0[1] = {group: "Concussion", res: (res2 / subID2.length)}  //Concussion
                        graph0 = (
                        
                            <div style = {{width: "400px"}} >
                                <p>{msGoldenValue} BEFORE virtual reality experience: </p>
                        <BarChart width={300} height={300} data={data0} margin={{left: 50}} barSize={40} >
                            <XAxis dataKey="group" scale="point" padding={{ left: 30, right: 30 }} />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar dataKey="res" fill="#8884d8" />
                        </BarChart>
                        </div>
                        
                        )
                        setLoaded0(true)
             
                    })
                    .catch((err) => {
                        console.log("ERROR" + err)
                    });








                  fetch(API_SERVER + "/api/msgolden/?type=1", {
                    method: "GET",
                    headers: {
                      Authorization: `JWT ${localStorage.getItem("token")}`,
                      "Content-Type": "application/json",
                    },
                  })
                    .then((res) => res.json())
                    .then((result) => {
                        for (let res of result)
                        {
                            for (let sub of subID1)
                            {
                                if (res.subjectid == sub)
                                {
                                    res3 = res3 + res[msGoldenValue]
                                }
                            }
                            for (let sub of subID2)
                            {
                                if (res.subjectid == sub)
                                {
                                    res4 = res4 + res[msGoldenValue]
                                }
                            }
                        }
                        data1[0] = {group: "No concussion", res: (res3 / subID1.length)}  //Not concussion
                        data1[1] = {group: "Concussion", res: (res4 / subID2.length)}  //Concussion
                        console.log("HELLOOOO")
                        console.log(data1)
                        
                        graph1 = (
                        
                            <div style = {{width: "900px"}} >
                                <p>{msGoldenValue} AFTER virtual reality experience: </p>
                        <BarChart width={300} height={300} data={data1} margin={{left: 50}} barSize={40} >
                            <XAxis dataKey="group" scale="point" padding={{ left: 30, right: 30 }} />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar dataKey="res" fill="#8884d8" />
                        </BarChart>
                        </div>
                        
                        )
                        setLoaded1(true)
                        console.log(graph1)
             
                    })
                    .catch((err) => {
                        console.log("ERROR" + err)
                    });





                    fetch(API_SERVER + "/api/nausea/", {
                        method: "GET",
                        headers: {
                          Authorization: `JWT ${localStorage.getItem("token")}`,
                          "Content-Type": "application/json",
                        },
                      })
                        .then((res) => res.json())
                        .then((result) => {
                            for (let res of result)
                            {
                                for (let sub of subID1)
                                {
                                    if (res.subjectid == sub)
                                    {
                                        res5 = res5 + res[nauseaValue]
                                    }
                                }
                                for (let sub of subID2)
                                {
                                    if (res.subjectid == sub)
                                    {
                                        res6 = res6 + res[nauseaValue]
                                    }
                                }
                            }
                            data2[0] = {group: "No concussion", res: (res5 / subID1.length)}  //Not concussion
                            data2[1] = {group: "Concussion", res: (res6 / subID2.length)}  //Concussion
                            graph2 = (
                            <div style = {{width: "900px"}} >

                                <p> Nauseated in -{nauseaValue}- in general: </p>       
                            <BarChart width={300} height={300} data={data2} margin={{left: 50}} barSize={40} >
                                <XAxis dataKey="group" scale="point" padding={{ left: 30, right: 30 }} />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Bar dataKey="res" fill="#8884d8" />
                            </BarChart>
                            </div>
                            )
                            setLoaded2(true)
                 
                        })
                        .catch((err) => {
                            console.log("ERROR" + err)
                        });
     





            })
            .catch((err) => {
                console.log("ERROR" + err)
            });

          
        }, [props, msGoldenValue, nauseaValue]);
        

   function handleMSGolden(e)
   {
        msGoldenValue = e.target.value
        setLoaded0(false)
        setLoaded1(false)

   }

   function handleNausea(e)
   {
        nauseaValue = e.target.value
        setLoaded2(false)

   }





    return (
        <div>
            <div style={{width: 500, marginLeft: 20, height: 70}}>
                <h3> Comparison for questionnaire results:</h3>
            </div>
        <div className={styles.container}>
            
            <div className={styles.listItemContainer}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItemLink style={{ border: "2px solid lightgrey"}} href="/results/hr">
                        <ListItemText primaryTypographyProps={{ style: {fontWeight: 'bolder'} }}  primary="Heart Rate" />
                        </ListItemLink>
                        <ListItemLink style={{ borderRight: "2px solid lightgrey", borderLeft: "2px solid lightgrey"}} href="/results/emg">
                        <ListItemText primaryTypographyProps={{ style: {fontWeight: 'bolder'} }} primary="Muscle Activity" />
                        </ListItemLink>
                        <ListItemLink style={{ border: "2px solid lightgrey"}}  href="/results/quest">
                        <ListItemText primaryTypographyProps={{ style: {fontWeight: 'bolder'} }} primary="Questionnaire" />
                        </ListItemLink>
                    </List>
                </div>
                
                
                <div className={styles.container2}>
                    <InputLabel style={{ marginLeft: 0, marginRight: 10, marginTop: 45}} > Motion Sickness symptoms: </InputLabel>
                    <Select value={msGoldenValue} onChange={handleMSGolden}>
                        <MenuItem value={'fatigue'}>Fatigue</MenuItem>
                        <MenuItem value={'headache'}>Headache</MenuItem>
                        <MenuItem value={'eyestrain'}>Eyestrain</MenuItem>
                        <MenuItem value={'incrsalvation'}>Increased Saliva</MenuItem>
                        <MenuItem value={'blurredvision'}>Blurred Vision</MenuItem>
                        <MenuItem value={'diffoffocus'}>Difficulty Focusing</MenuItem>
                        <MenuItem value={'sweat'}>Sweat</MenuItem>
                        <MenuItem value={'nausea'}>Nausea</MenuItem>
                        <MenuItem value={'dizziness'}>Dizziness</MenuItem>
                        <MenuItem value={'gendiscomfort'}>General Discomfort</MenuItem>
                    </Select>
                    <div style={{marginLeft : '5%', marginBottom : '50px', display: 'flex'}}>  
                        {graph0}
                        {graph1}   
                    </div> 

                </div>
                
                <Divider orientation="vertical" flexItem />
                <div className={styles.container3}>
                    <div>
                        <InputLabel style={{ marginLeft: 40, marginRight: 0, marginTop: 45}} > Nausea by transport/entertainment: </InputLabel>
                    <Select style={{ marginLeft: 40}} value={nauseaValue} onChange={handleNausea}>
                        <MenuItem value={'trains'}>Trains</MenuItem>
                        <MenuItem value={'airplanes'}>Airplanes</MenuItem>
                        <MenuItem value={'smallboats'}>Small Boats</MenuItem>
                        <MenuItem value={'ships'}>Ships</MenuItem>
                        <MenuItem value={'swings'}>Swings in playgrounds</MenuItem>
                        <MenuItem value={'roundabout'}>Roundabouts in playgrounds</MenuItem>
                        <MenuItem value={'funfair'}>Funfair</MenuItem>
                        <MenuItem value={'busses'}>Busses</MenuItem>
                        <MenuItem value={'cars'}>Cars</MenuItem>
                    </Select>

                    </div>
                    

                    <div style={{marginLeft : '5%', marginBottom : '50px', display: 'flex'}}>  
                        {graph2}   
                    </div> 

                </div>
                
        </div>
        </div>
    )
}

            

export default ResultsQuest


