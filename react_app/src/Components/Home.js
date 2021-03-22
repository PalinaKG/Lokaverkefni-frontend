import React, { useEffect, useState} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { API_SERVER } from '../settings';
import HRGraph from './HRGraph';
import * as settings from '../settings';
import axios from 'axios';
import ReactFileReader from 'react-file-reader';

import { Button, CircularProgress, Input } from '@material-ui/core';
import readXlsxFile from 'read-excel-file'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
         width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      
    },
  }));


const Home = (props) => {
    const [birthyear1, setBirthyear1] = useState()
    const [birthyear2, setBirthyear2] = useState()
    const [loaded, setLoaded] = useState(false);


    


   function handleChange1(e)
   {
    setLoaded(false)
    setBirthyear1(e.target.value)  
   }

   function handleChange2(e)
   {
    setLoaded(false)
    setBirthyear2(e.target.value)  
   }

   function buttonClicked()
   {
       setLoaded(true)
   }





    return (
        <div>
            <div onChange={handleChange1}>
                <Input />
            </div>
            <div onChange={handleChange2}>
                <Input />
            </div>
            <Button onClick={buttonClicked}>
                Search
            </Button>

            <div>
                {loaded && 
                    <HRGraph birthyear1 = {birthyear1} birthyear2 = {birthyear2} ></HRGraph>
                }
            </div> 
        </div>
    )
}


            


export default Home