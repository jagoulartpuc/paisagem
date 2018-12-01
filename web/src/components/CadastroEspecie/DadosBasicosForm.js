import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 5
  },

  RemoveNome: {
    marginLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },

  AddNome: {
    marginTop: theme.spacing.unit * 2
  }
});
const origem = [
  {
    value: "",
    label: "Origem da Espécie *"
  },
  {
    value: "nativa",
    label: "Nativa do Rio Grande do Sul"
  },
  {
    value: "exotica",
    label: "Exótica"
  }
];

const porte = [
  {
    value: "",
    label: "Porte da Espécie"
  },
  {
    value: "pequena",
    label: "Pequena"
  },
  {
    value: "media",
    label: "Média"
  },
  {
    value: "grande",
    label: "Grande"
  }
];

const frutificacao = [
  {
    value: "n/a",
    label: "Frutificação"
  },
  {
    value: "n/a",
    label: "Não possui"
  },
  {
    value: "carnosa",
    label: "Carnosa"
  },
  {
    value: "seco",
    label: "Seco"
  }
];

const classificacao = [
  {
    value: "",
    label: "Classificação/extrato"
  },
  {
    value: "Arborea-arvore",
    label: "Arbórea - Árvore"
  },
  {
    value: "Arborea-Palmeira",
    label: "Arborea - Palmeira"
  },
  {
    value: "Arborea-Conifera",
    label: "Arbórea - Conifera"
  },
  {
    value: "trepadeira",
    label: "Trepadeira"
  },
  {
    value: "herbacea",
    label: "Herbácea"
  },
  {
    value: "herbacea-forracao",
    label: "Herbácea - Forracao"
  },
  {
    value: "herbacea-pisovegetal",
    label: "Herbácea - Piso Vegetal"
  }
];

const folhagem = [
  {
    value: "",
    label: "Tipo de Folhagem"
  },
  {
    value: "caduca",
    label: "Caduca"
  },
  {
    value: "perene",
    label: "Perene"
  }
];

class DadosBasicosForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    nomeCientificoIsEmpty: false, //Status do campo nomeCientifico
    familiaIsEmpty: false, //Status do campo
    origemIsEmpty: false,
    isEmpty: false,
    check: false,
    change: false,
    frutificacao: false,
    floracao: false
  };

  handleSubmit(evt) {
    this.state.check = true;
    this.checkAllInputs(false);
    evt.preventDefault();
    this.props.onSubmit(this.state.isEmpty);
  }

  handleFrutificacao = () => {
    this.setState(state => {
      return {
        frutificacao: !state.frutificacao
      };
    });
  };

  handleFloracao = () => {
    this.setState(state => {
      return {
        floracao: !state.floracao
      };
    });
  };

  completeField = 0;
  checkAllInputs(b) {
    this.completeField = 0;
    if (this.state.check) {
      //nomeCientifico
      if (
        this.props.nomeCientifico == "" ||
        this.props.nomeCientifico == null ||
        this.props.nomeCientifico == undefined
      ) {
        this.state.isEmpty = true;
        if (b == false) {
          this.setState({ nomeCientificoIsEmpty: true });
        } else {
          this.state.nomeCientificoIsEmpty = true;
        }
      } else {
        this.completeField++;
        if (b == false) {
          this.setState({ nomeCientificoIsEmpty: false });
        } else {
          this.state.nomeCientificoIsEmpty = false;
        }
      }
      //familia
      if (
        this.props.familia == "" ||
        this.props.familia == null ||
        this.props.familia == undefined ||
        this.props.familia == -1
      ) {
        console.log(this.props.familia);
        console.log(this.props.familiaList);
        this.state.isEmpty = true;
        if (b == false) {
          this.setState({ familiaIsEmpty: true });
        } else {
          this.state.familiaIsEmpty = true;
        }
      } else {
        this.completeField++;
        if (b == false) {
          this.setState({ familiaIsEmpty: false });
        } else {
          this.state.familiaIsEmpty = false;
        }
      }
      //origem
      if (
        this.props.origem == "" ||
        this.props.origem == null ||
        this.props.origem == undefined
      ) {
        this.state.isEmpty = true;
        if (b == false) {
          this.setState({ origemIsEmpty: true });
        } else {
          this.state.origemIsEmpty = true;
        }
      } else {
        this.completeField++;
        if (b == false) {
          this.setState({ origemIsEmpty: false });
        } else {
          this.state.origemIsEmpty = false;
        }
      }
      //checa se todos estão completos
      if (this.completeField == 3) {
        this.state.isEmpty = false;
      }
    }
  }

  //parte victoria
  handleFrutificacao = () => {
    this.setState(state => {
      return {
        frutificacao: !state.frutificacao
      };
    });
  };

  handleFloracao = () => {
    this.setState(state => {
      return {
        floracao: !state.floracao
      };
    });
  };
  //-------
  handleAddNomePopularOps(idx){
    this.props.handleAddNomePopular;
    this.props.handleRemoveNomePopular(idx);
  }

  render() {
    const { classes } = this.props;
    this.checkAllInputs(true);
    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>
          Dados Básicos
        </Typography>
        <Typography variant="caption" gutterBottom>
          Uma espécie precisa de alguns dados básicos para ser cadastrada,
          descreva-os aqui!
        </Typography>

        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <TextField
                id="nomeCientifico"
                required
                //check={}
                error={this.state.nomeCientificoIsEmpty}
                name="nomeCientifico"
                label="Nome Científico"
                // TODO: Arrumar inconsistencia com os nome (usar ou "nomeCientifico" ou "nome_cientifico")
                value={this.props.nomeCientifico}
                onChange={this.props.onChange("nome_cientifico")}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="Familia"
                value={this.props.familia}
                select
                fullWidth
                required
                error={this.state.familiaIsEmpty}
                onChange={this.props.onChange("id_familia")}
                SelectProps={{ native: true }}
                margin="normal"
              >
                {this.props.familiaList.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
              

            <Grid item xs={6}>
              <TextField
                id="origem"
                value={this.props.origem}
                select
                fullWidth
                required
                error={this.state.origemIsEmpty}
                onChange={this.props.onChange("origem")}
                SelectProps={{ native: true }}
                margin="normal"
              >
                {origem.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="porte"
                value={this.props.porte}
                select
                fullWidth
                onChange={this.props.onChange("porte")}
                SelectProps={{ native: true }}
                margin="normal"
              >
                {porte.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="classificacao"
                select
                value={this.props.classificacao}
                onChange={this.props.onChange("classificacao")}
                fullWidth
                SelectProps={{ native: true }}
                margin="normal"
              >
                {classificacao.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="folhagem"
                select
                onChange={this.props.onChange("folhagem")}
                fullWidth
                value={this.props.folhagem}
                SelectProps={{ native: true }}
                margin="normal"
              >
                {folhagem.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="tipoFruto"
                select
                onChange={this.props.onChange("tipoFruto")}
                fullWidth
                value={this.props.tipoFruto}
                SelectProps={{ native: true }}
                margin="normal"
              >
                {frutificacao.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="diametroCopa"
                name="diametroCopa"
                label="Diâmetro Copa"
                value={this.props.diametroCopa}
                onChange={this.props.onChange("diametroCopa")}
                fullWidth
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="alturaEspecie"
                name="alturaEspecie"
                label="Altura Espécie"
                value={this.props.alturaEspecie}
                onChange={this.props.onChange("alturaEspecie")}
                fullWidth
              />
            </Grid>
                
                
            <Grid item xs={1} sm={6}>

              {this.props.nomePopular.map((nomesPopulares, idx) => {
                return <div className="nomesPopulares" key={idx}>
                  <TextField
                    placeholder={`Nome Popular (${idx + 1}) `}
                    value={nomesPopulares.nome}
                    onChange={this.props.handleNomePopularChange(idx)}
                  />
                  <IconButton

                    onClick={this.props.handleRemoveNomePopular(idx)}
                    className={classes.RemoveNome}
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
              })}
              <Button
                onClick={this.props.handleAddNomePopular}
                variant="contained"
                className={classes.AddNome}

              >
                Adicionar Nome Popular
              </Button>

            </Grid>
          </Grid>


          <Grid container spacing={24}>
            <Grid item xs={24}>
              <Button
                onClick={this.handleFrutificacao}
                variant="contained"
                className={classes.AddNome}
              >
                {this.state.frutificacao
                  ? "Remover Frutificação"
                  : "Frutificação da Espécie"}
              </Button>
            </Grid>

            {this.state.frutificacao && (
              <Grid item xs={24}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    Selecione o período de Frutificação da espécie
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="1"
                          checked={this.props.frutificacaoOutono}
                          onChange={
                            this.props.onChange("FrutificacaoOutono")
                          }
                        />
                      }
                      label="Outono"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="1"
                          checked={this.props.frutificacaoVerao}
                          onChange={
                            this.props.onChange("FrutificacaoVerao")
                          }
                        />
                      }
                      label="Verão"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="1"
                          checked={this.props.frutificacaoInverno}
                          onChange={
                            this.props.onChange("FrutificacaoInverno")
                          }
                        />
                      }
                      label="Inverno"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.props.frutificacaoPrimavera}
                          onChange={
                            this.props.onChange("FrutificacaoPrimavera")
                          }
                          value="1"
                        />
                      }
                      label="Primavera"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            )}
          </Grid>

          <Grid container spacing={24}>
            <Grid item xs={24}>
              <Button
                onClick={this.handleFloracao}
                variant="contained"
                className={classes.AddNome}
              >
                {this.state.floracao
                  ? "Remover Floração"
                  : "Floração da Espécie"}
              </Button>
            </Grid>

            {this.state.floracao && (
              <Grid item xs={24}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    Selecione o período de Floração da Espécie
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.props.floracaoOutono}
                          value="1"
                          onChange={this.props.onChange("FloracaoOutono")}
                        />
                      }
                      label="Outono"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.props.floracaoVerao}
                          value="1"
                          onChange={this.props.onChange("FloracaoVerao")}
                        />
                      }
                      label="Verão"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.props.floracaoInverno}
                          onChange={
                            this.props.onChange("FloracaoInverno")
                          }
                          value="1"
                        />
                      }
                      label="Inverno"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.props.floracaoPrimavera}
                          onChange={
                            this.props.onChange("FloracaoPrimavera")
                          }
                          value="1"
                        />
                      }
                      label="Primavera"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            )}
          </Grid>

          <Grid container spacing={24}>
            <Grid item xs={6} />
            <Grid item xs={6}>
              <Button
                id="next"
                onClick={e => this.handleSubmit(e)}
                variant="contained"
                color="primary"
              >
                PROXIMO
              </Button>
            </Grid>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(DadosBasicosForm);
