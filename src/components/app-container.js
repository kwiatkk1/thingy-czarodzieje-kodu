import {connect} from "react-redux";
import App from "./app";

const mapStateToProps = ({ misc }) => ({
  connected: misc.connected.reading
});

export default connect(mapStateToProps)(App);
