module.exports = (sequelize, DataType) => {
    var especies = sequelize.define("Especies", {
        id_especie: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_familia: {
            type: DataType.INTEGER,
            references: {
                model: 'Familias',
                key: 'id_familia'
            }
        }, 
        nome_cientifico: {
            type: DataType.STRING,
        },
        folhagem: {
            type: DataType.STRING,
        },
        origem: {
            type: DataType.STRING,
        },
        potencialpaisag: {
            type: DataType.TEXT,
        },
        descricao: {
            type: DataType.TEXT,
        },
        porte: {
            type: DataType.STRING
        },
        populacao: {
            type: DataType.INTEGER
        },
        foto: {
            type: DataType.STRING
        },
        desenho: {
            type: DataType.STRING
        },
        FloracaoOutono: {
            type: DataType.BOOLEAN
        },
        FloracaoVerao: {
            type: DataType.BOOLEAN
        },
        FloracaoPrimavera: {
            type: DataType.BOOLEAN
        },
        FloracaoInverno: {
            type: DataType.BOOLEAN
        },
        FrutificacaoOutono: {
            type: DataType.BOOLEAN
        },
        FrutificacaoVerao: {
            type: DataType.BOOLEAN
        },
        FrutificacaoPrimavera: {
            type: DataType.BOOLEAN
        },
        FrutificacaoInverno: {
            type: DataType.BOOLEAN
        },
        /*seco: {
            type: DataType.BOOLEAN
        },
        carnoso: {
            type: DataType.BOOLEAN
        },*/
        tipoFruto: {
            type: DataType.STRING
        },
        diametroCopa: {
            type: DataType.INTEGER
        },
        alturaEspecie: {
            type: DataType.INTEGER
        }
    })

    return especies
}