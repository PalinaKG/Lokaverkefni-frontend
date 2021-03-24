import React, { useState} from 'react';
import Graph from './Graph';
import styles from './Home.module.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Button, CircularProgress, Input } from '@material-ui/core';
import QGraph from './QuestionnaireGraph';



const Home = (props) => {
    const [birthyear1, setBirthyear1] = useState("")
    const [birthyear2, setBirthyear2] = useState("")
    const [gender, setGender] = useState("")
    const [loaded, setLoaded] = useState(false);
    const [sensor, setSensor] = useState("");

    var birthyears = []
    for (var i = 2020; i>= 1900; i--)
    {
        birthyears.push(i)
    }


    function handleSensor(e)
   {
        setLoaded(false)

        if (e.target.value == 0)
        {
            setSensor("")  
        }
        else {
            setSensor(e.target.value)  
        }   
   }

    function handleGender(e)
   {
        setLoaded(false)

        if (e.target.value == 2)
        {
            setGender("")  
        }
        else {
            setGender(e.target.value)  
        }   
   }

   function handleGender(e)
   {
        setLoaded(false)

        if (e.target.value == 2)
        {
            setGender("")  
        }
        else {
            setGender(e.target.value)  
        }   
   }
 

   function handleBirthyear1(e)
   {
        setLoaded(false)

        if (e.target.value == 0)
        {
            setBirthyear1("")  
        }
        else {
            setBirthyear1(e.target.value)  
        }
   }

   function handleBirthyear2(e)
   {
    setLoaded(false)

    if (e.target.value == 0)
        {
            setBirthyear2("")  
        }
        else {
            setBirthyear2(e.target.value)  
        }
   }

   

   function button1Clicked()
   {
       setLoaded(true)

   }






    return (
        <div>
            {/* <div className = {styles.inputFields}>
            <InputLabel style={{marginRight: 10, marginTop: 7}}>Birthyear from: </InputLabel>
            <Select value={birthyear1} onChange={handleBirthyear1}>
                <MenuItem value={0}>None</MenuItem>
                {birthyears.map((s) => (
                    <MenuItem value={s}>{s}</MenuItem>
                ))}
            </Select>
            <InputLabel style={{ marginLeft: 20, marginRight: 10, marginTop: 7}} >to: </InputLabel>
            <Select value={birthyear2} onChange={handleBirthyear2}>
                <MenuItem value={0}>None</MenuItem>
                {birthyears.map((s) => (
                    <MenuItem value={s}>{s}</MenuItem>
                ))}
            </Select>
            <InputLabel style={{ marginLeft: 50, marginRight: 10, marginTop: 7}}>Gender: </InputLabel>
            <Select value={gender} onChange={handleGender}>
                <MenuItem value={2}>None</MenuItem>
                <MenuItem value={0}>Female</MenuItem>
                <MenuItem value={1}>Male</MenuItem>
            </Select>
            <InputLabel style={{ marginLeft: 50, marginRight: 10, marginTop: 7}}>Sensor: </InputLabel>
            <Select value={sensor} onChange={handleSensor}>
                <MenuItem value={0}>None</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
            </Select>
            </div>
            
            <Button style={{ width: 10}} onClick={button1Clicked}>
                Search
            </Button>

            <div styles = {{height : "1000px"}}>

        
            <div>
                {loaded && 
                    <QGraph ydom={[0, 3]} xasis="type"  yasis={['msgoldenid', 'subjectid', 'type', 'dizziness', 'nausea', 'sweat', 'diffoffocus', 'blurredvision', 'incrsalvation', 'eyestrain','headache', 'fatigue','gendiscomfort']}  birthyear1={birthyear1}  birthyear2={birthyear2}  gender={gender}  link={ "msgolden/?subjectid="} ></QGraph>
                }
            </div>

            </div> */}
            
        </div>
    )
}

            

export default Home

