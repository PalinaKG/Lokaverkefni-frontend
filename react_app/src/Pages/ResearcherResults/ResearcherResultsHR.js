import React, { useEffect, useState} from 'react';
import Graph from '../../Components/Graph';
import Graph2 from '../../Components/Graph2';
import styles from './Results.module.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Button} from '@material-ui/core';
import ResultsMenu from '../../Components/ResultsMenu'
import { API_SERVER } from '../../settings';
import Barchart from '../../Components/Barchart'


import { makeStyles } from '@material-ui/core/styles';
import { Bar } from 'recharts';



const useStyles = makeStyles((theme) => ({
    root: {
      width: 200,
      maxWidth: 360,
    },
  }));



const ResultsHR = (props) => {
    const [birthyear1, setBirthyear1] = useState("")
    const [birthyear2, setBirthyear2] = useState("")
    const [birthyear3, setBirthyear3] = useState("")
    const [birthyear4, setBirthyear4] = useState("")
    const [gender, setGender] = useState("")
    const [gender2, setGender2] = useState("")
    const [loaded1, setLoaded1] = useState(false);
    const [loaded2, setLoaded2] = useState(false);
    const [groups, setGroups] = useState("")
    const [groups2, setGroups2] = useState("")
    const [allGroups, setAllGroups] = useState([])
    const classes = useStyles();

    const unique = (value, index, self) => {
        return self.indexOf(value) === index
    }
      
      

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
                var groups=[]
                var uniqueGroups = []
                result.forEach(element => {
                    groups.push(element.groups)
                });
                
                uniqueGroups = groups.filter(unique)  
                setAllGroups(uniqueGroups)   
                console.log(uniqueGroups)
            })
            .catch((err) => {
                console.log("ERROR" + err)
            });

    },[props]);
        

  

    var birthyears = []
    for (var i = 2020; i>= 1900; i--)
    {
        birthyears.push(i)
    }



    function handleGender(e)
   {
        setLoaded1(false)

        if (e.target.value == 2)
        {
            setGender("")  
        }
        else {
            setGender(e.target.value)  
        }   
   }

   function handleGender2(e)
   {
        setLoaded2(false)

        if (e.target.value == 2)
        {
            setGender2("")  
        }
        else {
            setGender2(e.target.value)  
        }   
   }
 

   function handleBirthyear1(e)
   {
        setLoaded1(false)

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
    setLoaded1(false)

    if (e.target.value == 0)
        {
            setBirthyear2("")  
        }
        else {
            setBirthyear2(e.target.value)  
        }
   }

   function handleBirthyear3(e)
   {
        setLoaded2(false)

        if (e.target.value == 0)
        {
            setBirthyear3("")  
        }
        else {
            setBirthyear3(e.target.value)  
        }
   }

   function handleBirthyear4(e)
   {
    setLoaded2(false)

    if (e.target.value == 0)
        {
            setBirthyear4("")  
        }
        else {
            setBirthyear4(e.target.value)  
        }
   }

   function handleGroups(e)
   {
        setLoaded1(false)
        
        if (e.target.value === 0)
        {
            setGroups("")  
        }
        else {
            setGroups(e.target.value)  
        }   
   }

   function handleGroups2(e)
   {
        setLoaded2(false)

        if (e.target.value === 0)
        {
            setGroups2("")  
        }
        else {
            setGroups2(e.target.value)  
        }   
   }

   

   function buttonClicked1()
   {
       setLoaded1(true)

   }

   function buttonClicked2()
   {
       setLoaded2(true)

   }






    return (
        <div>
            
            
                <div className={styles.container}>
                    <ResultsMenu type = "researcher"/>
                    <h1 style={{alignItems: 'left'}}>Compare results between two different groups</h1>
                    
                    <div style={{display: 'flex'}}>
                    <div className = {styles.inputFields}>
                    <InputLabel style={{fontSize: 15, marginRight: 15, marginTop: 45}}>Birthyear from: </InputLabel>
                    <Select value={birthyear1} onChange={handleBirthyear1}>
                        <MenuItem value={0}>None</MenuItem>
                        {birthyears.map((s) => (
                            <MenuItem value={s}>{s}</MenuItem>
                        ))}
                    </Select>
                    <InputLabel style={{fontSize: 15, marginLeft: 20, marginRight: 15, marginTop: 45}} >to: </InputLabel>
                    <Select value={birthyear2} onChange={handleBirthyear2}>
                        <MenuItem value={0}>None</MenuItem>
                        {birthyears.map((s) => (
                            <MenuItem value={s}>{s}</MenuItem>
                        ))}
                    </Select>
                    <InputLabel style={{fontSize: 15, marginLeft: 50,  marginRight: 15, marginTop: 45}} >Gender: </InputLabel>
                    <Select value={gender} onChange={handleGender}>
                        <MenuItem value={2}>None</MenuItem>
                        <MenuItem value={0}>Female</MenuItem>
                        <MenuItem value={1}>Male</MenuItem>
                    </Select>
                    <InputLabel style={{fontSize: 15, marginLeft: 50, marginRight: 15, marginTop: 45}} >Groups: </InputLabel>
                    <Select value={groups} onChange={handleGroups}>
                        <MenuItem value={0}>None</MenuItem>
                        {allGroups.map((g) => (
                            <MenuItem value={g}>{g}</MenuItem>
                        ))}
                    </Select>
                    </div>

                    <Button style = {{width: 85, height: 55, marginTop: 90, marginLeft: 30, marginRight: 50}} onClick={buttonClicked1}>
                        Get
                    </Button>

                    
                </div>

                {/* <div style = {{height : "500px"}}>
                    <div>
                        {loaded1 && <h1 className={styles.title} > HR Variability</h1>}
                        {loaded1 && 
                            <Graph title='Heartrate [bpm]' xasis="interval"  yasis="bpm"  ydom={[60, 130]}  birthyear1={birthyear1}  birthyear2={birthyear2}  gender={gender}  link={ "hr/?subjectid="} group={groups} ></Graph>
                        }
                    </div> 
                </div> */}

                    <div className={styles.container}>

                    <div className = {styles.inputFields2}>
                    <InputLabel style={{fontSize: 15, marginRight: 15, marginTop: 45}}>Birthyear from: </InputLabel>
                    <Select value={birthyear3} onChange={handleBirthyear3}>
                        <MenuItem value={0}>None</MenuItem>
                        {birthyears.map((s) => (
                            <MenuItem value={s}>{s}</MenuItem>
                        ))}
                    </Select>
                    <InputLabel style={{fontSize: 15, marginLeft: 20, marginRight: 15, marginTop: 45}} >to: </InputLabel>
                    <Select value={birthyear4} onChange={handleBirthyear4}>
                        <MenuItem value={0}>None</MenuItem>
                        {birthyears.map((s) => (
                            <MenuItem value={s}>{s}</MenuItem>
                        ))}
                    </Select>
                    <InputLabel style={{fontSize: 15, marginLeft: 40, marginRight: 15, marginTop: 45}} >Gender: </InputLabel>
                    <Select value={gender2} onChange={handleGender2}>
                        <MenuItem value={2}>None</MenuItem>
                        <MenuItem value={0}>Female</MenuItem>
                        <MenuItem value={1}>Male</MenuItem>
                    </Select>
                    <InputLabel style={{fontSize: 15, marginLeft: 40, marginRight: 25, marginTop: 45}} >Groups: </InputLabel>
                    <Select value={groups2} onChange={handleGroups2}>
                        <MenuItem value={0}>None</MenuItem>
                        {allGroups.map((g) => (
                            <MenuItem value={g}>{g}</MenuItem>
                        ))}
                    </Select>
                    </div>
                    
                    <Button style = {{width: 85, height: 55, marginTop: 90, marginLeft: 30}} onClick={buttonClicked2}>
                        Get
                    </Button>

                    
                    
                </div>
        </div>

        <div style = {{height : "500px", marginTop: 50}}>
            <div>
                
                {loaded1 && <h1 className={styles.title} > HR Variability</h1>}
                <div style = {{display: 'flex'}}>
                {loaded1 && 
                    <Graph title='Heartrate [bpm]' xasis="interval"  yasis="bpm"  ydom={[60, 130]}  birthyear1={birthyear1}  birthyear2={birthyear2}  gender={gender}  link={ "hr/"} group1 = {groups} group2 = {groups2} ></Graph>
                }
                {/* {loaded2 && 
                    <Graph2 title='Heartrate [bpm]' xasis="interval"  yasis="bpm"  ydom={[60, 130]}  birthyear1={birthyear3}  birthyear2={birthyear4}  gender={gender2}  link={ "hr/?subjectid="} group={groups2} ></Graph2>
                }
                 */}
                
                </div>
                <Barchart group1Name = "No concussion" group2Name = "Concussion"  link = "hr/" group1 = {groups} group2 = {groups2} /> 
            </div> 
        </div>
        {/* <Barchart group1 = {groups} group2 = {groups2}/> */}

        </div>
    )
}

            

export default ResultsHR

