import React, { useEffect, useRef } from "react";

import Details from "./Details/Details";
import { Grid } from "@material-ui/core";
import useStyles from "./styles";
import Main from "./Main/Main";
import MenuAppBar from "./navBar";
import styles from "./Grids.css";

import { useSpeechContext } from "@speechly/react-client";

import {
  PushToTalkButton,
  PushToTalkButtonContainer
} from "@speechly/react-ui";

const App = () => {
  const classes = useStyles();
  const { speechState } = useSpeechContext();
  const main = useRef(null);
  const executeScroll = () => main.current.scrollIntoView();

  useEffect(() => {
    if (speechState === "Done") {
      executeScroll();
    }
  }, [speechState]);

  return (
    <div className={styles.setter}>
      <MenuAppBar />
      <Grid
        id="setter"
        className={classes.grid}
        container
        spacing={2}
        alignItems="center"
        justify="center"
        style={{ width: "100vw", marginTop: 8 }}
      >
        {/* For example, xs={12} sm={6} sizes a component to occupy half of the
        viewport width (6 columns) when viewport width is 600 or more pixels.
        For smaller viewports, the component fills all 12 available columns. */}
        <Grid item xs={12} sm={4} className={classes.mobile}>
          <Details title="Income" />
        </Grid>
        <Grid ref={main} item xs={12} sm={3} className={classes.main}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.desktop}>
          <Details title="Expense" />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
      </PushToTalkButtonContainer>
    </div>
  );
};

export default App;
