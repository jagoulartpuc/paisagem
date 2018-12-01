import React from "react";

import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
// Biblioteca de Componentes
//&
// Views
import Page from "views/Page/Page";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import img from "./paisagem.jpeg";

//import logo from "./logo.jpg"

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  logo: {
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 12,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 8,
      marginBottom: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 8
    }
  },

  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(900 + theme.spacing.unit * 2 * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },

  typography: {}
});

class FaleConosco extends Page {
  constructor(props) {
    super(props);
  }

  authenticated = () => {
    return(
      this.unauthenticated()
    );
  };

  //Teste
  unauthenticated = () => {
    const { classes } = this.props;

    return (
      <div
      style={{
        height: "100vh",
        width: "99.4vw",
        backgroundImage: `url(${img})`
      }}
      
    >
      <main className={classes.layout}>
        <Grid container spacing={15}>
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>
              <Grid item xs={12}>
                <img className={classes.logo} src={require("./logo2.PNG")} />
                <Typography variant="display3" align="center" color="primary">
                  Fale Conosco
                </Typography>
                <br />

                <Typography
                  variant="Headline"
                  align="justify"
                  color="primary"
                >
                  Sinta-se a vontade para nos contatar caso possua alguma sugestão de
                  melhoria ou correção por meio do nosso email:
                  <br />
                  <br />

                  <center>paisagem.projeto@gmail.com</center>
                  {/*A senha desse email é projetopaisagem123*/}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </main>
    </div>
    );
  };
}

export default withStyles(styles)(FaleConosco);
