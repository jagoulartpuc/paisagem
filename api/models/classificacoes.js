module.exports = (sequelize, DataType) => {
  var classificacoes = sequelize.define("Classificacoes", {
    id_classificacao: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataType.STRING
    },
    descricao: {
      type: DataType.STRING
    }
  });

  return classificacoes;
};
