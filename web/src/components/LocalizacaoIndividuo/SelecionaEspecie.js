import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import Page from "views/Page/Page.js";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { listAll } from "services/especies/especies";
import { Grid } from "@material-ui/core";

const styles = theme => ({
  layout: {
    width: "100%",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(900 + theme.spacing.unit * 2 * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  },
  formControl:{ width: "100%"}
});

class SelecionaEspecie extends Component {
  constructor(props) {
    super(props);
    this.state
  }
  //Alterando para Authenticated pra manter o padrão do resto do sistema.

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.onSubmit();
  }



  onBack() {
    const { step } = this.state;
    if (step !== 0) {
      //Adicionou o this.renderAuthentication pq triamos probçema mudando de passo
      this.setState({ step: step - 1 });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root} spacing={24}>
      <main className={classes.layout}>
        <div style={{ justify: 'center' }}>
          <FormControl className={classes.formControl}
            margin="normal"
            fullWidth="true">
          <Grid item xs={12}>
              <TextField
                id="Familia"
                value={this.props.especie}
                select
                required
                //error={this.state.familiaIsEmpty}
                onChange={this.props.onChange("id_especie")}
                SelectProps={{ native: true }}
                margin="normal"
              >
                {this.props.especiesList.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </FormControl>
          <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item xs={6} >
                  <Button
                    id="back"
                    onClick={() => this.props.onBack()}
                    variant="contained"

                  //color="primary"
                  >
                    Voltar
            </Button>
                </Grid>

                <Grid item xs={6}>
                  <Button
                    id="next"
                    onClick={() => this.props.onSubmit()}
                    variant="contained"

                    color="primary"
                  >
                    Próximo
            </Button>
                </Grid>
              </Grid>
            </Grid>

        </div>
      </main>
      </Grid>
    );
  };
}


SelecionaEspecie.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelecionaEspecie);
