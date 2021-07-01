import styles from "../Pages/UserResults/Results.module.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { rgbToHex } from "@material-ui/core";

const ResultsMenu = (props) => {
  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <div className={styles.listItemContainer}>
      <List style={{ color: "inherit", paddingTop: 50 }} component="nav">
        <ListItemLink href={"/" + props.type + "_results"}>
          <ListItemText
            primaryTypographyProps={{
              style: {
                fontFamily: "Helvetica",
                color: "white",
              },
            }}
            primary="ALL RESULTS"
          />
        </ListItemLink>
        <ListItemLink href={"/" + props.type + "_results/msscore"}>
          <ListItemText
            primaryTypographyProps={{
              style: {
                fontFamily: "Helvetica",
                color: "white",
              },
            }}
            primary="MS SCORE"
          />
        </ListItemLink>
        <ListItemLink
          style={{
            color: "white",
          }}
          href={"/" + props.type + "_results/hr"}
        >
          <ListItemText
            primaryTypographyProps={{
              style: {
                color: "white",
              },
            }}
            primary="HEART RATE"
          />
        </ListItemLink>
        <ListItemLink
          style={{
            color: "white",
          }}
          href={"/" + props.type + "_results/emg"}
        >
          <ListItemText
            primaryTypographyProps={{
              style: {
                color: "white",
              },
            }}
            primary="MUSCLE ACTIVITY"
          />
        </ListItemLink>
        <ListItemLink href={"/" + props.type + "_results/quest"}>
          <ListItemText
            primaryTypographyProps={{
              style: {
                color: "white",
              },
            }}
            primary="QUESTIONNAIRE"
          />
        </ListItemLink>
      </List>
    </div>
  );
};

export default ResultsMenu;
