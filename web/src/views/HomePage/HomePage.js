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

class HomePage extends Page {
  constructor(props) {
    super(props);
  }

  authenticated = () => {
    const { classes } = this.props;

    return (
      <div
        style={{
          height: "100%",
          backgroundImage: `url(${img})`
        }}
      >
        <main className={classes.layout}>
          <Grid container spacing={15}>
            <Grid item xs={12} sm={12}>
              <Paper className={classes.paper}>
                <Grid item xs={12}>
                  <img className={classes.logo} src={require("./logo2.PNG")} />
                  {/* <Typography variant="display3" align="center" color="grey">
                    O que é o projeto Paisagem
                  </Typography>
                  <br /> */}

                  <Typography
                    variant="Headline"
                    align="justify"
                    color="textSecondary"
                  >
                    O projeto Paisagem surgiu a partir de uma demanda da
                    professora Drª.Maria Alice Medeiros Dias do curso de
                    Arquitetura e Urbanismo da Escola Politécnica da PUCRS,tendo
                    ela notado a necessidade de um sistema que seria um
                    facilitador para o mapeamento da flora e também com o
                    intuito de trazer uma maior visibilidade e acessibilidade a
                    área de pesquisa sobre Paisagismo, tanto para especialistas
                    quanto para interessados no assunto. Inicialmente o sistema
                    web responsivo terá funcionalidades para facilitar a
                    localização e mapeamento de espécies de plantas na PUCRS.
                    Cada uma das plantas estará especificada no sistema com suas
                    características, informações e geolocalização no campus.
                    Mais informações das funcionalidades que estarão disponíveis
                    no sistema podem ser encontradas na pagina de Requisitos. O
                    projeto Paisagem teve inicio na disciplina Prática na
                    Agência Experimental de Engenharia de Software, do curso de
                    bacharelado em Engenharia de Software da Escola Politécnica
                    da PUCRS, em 2018/2 com previsão de conclusão ao final do
                    semestre.
                  </Typography>
                </Grid>
                <br />
                <br />
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      onClick={() => this.redirect("/especies/listas")}
                      className={classes.button}
                    >
                      Listagem de Especie
                  </Button>
                  </Grid>
                  <Grid item xs={6}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => this.redirect("/especies/cadastro")}
                    className={classes.button}
                  >
                    Cadastro de Espécies
                  </Button>
                  </Grid>
                  <Grid item xs={6}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => this.redirect("/familia/cadastro")}
                    className={classes.button}
                  >
                    Cadastro de Famílias
                  </Button>
                  </Grid>
                  <Grid item xs={6}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => this.redirect("/users/edit")}
                    className={classes.button}
                  >
                    Cadastro de Usuário
                  </Button>


                    <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => this.redirect("/users/list")}
                    className={classes.button}
                  >
                    Listagem de Usuário
                  </Button>
                

                  </Grid>
                  <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => this.redirect("/individuos/cadastro")}
                    className={classes.button}
                  >
                    Cadastro de Indivíduo
                  </Button>
                  </Grid>
                </Grid>

              </Paper>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  };

  //Teste
  unauthenticated = () => {
    const { classes } = this.props;

    return (
      <div
        style={{
          height: "100%",
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
                    O que é o projeto Paisagem
                  </Typography>
                  <br />

                  <Typography
                    variant="Headline"
                    align="justify"
                    color="primary"
                  >
                    O projeto Paisagem surgiu a partir de uma demanda da
                    professora Drª.Maria Alice Medeiros Dias do curso de
                    Arquitetura e Urbanismo da Escola Politécnica da PUCRS,tendo
                    ela notado a necessidade de um sistema que seria um
                    facilitador para o mapeamento da flora e também com o
                    intuito de trazer uma maior visibilidade e acessibilidade a
                    área de pesquisa sobre Paisagismo, tanto para especialistas
                    quanto para interessados no assunto. Inicialmente o sistema
                    web responsivo terá funcionalidades para facilitar a
                    localização e mapeamento de espécies de plantas na PUCRS.
                    Cada uma das plantas estará especificada no sistema com suas
                    características, informações e geolocalização no campus.
                    Mais informações das funcionalidades que estarão disponíveis
                    no sistema podem ser encontradas na pagina de Requisitos. O
                    projeto Paisagem teve inicio na disciplina Prática na
                    Agência Experimental de Engenharia de Software, do curso de
                    bacharelado em Engenharia de Software da Escola Politécnica
                    da PUCRS, em 2018/2 com previsão de conclusão ao final do
                    semestre.
                  </Typography>
                </Grid>
                <br />
                <br />
                <div>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => this.redirect("/login")}
                    className={classes.button}
                  >
                    login
                  </Button>



                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => this.redirect("/especies/listas")}
                    className={classes.button}
                  >
                    Listagem de Especie
                  </Button>


                </div>
              </Paper>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  };
}

export default withStyles(styles)(HomePage);
