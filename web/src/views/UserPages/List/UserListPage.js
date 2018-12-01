import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Page from "views/Page/Page.js";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ListIcon from "@material-ui/icons/List";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import Input from "@material-ui/core/Input";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { listAll } from "services/user/user";
import ListagemUser from "components/ListagemUser/ListagemUser";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(900 + theme.spacing.unit * 2 * 2)]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  grow: {
    flexGrow: 1
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 6 * 4)]: {
      marginTop: theme.spacing.unit * 7,
      marginBottom: theme.spacing.unit * 7,
      padding: theme.spacing.unit * 0.2
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  cardGrid: {
    padding: theme.spacing.unit * 1
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  buttonSee: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    height: "10%",
    width: "25%",
    align: "center"
  },
  chip: {
    margin: theme.spacing.unit
  }
});

//const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; //esse cards é temporario

class UserListPage extends Page {
  constructor() {
    super();
    this.state = {
     usuarios: [],
     filter: "" 
    };
  }

  componentDidMount() {
    this.listaUsuario();
  }

  

  filter = e => {
    var nome = e.target.value;
    if (nome) {
      this.setState(state => {
        return {
          usuarios: state.usuariosAll.filter(item => {
            return (
              (item.nome.startsWith(nome)
                ));
            
          })
        };
      });
    } else this.resetFilter();
  };

  resetFilter = () => {
    this.setState(state => {
      return { usuarios: state.usuariosAll };
    });
  };

  listaUsuario = async () => {
    var result = await listAll();
    result = result.data;
    console.log("listausuarios");
    console.log(result);
    var usuarios = [];
    if (result && result.length > 0) {
      result.map(e => {
        var nome = e["nome"];
        var email = e["email"];
        var cargo = e["cargo"];
        var username = e["username"];

        var usuario = {
          nome,
          cargo,
          email,
          username
        };
        usuarios.push(usuario)
        
      });
    }
    this.setState({
      usuarios
    });
    console.log("teste",this.state)
  };

  authenticated = () => {
    return this.unauthenticated();
  };

  //Alterando para Authenticated pra manter o padrão do resto do sistema.
  unauthenticated = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            {/* Hero unit */}
            <div className={classes.heroUnit}>
              <div className={classes.heroContent}>
                <br />
                <Typography variant="display1" color="primary" align="center">
                  Listagem de Usuários
                </Typography>
                <br />
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <div className={classes.grow} />
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                       
                      </div>
                      
                     
                    </div>
                  </Grid>
                 
                </Grid>
              </div>
            </div>
            <div className={classNames(classes.layout, classes.cardGrid)}>
            
                <ListagemUser usuarios={this.state.usuarios} />  
                
              

              <div className={classes.heroButtons} />
            </div>
            
          </Paper> 
          {
          console.log("jjj",this.state)}
        </main>
      </React.Fragment>
    );
  };
}

UserListPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserListPage);
