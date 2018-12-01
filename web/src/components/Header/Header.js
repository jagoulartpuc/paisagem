import React from "react";
import logo from "./logo_ages.svg";
import "./styles.css";
import { withRouter } from "react-router-dom";
import ShutDown from "@material-ui/icons/PowerSettingsNew";
// import {show_stringify} from 'helpers/json'

// Biblioteca de Componentes
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

// Importando o Contexto de autenticação, não tratamos mais com os services.
import LoginContext from "../Context/LoginContext/LoginContext";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: null,
      render: null,
      anchorEl: null
    };
    //console.log('Show Header?', props.display)
  }

  componentWillReceiveProps(props) {
    const { display } = this.props;
    if (props.display !== display) {
      this.setState({ display: props.display });
    }
  }

  redirect = path => {
    const { history } = this.props;
    history.push(path);
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = path => {
    this.setState({ anchorEl: null }, () => {
      if (path) this.redirect(path);
    });
  };

  renderLogin = () => {
    return (
      <Button
        color="inherit"
        id="loginBtn" // Colocar ids diferentes para os automatores de software poderem encontrar esse elemento da pagina. Agradecimentos Pasquinha
        onClick={() => {
          this.redirect("/login");
        }}
      >
        <ShutDown />
        {/*Logar-se*/}
      </Button>
    );
  };

  //Passando função de logout por parametro pois ela vem do Contexto
  renderLogout = logout => {
    return (
      <Button
        color="inherit"
        id="logoutBtn"
        onClick={() => {
          logout();
          this.redirect("/");
        }}
      >
        <ShutDown />
        {/*Deslogar*/}
      </Button>
    );
  };

  render() {
    const { display, classes } = this.props;
    const { anchorEl } = this.state;
    let open = Boolean(anchorEl);

    if (display) {
      return (
        /* Chamando o Consumidor do Contexto de autencicação, para ter acesso ao state dele (pela variavel value) */
        <LoginContext.Consumer>
          {value => {
            //Abrindo a variavel value em constantes, só para facilitar o uso.
            const { isAuthenticated, userData, authService } = value;
            return (
              <div className={classes.root}>
                <AppBar position="static">
                  <Toolbar>
                    <IconButton
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="Menu"
                      onClick={this.handleMenu}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                      open={open}
                      onClose={this.handleClose}
                    >
                      <MenuItem
                        onClick={() => this.handleClose("/especies/listas")}
                      >
                        Listar Especie
                      </MenuItem>
                      <MenuItem
                        onClick={() => this.handleClose("/faleconosco")}
                      >
                        Fale Conosco
                      </MenuItem>
                      {isAuthenticated() && (
                        <MenuItem
                          onClick={() => this.handleClose("/especies/cadastro")}
                        >
                          Cadastrar Especie
                        </MenuItem>
                      )}
                      {isAuthenticated() && (
                        <MenuItem
                          onClick={() => this.handleClose("/familia/cadastro")}
                        >
                          Cadastrar Família
                        </MenuItem>
                      )}
                      {isAuthenticated() && (
                        <MenuItem
                          onClick={() => this.handleClose("/users/edit")}
                        >
                          Cadastrar Usuário
                        </MenuItem>
                      )}
                    </Menu>
                    <img
                      className={classes.menuButton + " App-logo"}
                      src={logo}
                      alt="logo"
                      onClick={() => {
                        this.redirect("/");
                      }}
                    />
                    <Typography
                      variant="title"
                      color="inherit"
                      className={classes.flex}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        onClick={() => this.redirect("/")}
                        className={classes.button}
                      >
                        Paisagem
                      </Button>
                    </Typography>
                    {/* Verificando se o usuário está logado, mais pratico que o método de usar um render no state. */}
                    {isAuthenticated()
                      ? this.renderLogout(authService.logout)
                      : this.renderLogin()}
                  </Toolbar>
                </AppBar>
              </div>
            );
          }}
        </LoginContext.Consumer>
      );
    } else {
      return <div />;
    }
  }
}

export default withStyles(styles)(withRouter(Header));
