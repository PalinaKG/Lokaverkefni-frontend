import React, { useEffect, useState} from 'react'
import { API_SERVER } from '../settings';

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


const ImportData = (props) => {
    const [subID, setSubID] = useState()
    const [loaded, setLoaded] = useState(true);
    const [file, setFile] = useState(null)
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [messageType, setMessageType] = useState("")
    const [message, setMessage] = useState("")

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
    


const postData = (d) =>
{
    fetch(API_SERVER + "/api/import_data/", {
        method: "POST",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
        body: d,
      })
      .catch((error) => {
        console.log("ERROR", error)
        })
        .then((res) => {
            console.log(res)
            if (res.status == 200)
            {
                setMessageType("success")
                setMessage(res.statusText + ": The data has been added")
                setLoaded(true)
                setOpen(true)
            }
            else if (res.status == 404)
            {
                setMessageType("error")
                setMessage(res.statusText + ": Check if the subjects being added exist in the database")
                setLoaded(true)
                setOpen(true)

            }
            else if (res.status == 400)
            {
                setMessageType("error")
                setMessage(res.statusText + ": Check if the headers are correct")
                setLoaded(true)
                setOpen(true)
                

            }
            else 
            {
                setMessageType("error")
                setMessage(res.statusText)
                setLoaded(true)
                setOpen(true)
            }

        })
        .then(
          (result) => {
              console.log(result)

          });
        

};



const handleFiles = files => {
    setLoaded(false)
    var reader = new FileReader();
    reader.onload = function(e) {
        // Use reader.result
        postData(reader.result)
        
    }
    reader.readAsText(files[0]);
}






    return (
        <div>
            <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'} >
                <button className='btn'>Upload</button>
            </ReactFileReader>
            <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={messageType}>
                        {message}
                </Alert>
            </Snackbar>
            {!loaded && <CircularProgress></CircularProgress> }
            { !loaded && <p> Data is being loaded</p> }
   
            </div>

    


        </div>
    )
}


     

export default ImportData