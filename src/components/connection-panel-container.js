import {connect} from "react-redux";
import {readFeature, onConnectionEvent, disconnect, startDisconnectNotification, startErrorNotification, startWriteNotification, startBatteryNotification, notifyError} from "module/thingy/thingy-actions";
import ConnectionPanel from "./connection-panel";

const mapStateToProps = ({thingy}) => {
  return ({
    connected: thingy.connected.reading,
    name: thingy.name.reading.name,
    firmware: thingy.firmware.reading.firmware,
    notification: thingy.notification,
    batteryLevel: thingy.battery.reading.status,
  });
};

const mapDispatchToProps = (dispatch) => ({
  onConnectionEvent: (state) => {
    dispatch(onConnectionEvent(state));
  },
  readName: () => {
    dispatch(readFeature("name"));
  },
  readFirmware: () => {
    dispatch(readFeature("firmware"));
  },
  disconnect: () => {
    dispatch(disconnect());
  },
  startDisconnectNotification: () => {
    dispatch(startDisconnectNotification());
  },
  startErrorNotification: () => {
    dispatch(startErrorNotification());
  },
  startWriteNotification: () => {
    dispatch(startWriteNotification());
  },
  startBatteryNotification: () => {
    dispatch(startBatteryNotification("battery", "on"));
  },
  notifyError: (e) => {
    dispatch(notifyError(e));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectionPanel);
