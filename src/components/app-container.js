import {connect} from "react-redux";
import App from "./app";

const mapStateToProps = ({ thingy }) => ({
  isConnected: thingy.connected.reading
});

export default connect(mapStateToProps)(App);
