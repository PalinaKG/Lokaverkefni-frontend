import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Barchart from "../../Components/Barchart";
import ResultsMenu from "../../Components/ResultsMenu";
import styles from "./Results.module.css";
import MSScoreRadarChart from "../../Components/MSScoreRadarChart";

const ResultsMSScore = (props) => {
  console.log("HELLOOOOOOOO");

  return (
    <div className={styles.container}>
      <div>
        <ResultsMenu type="user" />
      </div>
      <div>
        <div style={{ width: 500, marginLeft: 20, height: 70 }}>
          <h3> Comparison for results:</h3>
        </div>
        <div className={styles.container}>
          <MSScoreRadarChart></MSScoreRadarChart>
        </div>
      </div>
    </div>
  );
};

export default ResultsMSScore;
