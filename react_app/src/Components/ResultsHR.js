import React, { useState} from 'react';
import Graph from './Graph';
import styles from './Home.module.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Button} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles((theme) => ({
    root: {
      width: 200,
      maxWidth: 360,
    },
  }));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

const ResultsHR = (props) => {
    const [birthyear1, setBirthyear1] = useState("")
    const [birthyear2, setBirthyear2] = useState("")
    const [gender, setGender] = useState("")
    const [loaded, setLoaded] = useState(false);
    const classes = useStyles();

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
        <div className={styles.container}>
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItemLink href="/results/hr">
                    <ListItemText primary="HR" />
                    </ListItemLink>
                    <ListItemLink href="/results/emg">
                    <ListItemText primary="EMG" />
                    </ListItemLink>
                    <ListItemLink href="/results/quest">
                    <ListItemText primary="Questionnaire" />
                    </ListItemLink>
                </List>
            </div>
            

            <div className = {styles.inputFields}>
            <InputLabel style={{marginRight: 10, marginTop: 45}}>Birthyear from: </InputLabel>
            <Select value={birthyear1} onChange={handleBirthyear1}>
                <MenuItem value={0}>None</MenuItem>
                {birthyears.map((s) => (
                    <MenuItem value={s}>{s}</MenuItem>
                ))}
            </Select>
            <InputLabel style={{ marginLeft: 20, marginRight: 10, marginTop: 45}} >to: </InputLabel>
            <Select value={birthyear2} onChange={handleBirthyear2}>
                <MenuItem value={0}>None</MenuItem>
                {birthyears.map((s) => (
                    <MenuItem value={s}>{s}</MenuItem>
                ))}
            </Select>
            <InputLabel style={{ marginLeft: 50, marginRight: 10, marginTop: 45}} >Gender: </InputLabel>
            <Select value={gender} onChange={handleGender}>
                <MenuItem value={2}>None</MenuItem>
                <MenuItem value={0}>Female</MenuItem>
                <MenuItem value={1}>Male</MenuItem>
            </Select>
            </div>
            
            <Button style = {{width: 50}} onClick={buttonClicked}>
                Search
            </Button>

            
            
        </div>

        <div styles = {{height : "1200px", marginTop: "100px"}}>
            <div>
                {loaded && <h1 className={styles.title} > HR Variability</h1>}
                {loaded && 
                    <Graph title='Heartrate [bpm]' xasis="interval"  yasis="bpm"  ydom={[60, 130]}  birthyear1={birthyear1}  birthyear2={birthyear2}  gender={gender}  link={ "hr/?subjectid="} ></Graph>
                }
            </div> 
            </div>

        </div>
    )
}

            

export default ResultsHR

