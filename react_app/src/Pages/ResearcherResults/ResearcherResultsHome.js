import React, { useState, useEffect} from 'react';
import styles from './Results.module.css';
import ResultsMenu from '../../Components/ResultsMenu'




const ResultsHome = (props) => {


    return (
        <div>
            <div style={{width: 500, marginLeft: 20, height: 70}}>
            </div>
        <div className={styles.container}>
            
        <ResultsMenu type = "researcher"/>  
                
                
        </div>
        </div>
    )
}

            

export default ResultsHome


