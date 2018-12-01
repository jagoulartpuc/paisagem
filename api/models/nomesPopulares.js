module.exports = (sequelize, DataType) => {
    var nomesPopulares = sequelize.define("nomesPopulares", {
        id_nome_popular: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_especie: {
            type: DataType.INTEGER,
            references: {
                model: 'Especies',
                key: 'id_especie'
            }
        },
        nome: {
            type: DataType.STRING
        },
    })

    return nomesPopulares
}