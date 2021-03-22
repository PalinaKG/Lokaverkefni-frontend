import React, { useEffect, useState} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { API_SERVER } from '../settings';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from "recharts";
var subID = []
var subject = []





const HRGraph = (props) => {


    
    // const [subject, setSubject] = useState([])
    const [loaded, setLoaded] = useState(false);
    const [subIDLoaded, setSubIDLoaded] = useState(false)
    //useEffect(() => {
      useEffect(() => {
        console.log(props.subjectID)
        fetch(API_SERVER + "/api/subject/?birthyear__gte=" + props.birthyear1 + "&birthyear__lte=" + props.birthyear2, {
            method: "GET",
            headers: {
              Authorization: `JWT ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                result.forEach(element => {
                  subID.push(element.subjectid)
                });
                fetchHR()
                // setSubject(result)
                // setLoaded(true)
            })
            .catch((err) => {
                console.log("ERROR" + err)
            });


           
              

            

        }, [props]);






        const fetchHR = () => {

          subID.forEach(subjectID => {
            fetch(API_SERVER + "/api/hr/?subjectid=" + subjectID, {
              method: "GET",
              headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((result) => {
                  subject.push(result)
                  console.log(subject)
                  
              })
              .catch((err) => {
                  console.log("ERROR")
              });
        
          })
          setLoaded(true)

        
        }



       



        return (
            <div>
                {/* <h1> SubjectID: {props.subjectID} </h1> */}
                {/* <ResponsiveContainer width="100%" height={500}> */}
                {loaded && console.log(subject)}
            {loaded &&
            
              <LineChart width={800} height={400} data={subject[1]}
                margin={{ top: 50, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="interval"/>
                <XAxis />
                <YAxis  domain={[60, 120]}/>
                <Tooltip />
                <Line type="monotone" dataKey="bpm" stroke="#8884d8" />
              </LineChart>
}
              {/* </ResponsiveContainer> */}
            </div>
          );
}
export default HRGraph