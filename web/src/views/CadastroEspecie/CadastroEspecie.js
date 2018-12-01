import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import Page from "views/Page/Page.js";

import DadosBasicosForm from "components/CadastroEspecie/DadosBasicosForm.js";
import PotenciaisForm from "components/CadastroEspecie/PotenciaisForm.js";
import ImageForm from "components/CadastroEspecie/ImageForm.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { listAll } from "../../services/familia/familia";

import { create } from "services/especies/especies";
import { upload } from "services/uploadImg/uploadImagem";

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
  }
});

const steps = ["Dados", "Potencial", "Imagens"];

class CadastroEspecie extends Page {
  constructor() {
    super();
    this.state = {
      step: 0,
      familias: [],
      nome_cientifico: "",
      especie: {
        desenho: "", //path do desenho
        imagem: "", //path da imagem
        nomePopular: [
          {
            nome: ""
          }
        ]
      }
    };
    this.initialState = this.state;
    this.goToNext = this.goToNext.bind(this);
    this.goToBack = this.goToBack.bind(this);
  }

  componentDidMount() {
    this.fillFamilias();
  }

  fillFamilias = async () => {
    var result = await listAll();
    result = result.data;
    var familias = [{ value: -1, label: "Família *" }];

    if (result && result.length > 0) {
      result.map(e => {
        var value = e["id_familia"];
        var label = e["nome"];

        var familia = {
          value,
          label
        };

        familias.push(familia);
      });
    }
    //console.log(familias);
    //console.log(this.state.familias);
    this.setState({ familias });
  };

  getStep(step) {
    switch (step) {
      case 0:
        return (
          <DadosBasicosForm
            key="Dados"
            onSubmit={this.goToNext}
            // Begin Dados básicos
            familiaList={this.state.familias}
            step={this.state.step}
            nomeCientifico={this.state.especie.nome_cientifico}
            nomePopular={this.state.especie.nomePopular}
            familia={this.state.especie.id_familia}
            origem={this.state.especie.origem}
            porte={this.state.especie.porte}
            classificacao={this.state.especie.classificacao}
            folhagem={this.state.especie.folhagem}
            tipoFruto={this.state.especie.tipoFruto}
            diametroCopa={this.state.especie.diametroCopa}
            alturaEspecie={this.state.especie.alturaEspecie}
            // Begin dados Floração
            floracaoOutono={this.state.especie.FloracaoOutono}
            floracaoVerao={this.state.especie.FloracaoVerao}
            floracaoInverno={this.state.especie.FloracaoInverno}
            floracaoPrimavera={this.state.especie.FloracaoPrimavera}
            // Begin dados Frutificação
            frutificacaoOutono={this.state.especie.FrutificacaoOutono}
            frutificacaoVerao={this.state.especie.FrutificacaoVerao}
            frutificacaoInverno={this.state.especie.FrutificacaoInverno}
            frutificacaoPrimavera={this.state.especie.FrutificacaoPrimavera}
            // Begin Handlers
            onChange={this.handleChange}
            handleNomePopularChange={this.handleNomePopularChange}
            handleAddNomePopular={this.handleAddNomePopular}
            handleRemoveNomePopular={this.handleRemoveNomePopular}
            handleFrutificacao={this.handleFrutificacao}
            handleFloracao={this.handleFloracao}
          />
        );
      case 1:
        return (
          <PotenciaisForm
            key="Potenciais"
            onSubmit={this.goToNext}
            potencialpaisag={this.state.especie.potencialpaisag}
            descricao={this.state.especie.descricao}
            onBack={this.goToBack}
            onChange={this.handleChange}
          />
        );
      case 2:
        return (
          <ImageForm
            key="ImgUpLoad"
            notify={this.notify}
            onBack={this.goToBack}
            onSubmit={this.goToNext}
            handleChangeImage={this.handleChangeImage}
          />
        );
      case 3: {
      }
      default:
        console.log("Step extrapolado");
    }
  }
  notify(n, desc){
    switch (n) {
      case 1:
        toast.success("Especie Cadastrada com Sucesso.");
        break;
      case 2:
        toast.error("Um ou mais campos não estão preenchidos.");
        break;
      case 3:
        toast.dismiss();
        break;
      case 4:
        toast.error(desc);
        break;
      default:
        toast("Isso foi clicado mas não fez nada.");
    }
  };

  //isEmpty = false;

  clearForm(){
    this.componentDidMount();
    this.setState(this.initialState);
  }
  
  async goToNext(isEmpty) {
    const { step } = this.state;
    if (step !== 2) {
      //Adicionou o this.renderAuthentication pq triamos probçema mudando de passo
      if (isEmpty) {
        this.notify(2);
      } else {
        this.setState({ step: step + 1 });
      }
    } else {
      var especie = this.state.especie;
      especie["foto"] = await upload(this.state.imagem);;
      especie["desenho"] = await upload(this.state.desenho);;
      
      this.setState({especie}, () => {
        this.salvaEspecie().catch(e => {
          this.notify("Erro ao Salvar");
        });
      }); 
    }
  }
  async salvaEspecie(){
    await create(this.state.especie)
    this.notify(1);
  }
  goToBack() {
    const { step } = this.state;
    if (step !== 0) {
      this.setState({
        step: step - 1
      });
    }
  }

  handleChange = campo => event => {
    var especie = this.state.especie;
    especie[campo] = event.target.value;
    return this.setState({
      especie
    });
  };

  handleChangeImage = imgState => {
    var state = this.state;

    if (imgState.get("tipo") == "imagem") {
      state["imagem"] = imgState;
    } else {
      state["desenho"] = imgState;
    }

    this.setState({ state });
  };

  //Nomes populares
  handleNomePopularChange = idx => evt => {
    var especie = this.state.especie;
    const nomesPopulares = this.state.especie.nomePopular.map(
      (nomePop, sidx) => {
        if (idx !== sidx) return nomePop;
        else
        return {
          nome: evt.target.value
        };
      }
    );
    especie["nomePopular"] = nomesPopulares;
    this.setState({
      especie
    });
  };

  handleAddNomePopular = () => {
    var especie = this.state.especie;
    especie["nomePopular"] = this.state.especie.nomePopular.concat([
      {
        nome: ""
      }
    ]);
    this.setState({
      especie
    });
  };

  handleRemoveNomePopular = idx => () => {
    var especie = this.state.especie;
    especie["nomePopular"] = this.state.especie.nomePopular.filter(
      (s, sidx) => idx !== sidx
    );
    this.setState({
      especie
    });
  };

  //Alterando para Authenticated pra manter o padrão do resto do sistema.
  authenticated = () => {
    const { classes } = this.props;

    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="display1" align="center">
            Cadastro de Espécie
          </Typography>
          <Stepper activeStep={this.state.step} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel> {label} </StepLabel>
              </Step>
            ))}
          </Stepper>
          {this.getStep(this.state.step)}
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
CadastroEspecie.propTypes = { classes: PropTypes.object.isRequired };
export default withStyles(styles)(CadastroEspecie);
