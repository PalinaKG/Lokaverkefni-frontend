import React, { useEffect, useState} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { API_SERVER } from '../settings';
import HRGraph from './HRGraph';
import CSRFToken from './csrftoken';

import { Button, Input } from '@material-ui/core';

const Home = () => {
    const [subID, setSubID] = useState()
    const [loaded, setLoaded] = useState(false);
    

    // const readExcel=(file) => {
    //     const promise = new Promise(resolve,reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsArrayBuffer(file);
            
    //         fileReader.onload = (e) => {
    //             const bufferArray = e.target.result;

    //             const wb = XLSX.read(bufferArray, {type: 'buffer'})
    //             const 
    //         }
    //     }
    // }

    const onSubmit = (e) =>
    {
        console.log(e)
        console.log(API_SERVER)
        fetch(API_SERVER + "/api/subject/upload-csv", {
            method: "POST",
            headers: {
              Authorization: `JWT ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((result) => {
  
            })
            .catch((err) => {
                console.log("ERROR")
                console.log(err)
            });
    }

//    function handleChange(e)
//    {
//     setLoaded(false)
//     setSubID(e.target.value)  
//    }

//    function buttonClicked()
//    {
//        setLoaded(true)
//    }


    return (
        <div>
            <form onSubmit={onSubmit} enctype = "multipart/form/data" >
                <CSRFToken />
                <input  type='file' name='file'/>
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}


            {/* <div onChange={handleChange}>
                <Input />
            </div>
            <Button onClick={buttonClicked}>
                Search
            </Button>

            <div>
                {loaded && 
                    <HRGraph subjectID = {subID} ></HRGraph>
                }
            </div>  */}


export default Home