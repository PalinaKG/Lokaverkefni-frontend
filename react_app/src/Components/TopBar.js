import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  rgbToHex,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "sans-serif",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function TopBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        style={{
          backgroundColor: "rgb(87, 141, 161)",
        }}
        position="static"
      >
        <Toolbar>
          <IconButton aria-label="home page" color="inherit" href="/">
            <HomeIcon />
          </IconButton>

          {props.isAuthenticated ? (
            <Button color="inherit" href="/questionnaire">
              Questionnaire
            </Button>
          ) : null}
          {props.isAuthenticated ? (
            <Button color="inherit" href="/import_data">
              Upload data
            </Button>
          ) : null}

          {props.isAuthenticated ? null : (
            <Button color="inherit" href="/">
              About
            </Button>
          )}
          {props.isAuthenticated ? (
            <Button color="inherit" href="/researcher_results">
              Results
            </Button>
          ) : (
            <Button color="inherit" href="/user_results">
              Results
            </Button>
          )}
          {props.isAuthenticated ? null : (
            <Button color="inherit" href="/">
              Fun facts
            </Button>
          )}
          {props.isAuthenticated ? null : (
            <Button color="inherit" href="/">
              Participate here!
            </Button>
          )}
          {/* {props.isAuthenticated ? null : <Button color="inherit" href="/login" >Login</Button>} */}
          {props.isAuthenticated ? (
            <Button color="inherit" href="/update_password">
              Update Password
            </Button>
          ) : null}
          {props.isAuthenticated ? (
            <Button color="inherit" onClick={() => props.logout()}>
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
