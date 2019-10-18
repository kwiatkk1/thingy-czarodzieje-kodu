import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import Markdown from "components/ui/markdown";

import ChallengeHeader from "components/ui/challenge-header";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh"
  },
  main: {
    flexGrow: 1,
    display: "flex",
    height: "calc(100vh - 81px)"
  },
  sourcePanel: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  },
  codePanel: {
    flexGrow: 1,
    flexShrink: 1,
  },
  textPanel: {
    width: "40em",
    flexShrink: 0,
    padding: theme.spacing(2),
    overflowY: "scroll",
    height: "calc(100vh - 81px)"
  },
}));

export default function ChallengeFrame(props) {
  const classes = useStyles();
  const { headerText, markdownText, showcasePanel, codePanel } = props;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <ChallengeHeader text={headerText} />
      </div>
      <div className={classes.main}>
        <div className={classes.sourcePanel}>
          {showcasePanel}
          <div className={classes.codePanel}>{codePanel}</div>
        </div>
        <div className={classes.textPanel}>
          {markdownText ? <Markdown input={markdownText} /> : null}
        </div>
      </div>
    </div>
  );
}

ChallengeFrame.propTypes = {
  headerText: PropTypes.string.isRequired,
  markdownText: PropTypes.string,
  showcasePanel: PropTypes.object,
  codePanel: PropTypes.object
}
