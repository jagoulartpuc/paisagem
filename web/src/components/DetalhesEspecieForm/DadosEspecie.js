import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import icone from './icone.png';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles = theme => ({
    button: {
        marginTop: theme.spacing.unit * 5
    },
    root: {
        overflow: 'hidden',
        padding: `0 ${theme.spacing.unit * 3}px`,
    },
    wrapper: {
        maxWidth: 400,
    },
    paper: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
    },
});
const origem = [
    {
        value: "",
        label: "Origem da Espécie"
    },
    {
        value: "n",
        label: "Nativa"
    },
    {
        value: "e",
        label: "Exótica"
    }
];

const folhagem = [
    {
        value: "",
        label: "Tipo de Folhagem"
    },
    {
        value: "c",
        label: "Caduca"
    },
    {
        value: "p",
        label: "Perene"
    }
];
const familia = [
    {
        value: "",
        label: "Família"
    },
    {
        value: "Acanthaceae‎",
        label: "Acanthaceae‎"
    },
    {
        value: "Blandfordiaceae‎",
        label: "Blandfordiaceae‎"
    }
];


class DadosEspecie extends React.Component {
    constructor() {
        super();
        this.state = {
            nomePopular: [],

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        outono: false,
        primavera: false,
        verao: false,
        inverno: false,
    };

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.onSubmit();
    }

    componentDidMount() {
        console.log(this.props.nome_popular)

    }
    render() {
        const { classes } = this.props;
        const { outono, verao, primavera, inverno } = this.state;
        const message = "TEste";
        console.log(this.props.especie)

        return (
            <div className={classes.root}>
                <List>
                    <ListItem>
                        <Avatar>
                            <img
                                className={classes.img}
                                src={icone}
                                alt="nativa"
                                height="30" width="30"
                            />
                        </Avatar>
                        <ListItemText ><Typography noWrap> <b>Nome Popular: </b> {this.props.especie.resNomesPopulares != undefined && this.props.especie.resNomesPopulares != ""?this.props.especie.resNomesPopulares.map((nome) => <Typography noWrap key={nome}> {nome}</Typography>):""} </Typography> </ListItemText>
                    </ListItem>
                    <li>
                        <Divider inset />
                    </li>
                    <ListItem>
                        <Avatar>
                            <img
                                className={classes.img}
                                src={icone}
                                alt="nativa"
                                height="30" width="30"
                            />
                        </Avatar>
                        <ListItemText ><Typography noWrap> <b>Família: </b> {this.props.especie.resFamilia}</Typography></ListItemText>
                    </ListItem>
                    <Divider inset component="li" />
                    <ListItem>
                        <Avatar>
                            <img
                                className={classes.img}
                                src={icone}
                                alt="nativa"
                                height="30" width="30"
                            />
                        </Avatar>
                        <ListItemText ><Typography noWrap><b>Origem: </b> {this.props.especie.ori}</Typography></ListItemText>
                    </ListItem>
                    <Divider inset component="li" />
                    <ListItem>
                        <Avatar>
                            <img
                                className={classes.img}
                                src={icone}
                                alt="nativa"
                                height="30" width="30"
                            />
                        </Avatar>
                        <ListItemText ><Typography noWrap> <b>Folhagem: </b> {this.props.especie.folha}</Typography></ListItemText>
                    </ListItem>
                    <Divider inset component="li" />
                    <ListItem>
                        <Avatar>
                            <img
                                className={classes.img}
                                src={icone}
                                alt="nativa"
                                height="30" width="30"
                            />
                        </Avatar>
                        <ListItemText ><Typography noWrap><b>Porte: </b> {this.props.especie.port}</Typography></ListItemText>
                    </ListItem>
                    <Divider inset component="li" />
                    <ListItem>
                        <Avatar>
                            <img
                                className={classes.img}
                                src={icone}
                                alt="nativa"
                                height="30" width="30"
                            />
                        </Avatar>
                        <ListItemText ><Typography noWrap><b>Diâmetro da Copa: </b> {this.props.especie.diametro} metros</Typography></ListItemText>
                    </ListItem>
                    <Divider inset component="li" />
                    <ListItem>
                        <Avatar>
                            <img
                                className={classes.img}
                                src={icone}
                                alt="nativa"
                                height="30" width="30"
                            />
                        </Avatar>
                        <ListItemText ><Typography noWrap> <b>População: </b> {this.props.especie.popu}</Typography></ListItemText>
                    </ListItem>
                    <Divider inset component="li" />
                    <ListItem>
                        <Avatar>
                            <img
                                className={classes.img}
                                src={icone}
                                alt="frutificacao"
                                height="30" width="30"
                            />
                        </Avatar>
                        <ListItemText ><Typography noWrap><b>Época de Frutificação: </b> {this.props.especie.epocaFruta != undefined && this.props.especie.epocaFruta != "" ?
                            this.props.especie.epocaFruta.map(fruta => (<p>{fruta}</p>)) : ""}</Typography></ListItemText>
                    </ListItem>
                    <Divider inset component="li" />
                    <ListItem>
                        <Avatar>
                            <img
                                className={classes.img}
                                src={icone}
                                alt="frutificacao"
                                height="30" width="30"
                            />
                        </Avatar>
                        
                        <ListItemText ><Typography noWrap><b>Época de Floração: </b> {this.props.especie.epocaFlor != undefined && this.props.especie.epocaFlor != "" ?
                           this.props.especie.epocaFlor.map(flor => (<p>{flor}</p>)) : ""}</Typography></ListItemText>
                    </ListItem>
                    <Divider inset component="li" />
                    <ListItem>
                        <Avatar>
                            <img
                                className={classes.img}
                                src={icone}
                                alt="nativa"
                                height="30" width="30"
                            />
                        </Avatar>
                        <ListItemText ><Typography noWrap><b>Tipo de Fruto: </b> {this.props.especie.tipoFruto}</Typography></ListItemText>
                    </ListItem>
                    <Divider inset component="li" />
                    <ListItem>
                        <Avatar>
                            <img
                                className={classes.img}
                                src={icone}
                                alt="nativa"
                                height="30" width="30"
                            />
                        </Avatar>
                        <ListItemText ><Typography noWrap><b>Altura da Espécie: </b> {this.props.especie.altura} metros</Typography></ListItemText>
                    </ListItem>

                </List>
            </div>
        );
        // */
    }
}

export default withStyles(styles)(DadosEspecie);
