import React, { useState} from 'react';
import Graph from './Graph';
import styles from './Home.module.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Button, CircularProgress, Input } from '@material-ui/core';



const Home = (props) => {
    const [birthyear1, setBirthyear1] = useState("")
    const [birthyear2, setBirthyear2] = useState("")
    const [gender, setGender] = useState("")
    const [loaded, setLoaded] = useState(false);

    var birthyears = []
    for (var i = 2020; i>= 1900; i--)
    {
        birthyears.push(i)
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

   function buttonClicked()
   {
       setLoaded(true)
   }




    return (
        <div>
            <div className = {styles.inputFields}>
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
            </div>
            
            <Button onClick={buttonClicked}>
                Search
            </Button>
            
            <div>
                {loaded && 
                    <Graph type = 'hr' xasis = "interval" yasis = "bpm" xdom = {[60, 130]} link = {"?birthyear__gte=" + birthyear1 + "&birthyear__lte=" + birthyear2 + "&gender=" + gender} ></Graph>
                }
            </div> 
        </div>
    )
}

            

export default Home

