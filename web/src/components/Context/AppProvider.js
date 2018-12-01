import React, { Component } from "react";

// Utilizando .js no import pois o contexto não é uma classe
import AppContext from "./AppContext.js";

// Importando outros provedores de contexto para utilizar um só no arquivo index.js.
import LoginProvider from "./LoginContext/LoginProvider.js";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "./../AlertDialog/Snackbars";

class AppProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerVisible: true,
      isLoaded: true,
      setLoaded: isLoaded => {
        this.setState({ isLoaded });
      },

      //Snackbar = mensagens apresentadas ao usuário.
      snackbar: null,
      //Função para apresentar mensagem aos usuários.
      setSnackbar: this.setSnackbar
    };
  }

  //Função para apresentar mensagem aos usuários.
  setSnackbar = ({ message = "", variant = "info" }) => {
    this.setState({
      snackbar: (
        <SnackbarContentWrapper
          onClose={this.closeSnackbar}
          variant={variant}
          message={message}
        />
      )
    });
  };

  //Função responsavel por fechar a mensagem ao usuário
  closeSnackbar = () => {
    this.setState({ snackbar: null });
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {/* Passando a função de snackbar de login 
        para evitar ter que acessar o contexto 
        dentro do outro provider */}
        <LoginProvider setSnackbar={this.state.setSnackbar}>
          {/* Renderiza os snacksbar na tela. */}
          <Snackbar
            open={Boolean(this.state.snackbar)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            onClose={this.closeSnackbar}
            autoHideDuration={6000}
          >
            {this.state.snackbar}
          </Snackbar>
          {this.props.children}
        </LoginProvider>
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
