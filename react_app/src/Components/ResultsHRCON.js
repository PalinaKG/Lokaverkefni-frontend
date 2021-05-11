import React, { useState, useEffect} from 'react';
import styles from './Home.module.css';
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

var subID1 = []
var subID2 = []
var resPreNoCon = 0
var resPreCon = 0
var res25NoCon = 0
var res25Con = 0
var res50NoCon = 0
var res50Con = 0
var res75NoCon = 0
var res75Con = 0
var resPostNoCon = 0
var resPostCon = 0

const dataPre = []
const data25 = []
const data50 = []
const data75 = []
const dataPost = []

// var graph0 = <CircularProgress></CircularProgress>
// var graph1 = <CircularProgress></CircularProgress>
// var graph2 = <CircularProgress></CircularProgress>
var graphPre = ""
var graph25 = ""
var graph50 = ""
var graph75 = ""
var graphPost = ""


const useStyles = makeStyles((theme) => ({
    root: {
      width: 200,
      maxWidth: 360,
    },
  }));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

const ResultsHRCON = (props) => {
    const [loaded, setLoaded] = useState(false)
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
                resPreNoCon = 0
                resPreCon = 0
                res25NoCon = 0
                res25Con = 0
                res50NoCon = 0
                res50Con = 0
                res75NoCon = 0
                res75Con = 0
                resPostNoCon = 0
                resPostCon = 0
  
                result.forEach(element => {
                    if (element.groups == "0")
                    {
                        subID1.push(element.subjectid)
                    }
                    else {
                        subID2.push(element.subjectid)
                    }
                  });




                fetch(API_SERVER + "/api/hr/", {
                    method: "GET",
                    headers: {
                      Authorization: `JWT ${localStorage.getItem("token")}`,
                      "Content-Type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((result) => {
                        console.log(result)
                        for (let res of result)
                        {
                            for (let sub of subID1)
                            {
                                if (res.subjectid == sub)
                                {
                                    if (res.interval == 0)
                                    {
                                        resPreNoCon = resPreNoCon + Number(res['bpm'])
                                    }
                                    else if (res.interval == 1)
                                    {
                                        res25NoCon = res25NoCon + Number(res['bpm'])
                                    }
                                    else if (res.interval == 2)
                                    {
                                        res50NoCon = res50NoCon + Number(res['bpm'])
                                    }
                                    else if (res.interval == 3)
                                    {
                                        res75NoCon = res75NoCon + Number(res['bpm'])
                                    }
                                    else if (res.interval == 4)
                                    {
                                        resPostNoCon = resPostNoCon + Number(res['bpm'])
                                    }
                                    
                                }
                            }
                            for (let sub of subID2)
                            {
                                if (res.subjectid == sub)
                                {
                                    if (res.interval == 0)
                                    {
                                        resPreCon = resPreCon + Number(res['bpm'])
                                    }
                                    else if (res.interval == 1)
                                    {
                                        res25Con = res25Con + Number(res['bpm'])
                                    }
                                    else if (res.interval == 2)
                                    {
                                        res50Con = res50Con + Number(res['bpm'])
                                    }
                                    else if (res.interval == 3)
                                    {
                                        res75Con = res75Con + Number(res['bpm'])
                                    }
                                    else if (res.interval == 4)
                                    {
                                        resPostCon = resPostCon + Number(res['bpm'])
                                    }
                                }
                                
                            }
                        }
                        dataPre[0] = {group: "No concussion", res: (resPreNoCon / subID1.length)}  //Not concussion
                        dataPre[1] = {group: "Concussion", res: (resPreCon / subID2.length)}  //Concussion
                        data25[0] = {group: "No concussion", res: (res25NoCon / subID1.length)}  //Not concussion
                        data25[1] = {group: "Concussion", res: (res25Con / subID2.length)}  //Concussion
                        data50[0] = {group: "No concussion", res: (res50NoCon / subID1.length)}  //Not concussion
                        data50[1] = {group: "Concussion", res: (res50Con / subID2.length)}  //Concussion
                        data75[0] = {group: "No concussion", res: (res75NoCon / subID1.length)}  //Not concussion
                        data75[1] = {group: "Concussion", res: (res75Con / subID2.length)}  //Concussion
                        dataPost[0] = {group: "No concussion", res: (resPostNoCon / subID1.length)}  //Not concussion
                        dataPost[1] = {group: "Concussion", res: (resPostCon / subID2.length)}  //Concussion
                        graphPre = (
                            <div style = {{width: "400px"}} >
                                <p>Average heart rate BEFORE the virtual reality experience: </p>
                        <BarChart width={300} height={300} data={dataPre} margin={{left: 50}} barSize={40} >
                            <XAxis dataKey="group" scale="point" padding={{ left: 30, right: 30 }} />
                            <YAxis label={{ value: "BPM", position: "outsideMiddle", angle: 0, dx: -20}}/>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar dataKey="res" fill="#8884d8" />
                        </BarChart>
                        </div>
                        )

                        // console.log(dataPre)
                        // console.log(graphPre)
                        // graph25 = (
                        //     <div style = {{width: "400px"}} >
                        //         <p>Heartrate - 25</p>
                        // <BarChart width={300} height={300} data={data25} margin={{left: 50}} barSize={40} >
                        //     <XAxis dataKey="group" scale="point" padding={{ left: 30, right: 30 }} />
                        //     <YAxis />
                        //     <CartesianGrid strokeDasharray="3 3" />
                        //     <Bar dataKey="res" fill="#8884d8" />
                        // </BarChart>
                        // </div>
                        // )

                        // console.log(data25)
                        // console.log(graph25)

                        // graph50 = (
                        //     <div style = {{width: "400px"}} >
                        //         <p>Heartrate - 50</p>
                        // <BarChart width={300} height={300} data={data50} margin={{left: 50}} barSize={40} >
                        //     <XAxis dataKey="group" scale="point" padding={{ left: 30, right: 30 }} />
                        //     <YAxis />
                        //     <CartesianGrid strokeDasharray="3 3" />
                        //     <Bar dataKey="res" fill="#8884d8" />
                        // </BarChart>
                        // </div>
                        // )
                        // console.log(data50)
                        // console.log(graph50)


                        // graph75 = (
                        //     <div style = {{width: "400px"}} >
                        //         <p>Heartrate - 75</p>
                        // <BarChart width={300} height={300} data={data75} margin={{left: 50}} barSize={40} >
                        //     <XAxis dataKey="group" scale="point" padding={{ left: 30, right: 30 }} />
                        //     <YAxis />
                        //     <CartesianGrid strokeDasharray="3 3" />
                        //     <Bar dataKey="res" fill="#8884d8" />
                        // </BarChart>
                        // </div>
                        // )
                        // console.log(data75)
                        // console.log(graph75)


                        graphPost = (
                            <div style = {{width: "400px"}} >
                                <p>Average heart rate AFTER the virtual reality experience:</p>
                        <BarChart width={300} height={300} data={dataPost} margin={{left: 50}} barSize={40} >
                            <XAxis dataKey="group" scale="point" padding={{ left: 30, right: 30 }} />
                            <YAxis label={{ value: "BPM", position: "outsideMiddle", angle: 0, dx: -20}}/>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar dataKey="res" fill="#8884d8" />
                        </BarChart>
                        </div>
                        )
                        console.log(dataPost)
                        console.log(graphPre)
                        console.log(graphPost)
                        setLoaded(true)

             
                    })
                    .catch((err) => {
                        console.log("ERROR" + err)
                    });





            })
            .catch((err) => {
                console.log("ERROR" + err)
            });

          
        }, [props]);
        

   




    return (
        <div>
            <div className={styles.container}>         
                <div className={classes.root}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItemLink href="/results/hr">
                        <ListItemText primary="Heart Rate" />
                        </ListItemLink>
                        <ListItemLink href="/results/emg">
                        <ListItemText primary="Muscle Activity" />
                        </ListItemLink>
                        <ListItemLink href="/results/quest">
                        <ListItemText primary="Questionnaire" />
                        </ListItemLink>
                    </List>
                </div>
                
           
            </div>
                {/* <div style={{marginLeft : '5%', marginBottom : '50px', display: 'flex'}}>  
                    {loaded && graphPre}
                    {loaded && graph25}
                    {loaded && graph50}
                </div> 
                <div style={{marginLeft : '5%', marginBottom : '50px', display: 'flex'}}>  
                    {loaded && graph75}
                    {loaded && graphPost}
                </div>  */}
                <div style={{marginLeft : '25%', marginBottom : '50px', display: 'flex'}}>  
                    {loaded && graphPre}
                    {loaded && graphPost}
                </div> 
        </div>
    )
}

            

export default ResultsHRCON


