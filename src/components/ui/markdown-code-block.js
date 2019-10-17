import React from "react";
import PropTypes from "prop-types";
import { Prism } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MarkdownCodeBlock(props) {
  const { language, value } = props;
  return <Prism language={language} style={prism}>{value}</Prism>;
}

MarkdownCodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string
};

MarkdownCodeBlock.defaultProps = {
  language: null
};
