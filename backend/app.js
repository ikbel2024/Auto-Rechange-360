const http = require("http");
const express = require("express");
const socketIO = require('socket.io');
const mongo = require("mongoose");
const bodyParser = require("body-parser");
const mongoconnect = require("../BACKEND/config/dbconnection.json");
const path = require("path");
const { add } = require("./controller/chatcontroller");
/*const {
  addpartiesocket,
  affichesocket,
} = require("./controller/joueurcontroller");*/

mongo
  .connect(mongoconnect.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongo connecter"))
  .catch((err) => console.log(err));

const classroomrouter = require("./routes/classroom");
const joueurrouter = require("./routes/joueur");
const facturerouter = require("./routes/facture");
const garagerouter = require("./routes/garage");
const garageCategoryrouter = require("./routes/garageCategory");
const stripe = require('stripe')('sk_test_51PJNMnP0cq6YOYrXmkLzypwjDm1YYDrl3GiLEq6Zlb81bNPfAUpnWHbgI3tFtCKusANEl3U59NQch52AXDshHHrY00zPIpvOD8');

const { addgarageCategory } = require("./controller/garageCategorycontroller");
var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/classrom", classroomrouter);
app.use("/joueur", joueurrouter);
app.use("/facture", facturerouter);
app.use("/garage", garagerouter);





const server = http.createServer(app);
const io = socketIO(server);
// Initialisez la connexion Socket.io
io.on('connection', (socket) => {
  console.log('Nouvelle connexion Socket.io établie');
  // Passer io à la demande
  socket.on('disconnect', () => {
      console.log('Connexion Socket.io terminée');
  });
});
// Utilisez le routeur garageCategory avec io
app.use('/garageCategory', (req, res, next) => {
  req.io = io; // Passer io à chaque demande
  next();
}, garageCategoryrouter);
app.post('/paiement', async (req, res) => {
  try {
      const { montant, token } = req.body;

      // Création d'une charge avec Stripe
      const charge = await stripe.charges.create({
          amount: montant,
          currency: 'EUR', // Vous pouvez modifier la devise selon vos besoins
          description: 'Paiement pour les services de garage',
          source: token,
      });

      res.status(200).json({ message: 'Paiement réussi', charge });
  } catch (error) {
      console.error('Erreur lors du paiement avec Stripe :', error);
      res.status(500).json({ message: 'Erreur lors du paiement', error: error.message });
  }
});



/*const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("user connected");
  socket.emit("msg", "user is connected");

  socket.on("partie", (data) => {
    addpartiesocket(data);
    io.emit("partie", data);
  });
  


  socket.on("aff", async (data) => {
    const r = await affichesocket(data);
    console.log("jjjjjj", JSON.stringify(r));
    io.emit("aff", r);
  });

  socket.on("typing", (data) => {
    io.emit("typing", data + "is typing");
  });

  socket.on("msg", (data) => {
    add(data.object);
    io.emit("msg", data.name + ":" + data.object);
  });

  socket.on("disconnect", () => {
    console.log("user disconnect");
    io.emit("msg", "user disconnect");
  });
  
});*/


server.listen(4000, console.log("server run"));
module.exports = app;
