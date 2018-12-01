import React from "react";
//import "./styles.css";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";

// import {show_stringify} from 'helpers/json'

import { withRouter } from "react-router-dom";

// Importando o Contexto de autenticação, não tratamos mais com os services.
import LoginContext from "../Context/LoginContext/LoginContext";
import img from "./loginImg.jpg";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3
  },
  input: {
    display: "none"
  },

  paper: {
    marginTop: theme.spacing.unit * 12,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
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

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // Passando a função de login por parametro pois ela vem do contexto
  async onSubmit(loginMethod) {
    const { username, password } = this.state;
    const loginAttempt = await loginMethod(username, password, false);

    if (loginAttempt) {
      if (loginAttempt.statusCode !== 200) {
        // status code OK
        const { history } = this.props;
        history.push("/");
        return true;
      } else {
        await this.setState({ errors: { username: true, password: true } });
        return false;
      }
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { username, password, errors } = this.state;
    const { classes } = this.props;

    return (
      <LoginContext.Consumer>
        {value => {
          const { authService } = value;
          return (
            <div
              style={{
                height: "94vh",
                backgroundImage: `url(${img})`
              }}
            >
              <main className={classes.layout}>
                <Grid container spacing={15}>
                  <Grid item xs={12} sm={12}>
                    <Paper className={classes.paper}>
                      <Typography
                        variant="display2"
                        gutterBottom
                        color="primary"
                      >
                        Login
                      </Typography>

                      <Grid item xs={12}>
                        <TextField
                          id="username"
                          className="input"
                          name="username"
                          label="Usuário"
                          onChange={this.onChange}
                          error={errors.username}
                          valume={username}
                          //Handler para logar ao apertar enter
                          onKeyPress={e =>
                            e.key === "Enter"
                              ? this.onSubmit(authService.login)
                              : null
                          }
                        />

                        <br />
                        <TextField
                          id="senha"
                          className="input"
                          name="password"
                          label="Senha"
                          onChange={this.onChange}
                          value={password}
                          error={errors.password}
                          type="password"
                          //Handler para logar ao apertar enter
                          onKeyPress={e =>
                            e.key === "Enter"
                              ? this.onSubmit(authService.login)
                              : null
                          }
                        />
                        <br />
                        <Button
                          className={classes.button}
                          variant="contained"
                          color="primary"
                          onClick={() => this.onSubmit(authService.login)}
                        >
                          Fazer login
                        </Button>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </main>
            </div>
          );
        }}
      </LoginContext.Consumer>
    );
  }
}

export default withRouter(withStyles(styles)(LoginForm));
