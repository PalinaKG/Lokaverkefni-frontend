import React, { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";
import "./styles.css";
import { Button, CircularProgress } from "@material-ui/core";
import { API_SERVER } from "../settings";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import CustomTooltipContent from "./CustomTooltip";
import DropDownRadar from "./radarChartFunctions";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const data = [
  {
    subject: "General Discomfort",

    fullMark: 3,
  },
  {
    subject: "Dizziness and Vertigo",
    fullMark: 3,
  },
  {
    subject: "Stomach-related Index",
    fullMark: 3,
  },
  {
    subject: "Head Index",
    fullMark: 3,
  },
  {
    subject: "Fatigue Index",
    fullMark: 3,
  },
  //   {
  //     subject: "Physiological/Vegetative Index",
  //     fullMark: 3,
  //   },
  //   {
  //     subject: "Neurological/Muscle Strain Index",
  //     fullMark: 3,
  //   },
  {
    subject: "Motion Sickness Index",
    fullMark: 3,
  },
];
var birthyears = [];
for (var i = 2010; i >= 1900; i = i - 10) {
  birthyears.push(i);
}
var chart;

export default function AllResultsChart(props) {
  const [groups, setGroups] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loaded1, setLoaded1] = useState(false);
  const [loaded2, setLoaded2] = useState(false);
  const [Data, setData] = useState(data);
  const [data1, setData1] = useState(data);
  const [disp1, setDisp1] = useState("flex");
  const [disp2, setDisp2] = useState("none");
  const [disp3, setDisp3] = useState("none");
  const [disp4, setDisp4] = useState("none");
  const [disp5, setDisp5] = useState("none");
  //   const [chart, setChart] = useState();

  const createChart = () => {
    chart = (
      <RadarChart
        cx={300}
        cy={250}
        outerRadius={150}
        width={500}
        height={500}
        data={Data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        {/* <PolarRadiusAxis /> */}
        <Tooltip content={<CustomTooltipContent />} />

        {disp1 == "flex" && (
          <Radar
            name="A"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
            dot={false}
          />
        )}
        {disp2 == "flex" && (
          <Radar
            name="B"
            dataKey="B"
            stroke="#fc0335"
            fill="#fc0335"
            fillOpacity={0.6}
            dot={false}
          />
        )}
        {disp3 == "flex" && (
          <Radar
            name="C"
            dataKey="C"
            stroke="#03fc07"
            fill="#03fc07"
            fillOpacity={0.6}
            dot={false}
          />
        )}
        {disp4 == "flex" && (
          <Radar
            name="D"
            dataKey="D"
            stroke="#fcb103"
            fill="#fcb103"
            fillOpacity={0.6}
            dot={false}
          />
        )}
        {disp5 == "flex" && (
          <Radar
            name="E"
            dataKey="E"
            stroke="#0328fc"
            fill="#0328fc"
            fillOpacity={0.6}
            dot={false}
          />
        )}
      </RadarChart>
    );
  };

  useEffect(() => {
    setLoaded2(true);
  }, [chart]);

  //   useEffect(() => {
  //     setChart(
  //       <RadarChart
  //         cx={300}
  //         cy={250}
  //         outerRadius={150}
  //         width={500}
  //         height={500}
  //         data={Data}
  //       >
  //         <PolarGrid />
  //         <PolarAngleAxis dataKey="subject" />
  //         <PolarRadiusAxis />
  //         <Tooltip content={<CustomTooltipContent />} />

  //         {disp1 == "flex" && (
  //           <Radar
  //             name="A"
  //             dataKey="A"
  //             stroke="#8884d8"
  //             fill="#8884d8"
  //             fillOpacity={0.6}
  //             dot={false}
  //           />
  //         )}
  //         {disp2 == "flex" && (
  //           <Radar
  //             name="B"
  //             dataKey="B"
  //             stroke="#fc0335"
  //             fill="#fc0335"
  //             fillOpacity={0.6}
  //             dot={false}
  //           />
  //         )}
  //         {disp3 == "flex" && (
  //           <Radar
  //             name="C"
  //             dataKey="C"
  //             stroke="#03fc07"
  //             fill="#03fc07"
  //             fillOpacity={0.6}
  //             dot={false}
  //           />
  //         )}
  //         {disp4 == "flex" && (
  //           <Radar
  //             name="D"
  //             dataKey="D"
  //             stroke="#fcb103"
  //             fill="#fcb103"
  //             fillOpacity={0.6}
  //             dot={false}
  //           />
  //         )}
  //         {disp5 == "flex" && (
  //           <Radar
  //             name="E"
  //             dataKey="E"
  //             stroke="#0328fc"
  //             fill="#0328fc"
  //             fillOpacity={0.6}
  //             dot={false}
  //           />
  //         )}
  //       </RadarChart>
  //     );
  //   }, [Data, groups]);

  const handleButton = () => {
    setLoaded(false);
    setData(data1);
    createChart();
    setLoaded1(true);
    setTimeout(function () {
      setLoaded(true);
      console.log(chart);
    }, 2000);
    console.log(loaded);
  };

  //   useEffect(() => {
  //     // createChart();
  //     if (loaded1 && loaded2) {
  //       setLoaded(true);
  //     } else {
  //       setLoaded(false);
  //     }
  //   });

  useEffect((props) => {}, [data1]);

  const handleOpen = () => {
    if (
      disp2 == "none" &&
      disp3 == "none" &&
      disp4 == "none" &&
      disp5 == "none"
    ) {
      setDisp2("flex");
    } else if (
      disp2 == "flex" &&
      disp3 == "none" &&
      disp4 == "none" &&
      disp5 == "none"
    ) {
      setDisp3("flex");
    }
    // else if (
    //   disp2 == "flex" &&
    //   disp3 == "flex" &&
    //   disp4 == "none" &&
    //   disp5 == "none"
    // ) {
    //   setDisp4("flex");
    // }
    // else if (
    //   disp2 == "flex" &&
    //   disp3 == "flex" &&
    //   disp4 == "flex" &&
    //   disp5 == "none"
    // ) {
    //   setDisp5("flex");
    // }
  };

  const handleClose = () => {
    if (
      disp2 == "flex" &&
      disp3 == "none" &&
      disp4 == "none" &&
      disp5 == "none"
    ) {
      setDisp2("none");
    } else if (
      disp2 == "flex" &&
      disp3 == "flex" &&
      disp4 == "none" &&
      disp5 == "none"
    ) {
      setDisp3("none");
    }
    // else if (
    //   disp2 == "flex" &&
    //   disp3 == "flex" &&
    //   disp4 == "flex" &&
    //   disp5 == "none"
    // ) {
    //   setDisp4("none");
    // } else if (
    //   disp2 == "flex" &&
    //   disp3 == "flex" &&
    //   disp4 == "flex" &&
    //   disp5 == "flex"
    // ) {
    //   setDisp5("none");
    // }
  };

  return (
    <div style={{ width: 600 }}>
      <div>
        <div style={{ width: 700, display: disp1 }}>
          <DropDownRadar
            dataLoaded={dataLoaded}
            data={data1}
            dataSet={1}
          ></DropDownRadar>
          <Button
            style={{ backgroundColor: "rgb(244, 244, 244)" }}
            onClick={() => handleOpen()}
          >
            <AddIcon />
          </Button>
          <Button
            style={{ backgroundColor: "rgb(244, 244, 244)" }}
            onClick={() => handleClose()}
          >
            <RemoveIcon />
          </Button>
        </div>
        <div style={{ display: disp2 }}>
          <DropDownRadar
            dataLoaded={dataLoaded}
            data={data1}
            dataSet={2}
          ></DropDownRadar>
        </div>
        <div style={{ display: disp3 }}>
          <DropDownRadar
            dataLoaded={dataLoaded}
            data={data1}
            dataSet={3}
          ></DropDownRadar>
        </div>
        {/* <div style={{ display: disp4 }}>
          <DropDownRadar
            dataLoaded={dataLoaded}
            data={data1}
            dataSet={4}
          ></DropDownRadar>
        </div>
        <div style={{ display: disp5 }}>
          <DropDownRadar
            dataLoaded={dataLoaded}
            data={data1}
            dataSet={5}
          ></DropDownRadar>
        </div> */}

        <Button style={{ marginLeft: 20 }} onClick={handleButton}>
          Get results
        </Button>
      </div>
      {loaded && chart}
      {!loaded && loaded1 && (
        <CircularProgress style={{ marginTop: 150 }}></CircularProgress>
      )}
    </div>
  );
}
