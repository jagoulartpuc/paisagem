import React from "react";
import ImagemReferencia from "../../components/DetalhesEspecieForm/ImagemReferencia.js";
import DadosEspecie from "../../components/DetalhesEspecieForm/DadosEspecie.js";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Page from "views/Page/Page.js";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import nativa from "./nativa.png";
import exotica from "./exotica.png";
import { readE } from "services/especies/especies";
import { get } from "../../services/nomesPopulares/nomesPopulares";
import Avatar from '@material-ui/core/Avatar';
import icone from '../../components/DetalhesEspecieForm/icone.png';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListaIndividuos from "../../components/DetalhesEspecieForm/ListaIndividuos.js";
import { read } from '../../services/familia/familia';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import perene from "../../components/ListagemEspecie/perene.png";
import caduca from "../../components/ListagemEspecie/caduca.png";
import { Link } from "react-router-dom";

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
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


class DetalheEspecie extends Page {
    constructor() {
        super();
        this.state = {
            value: 0,
            nome_cientifico: '',
            nome_familia: '',
            floracao: '',
            folhagem: '',
            origem: '',
            nome_popular: [],
            potencialarq: '',
            potencialpaisag: '',
            porte: '',
            genero: '',
            populacao: '',
            foto: '',
            desenho: '',
            qtd_individuos: '',
            outono: '',
            verao: '',
            primavera: '',
            inverno: '',
            especie: {},
            individuos:[],
            individuoModal: true,
            especie: {}
        };
    }

    componentDidMount(){
            this.criaEspecie();
    }
    criaEspecie = async () => {
        var result = await readE(this.props.match.params.id);
        var resNomesPopulares = await get(this.props.match.params.id);
        var especie = result;
        console.log(especie)
        var idFamilia = especie["id_familia"]
        var resFamilia = await read(idFamilia);
        resFamilia = resFamilia.nome;
        var nomeCien = especie["nome_cientifico"]
        var folha = especie["folhagem"]
        var ori = especie["origem"]
        var potenArq = especie["descricao"]
        var potenPaisag = especie["potencialpaisag"]
        var port = especie["porte"]
        var diametro = especie["diametroCopa"]
        var tipoFruto = especie["tipoFruto"]
        var altura = especie["alturaEspecie"]
        if (especie["populacao"] == null || especie["populacao"] == "") {
            var popu = 0;
        } else {
            var popu = especie["populacao"]
        }
        var fot = await especie["foto"]
        var desen = await especie["desenho"]
        var qtdIndivi = especie["qtd_individuos"]
        var epocaFlor = [];
        var epocaFruta = [];
        if (especie["FloracaoOutono"]) {
            epocaFlor.push("Outono")
        } else {
            epocaFlor.push("")
        }

        if (especie["FloracaoVerao"]) {
            epocaFlor.push("Verão")
        }
        if (especie["FloracaoInverno"]) {
            epocaFlor.push("Inverno")
        }
        if (especie["FloracaoPrimavera"]) {
            epocaFlor.push("Primavera")
        }
        if (especie["FrutificacaoOutono"]) {
            epocaFruta.push("Outono")
        }
        if (especie["FrutificacaoVerao"]) {
            epocaFruta.push("Verão")
        }
        if (especie["FrutificacaoPrimavera"]) {
            epocaFruta.push("Primavera")
        }
        if (especie["FrutificacaoInverno"]) {
            epocaFruta.push("Inverno")
        }
        var aux = {
            resNomesPopulares,resFamilia, nomeCien, folha, ori, potenArq, potenPaisag, port, diametro, tipoFruto, altura, popu, fot, desen, qtdIndivi, epocaFlor, epocaFruta
        }
       this.setState({ especie : aux })
    }

   
 
    


    handleChange = (event, value) => {
        this.setState({ value });
    };
    authenticated = () => {
        return (
            this.unauthenticated()
        );
    }
    unauthenticated = () => {
        const { value } = this.state;
        const { classes } = this.props;
        return (
            <Grid container spacing={24}>

                <main className={classes.layout}>
                    <div className={classes.root}>
                        <h1></h1>
                        <Grid item xs={12}>
                            <AppBar position="static">
                                <Tabs value={value} onChange={this.handleChange}>
                                    <Tab label="Detalhes Espécie" />
                                    <Tab label="Potenciais" />
                                    <Tab label="Indivíduos" href="#tabs" />
                                </Tabs>
                            </AppBar>
                        </Grid>

                        <Grid item xs={12}>
                            {value === 0 && <TabContainer><Typography variant="display1" align="center">
                                <i>{this.state.nome_cientifico}</i>
                            </Typography>
                                <Grid item xs={12} sm={12}>
                                    {console.log(this.state.especie.fot)}
                                    <ImagemReferencia especie={this.state.especie} />

                                </Grid>
                                <Grid item xs={12}>
                                    <br />
                                    {
                                        (this.state.origem === "nativa")
                                            ?
                                            <img
                                                className={classes.img}
                                                src={nativa}
                                                alt="nativa"
                                                height="59" width="100"
                                            />
                                            :
                                            <img
                                                className={classes.img}
                                                src={exotica}
                                                alt="exotica"
                                                height="59" width="100"
                                            />
                                    }
                                    {this.state.flor == "perene" ? ( // verifica se é perene ou caduca
                                        <img
                                            className={classes.img}
                                            src={perene}
                                            alt="perene"
                                            height="59"
                                            width="60"
                                            title={this.state.flor}
                                        />
                                    ) : (
                                            <img
                                                className={classes.img}
                                                src={caduca}
                                                alt="caduca"
                                                height="59"
                                                width="60"
                                                title={this.state.flor}
                                            />
                                        )}
                                </Grid>

                                <DadosEspecie especie = {this.state.especie} />
                                <Link to={`/individuos/cadastro/${this.props.match.params.id}`} >
                                <Button variant="extendedFab" aria-label="Delete" className={classes.button} color="primary">
                              
                                    <AddIcon className={classes.extendedIcon} />
                                    Cadastrar Novo Indivíduo
                                </Button>
                                </Link>

                            </TabContainer>}
                            {value === 1 && <TabContainer>
                                <List>
                                    <ListItem>
                                        <Avatar>
                                            <img
                                                className={classes.img}
                                                src={icone}
                                                alt="icon"
                                                height="30" width="30"
                                            />
                                        </Avatar>
                                        <ListItemText ><Typography > <b>Potencial Arquitetônico:</b> {this.state.especie.potenArq} </Typography></ListItemText>
                                    </ListItem>
                                    <li>
                                        <Divider inset />
                                    </li>
                                    <ListItem>
                                        <Avatar>
                                            <img
                                                className={classes.img}
                                                src={icone}
                                                alt="icon"
                                                height="30" width="30"
                                            />
                                        </Avatar>
                                        <ListItemText ><Typography > <b>Descrição Geral:</b> {this.state.especie.potenPaisag}</Typography></ListItemText>
                                    </ListItem>

                                </List>
                            </TabContainer>}
                            {value === 2 && <TabContainer>

                                    <ListaIndividuos id={this.props.match.params.id} />


                            </TabContainer>}


                        </Grid>
                    </div>

                </main>
            </Grid>
        );
    }
}
DetalheEspecie.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(DetalheEspecie);

