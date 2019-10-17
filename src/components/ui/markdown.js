import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import {makeStyles} from "@material-ui/core";

import MarkdownCodeBlock from "./markdown-code-block";

const useStyles = makeStyles(theme => ({
  markdown: {
    // fontFamily: theme.typography.fontFamily
  }
}));

export default function Markdown(props) {
  const classes = useStyles();
  return <ReactMarkdown
    className={classes.markdown}
    renderers={{ code: MarkdownCodeBlock }}
    source={props.input}
  />;
}

Markdown.propTypes = {
  input: PropTypes.string
};
