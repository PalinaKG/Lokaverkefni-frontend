import React, { useEffect, useState} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { API_SERVER } from '../settings';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from "recharts";


const HRGraph = (props) => {
    const channelIds=[13,14]
    const [subject, setSubject] = useState([])
    const [loaded, setLoaded] = useState(false);
    //useEffect(() => {
    useEffect(() => {
        console.log(props.subjectID)
        fetch(API_SERVER + "/api/hr?subjectid=" + props.subjectID, {
            method: "GET",
            headers: {
              Authorization: `JWT ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                setSubject(result)
                setLoaded(true)
            })
            .catch((err) => {
                console.log("ERROR")
            });

        }, [props]);

        return (
            <div>
                <h1> SubjectID: {props.subjectID} </h1>
                {/* <ResponsiveContainer width="100%" height={500}> */}

              <LineChart width={800} height={400} data={subject}
                margin={{ top: 50, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="time"/>
                <XAxis />
                <YAxis  domain={[60, 120]}/>
                <Tooltip />
                <Line type="monotone" dataKey="bpm" stroke="#8884d8" />
              </LineChart>
              {/* </ResponsiveContainer> */}
            </div>
          );
}
export default HRGraph