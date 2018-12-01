import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Page from "views/Page/Page.js";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '880px',
        backgroundColor: theme.palette.background.paper,
    },
});

class ListagemUser extends Page {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (

            <div className={classes.root}>
              
                {this.props.usuarios.map(infos => (
                    <List component="nav">
                        <Grid container spacing={64}>
                        <Grid item xs={12} sm={20}>
                            <ListItem>
                            <Typography variant="h7" color="primary">
                             Nome:
                            </Typography>
                                <ListItemText primary={infos.nome}/>
                            <Typography variant="h7" color="primary">
                             E-mail:
                            </Typography>
                                <ListItemText primary={infos.email} />
                            <Typography variant="h7" color="primary">
                             Usuário:
                            </Typography>
                                <ListItemText primary={infos.username} />
                            <Typography variant="h7" color="primary">
                             Cargo:
                            </Typography>
                                <ListItemText primary={infos.cargo} />
                                

 
                                
                            </ListItem>
                            </Grid>
                            </Grid>
                        <Divider />
                    </List>
                ))}
            </div>
        );
    }
}
ListagemUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListagemUser);