import {connect} from "react-redux";
import {toggleFeature} from "actions/misc";


import Lesson from "./index";

const mapStateToProps = ({misc}) => {
  return ({
    button: misc.button
  });
};

const mapDispatchToProps = (dispatch) => ({
  startUiFeatures: () => {
    dispatch(toggleFeature("button", "on"));
  },

  toggleButton: () => {
    dispatch(toggleFeature("button", "both"));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lesson);
