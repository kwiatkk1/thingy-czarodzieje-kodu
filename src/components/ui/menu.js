import React, {Fragment} from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Link as RouterLink} from "react-router-dom";

import logo from "assets/czarodzieje-logo.png";

function ListItemLink(props) {
  const { icon, primary, secondary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
        // See https://github.com/ReactTraining/react-router/issues/6056
        <RouterLink to={to} {...itemProps} innerRef={ref} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} secondary={secondary} />
      </ListItem>
    </li>
  );
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    textAlign: "center"
  },
  toolbarImg: {
    maxHeight: "100%",
    maxWidth: "100%"
  },
}));

export default function Menu(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.toolbar}>
        <img src={logo} alt="Czarodzieje Kodu" className={classes.toolbarImg} />
      </div>
      <Divider />
      <List>
        {props.items.map(item => <ListItemLink key={item.path} to={item.path} primary={item.primary} secondary={item.secondary} />)}
        <Divider />
      </List>
    </Fragment>
  );
}

