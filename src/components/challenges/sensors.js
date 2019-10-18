import React, {useEffect} from "react";

import useMarkdown from "utils/use-markdown";
import helpTextUrl from "./sensors.md";
import ChallengeFrame from "components/ui/challenge-frame";
import RealtimeChart from "components/ui/realtime-chart";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
  }
}));

export default function Sensors(props) {
  const markdownText = useMarkdown(helpTextUrl);
  const classes = useStyles();

  useEffect(() => {
    props.onStart();
  }, [props.connected]);

  const blocks = (
    <Paper className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Temperatura: {props.temperature ? props.temperature.value : null}
            <RealtimeChart data={props.temperature} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Wilgotność {props.humidity ? props.humidity.value : null}
            <RealtimeChart data={props.humidity} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Ciśnienie {props.pressure ? props.pressure.value : null}
            <RealtimeChart data={props.pressure} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Dwutlenek węgla {props.co2 ? props.co2.value : null}
            <RealtimeChart data={props.co2} />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <ChallengeFrame
      headerText="Sensory"
      markdownText={markdownText}
      showcasePanel={blocks}
    />
  );
}
