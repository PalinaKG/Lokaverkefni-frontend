import React, { useState, useEffect} from 'react';
import styles from './Results.module.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



const ResultsHome = (props) => {


    function ListItemLink(props) {
        return <ListItem button component="a" {...props} />;
      }

    
        




    return (
        <div>
            <div style={{width: 500, marginLeft: 20, height: 70}}>
                <h3> Compare results between people that had suffered a concussion and those who had not</h3>
            </div>
        <div className={styles.container}>
            
            <div className={styles.listItemContainer}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItemLink style={{ border: "2px solid lightgrey"}} href="/results/hr">
                        <ListItemText primaryTypographyProps={{ style: {fontWeight: 'bolder'} }}  primary="Heart Rate" />
                        </ListItemLink>
                        <ListItemLink style={{ borderRight: "2px solid lightgrey", borderLeft: "2px solid lightgrey"}} href="/results/emg">
                        <ListItemText primaryTypographyProps={{ style: {fontWeight: 'bolder'} }} primary="Muscle Activity" />
                        </ListItemLink>
                        <ListItemLink style={{ border: "2px solid lightgrey"}}  href="/results/quest">
                        <ListItemText primaryTypographyProps={{ style: {fontWeight: 'bolder'} }} primary="Questionnaire" />
                        </ListItemLink>
                    </List>
            </div>
                
                
        </div>
        </div>
    )
}

            

export default ResultsHome


