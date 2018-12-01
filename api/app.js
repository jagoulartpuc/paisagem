const models = require("./models");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require('express-fileupload');

const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");
const especiesRouter = require("./routes/especies");
const nomesPopularesRouter = require("./routes/nomesPopulares");
const familiasRouter = require("./routes/familias");
const TokenManager = require("./Helpers/AuthManager");

// Initialize server
models.sequelize.sync().then(function() {
  models.Users.create({
    "username":"admin",
    "senha":"8c9a812879a9324b5becada806b85389685944212118971e8ff1507d74af67ed",
    "salt":"34df78b35c833deade9fd2e77db5341a27252206f46d0aeb065673e2529a0576",
    "nome":"admin"
  })
 
  setupServer();
});

function setupServer() {
  const app = express();

  app.use(cors());
  //app.use(bodyParser.json());
  app.use(bodyParser.json({limit: '10mb', extended: true}))
  app.use("/api/especies", especiesRouter);
  app.use("/api/familias", familiasRouter);
  app.use("/api/login", loginRouter);
  app.use("/api/nomesPopulares", nomesPopularesRouter);
  app.use(
    "/api/users",
    //TokenManager.ensureUserToken,
    usersRouter
  );
  app.use(fileUpload());

  app.use('/public', express.static(__dirname + '/public'))
  
  app.post('/api/upload', (req, res, next) => {
    console.log(req);

    let imageFile = req.files.imagem;
  
    imageFile.mv(`${__dirname}/public/${req.body.nome}.jpg`, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
  
      res.json({file: `public/${req.body.nome}.jpg`});
    });
  
  })
  app.listen(process.env.port || 4000, function() {
    console.log("server listening");
  });
}
