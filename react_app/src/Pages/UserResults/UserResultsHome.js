import React, { useState, useEffect } from "react";
import styles from "./Results.module.css";
import ResultsMenu from "../../Components/ResultsMenu";

const ResultsHome = (props) => {
  return (
    <div className={styles.container}>
      <div>
        <ResultsMenu type="user" />
      </div>
      <div style={{ width: 500, marginLeft: 20, height: 70 }}>
        <h2>
          Compare results between people that had suffered a concussion and
          those who had not:
        </h2>
      </div>
    </div>
  );
};

export default ResultsHome;
