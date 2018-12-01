module.exports = (sequelize, DataType) => {
    var familias = sequelize.define("Familias", {
        id_familia: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },      
        nome: {
            type: DataType.STRING,
            primaryKey: true,
            autoIncrement: false,
            unique: true
        },
        descricao: {
            type: DataType.TEXT
        },
    })

    return familias
}