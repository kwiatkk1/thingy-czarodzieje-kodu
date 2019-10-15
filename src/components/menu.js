import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HighlightIcon from '@material-ui/icons/Highlight';
import { Link as RouterLink } from 'react-router-dom';

import logo from "./header-logo.png";
import ConnectButton from "./connect-button";

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

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: {
        ...theme.mixins.toolbar,
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1),
        textAlign: 'center'
    },
    toolbarImg: {
        maxHeight: '100%',
        maxWidth: '100%'
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

export default function Menu() {
    const classes = useStyles();

    return (
        <Fragment>
            <div className={classes.toolbar}>
                <img src={logo} alt="Czarodzieje Kodu" className={classes.toolbarImg} />
            </div>
            <Divider />
            <List>
                <ListItemLink to="/led" primary="01. sterowanie" secondary="Diodą" icon={<HighlightIcon />} />

                <Divider />

                <ListItemLink to="/sensor" primary="02. odczyt wartości" secondary="Czujnik wilgoci" icon={<HighlightIcon />} />

                <Divider />

                <ListItemLink to="/dino" primary="03. sterowanie grą" secondary="Dinozaur" icon={<HighlightIcon />} />
                <ListItemLink to="/ball" primary="04. sterowanie grą"  secondary="Kulka" icon={<HighlightIcon />} />

                <Divider />
            </List>
            <Divider />
        </Fragment>
    );
}

