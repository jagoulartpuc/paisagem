import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Page from "views/Page/Page.js";

import FamiliaForm from "components/CadastroFamilia/FamiliaForm.js";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { create, read } from "services/familia/familia";

const styles = theme => ({
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
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

class CadastroFamilia extends Page {
  constructor() {
    super();
    this.state = {
      familia: {
        nome : '',
        descricao : ''
    
      }
               
    };
    this.end = this.end.bind(this);
  }
  handleChange = campo => event => {
    var familia = this.state.familia;
    familia[campo] = event.target.value;
    return this.setState({ familia });
  };

  notify = (n,desc) => {
    switch(n){
      case 1 : toast.success("Familia Cadastrada com Sucesso.");
      break;
      case 2 : toast.error("Um ou mais campos não estão preenchidos.");
      break;
      case 3 : toast.dismiss();
      break;
      case 4 : toast(desc);
      break;
      default : toast("Isso foi clicado mas não fez nada.");
    }
  };

  async end() {    
      //Ainda não checa se a familia já foi cadastrada anteriormente pra notificar
      //Se feita a tentativa de colocar uma familia com mesmo nome, apresenta que foi cadastrada mas não cadastra de fato
      //Necessário fazer varredura no banco pelo nome
      if(this.state.familia.nome!='' && this.state.familia.descricao!=''){//checa se os campos foram preenchidos, se foram tenta criar
        var result = await create(this.state.familia);
       // if(fetch('/api/familias').catch(read(39))){
         // this.notify(4,"caraiba");
          this.notify(3);// limpa notificação anterior
          this.notify(1);// mostra que foi cadastrado com sucesso
          result = null; // zera a variavel(pode ser desnecessário, nao está sendo usada ainda)
        //}
        //else{
        //  this.notify();
        //}
      }
      else{ // retorna erro se os campos não foram preenchidos
        this.notify(3); // limpa notificação anterior
        this.notify(2); // notifica que não foi adicionado por falta de campos preenchidos
      }
      

    }

  //Authenticated padrão do resto do sistema
  authenticated = () => {
    const { classes } = this.props;

    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="display1" align="center">
            Cadastro de Familia
          </Typography>
          <FamiliaForm
            key="Familias"
            onSubmit={this.end}
            onChangeNome={this.handleChange("nome")}
            onChangeDescricao={this.handleChange("descricao")}
          />
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={true}
                  pauseOnVisibilityChange
                  draggable
                  pauseOnHover
                  />
                  {/* Same as */}
              <ToastContainer />
        </Paper>
      </main>
    );
  };
}

CadastroFamilia.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CadastroFamilia);
