const http=require("http");
const express=require("express");

const mongo=require("mongoose");
const server=require('http');
const mongoconnect=require("./config/dbconnection.json");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');

/*c*/

mongo.connect(mongoconnect.url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }).then(() => console.log('mongo connecter')).catch((err) => console.log(err));
var app=express();
app.set("views",path.join(__dirname,"views"))
app.set("view engine" ,"twig")
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:4200', // URL de votre application Angular
  optionsSuccessStatus: 200 // Réglage de statut pour les navigateurs anciens
};
app.use(cors(corsOptions));

// Configure middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
var postRouter = require('./routes/post');
var commentRouter = require('./routes/comment');
var respondRouter = require('./routes/respond');
app.use('/post',postRouter);
app.use('/comment',commentRouter);
app.use('/respond',respondRouter);


const commandeRoutes = require('./routes/commandeRoutes');
app.use('/commandes', commandeRoutes);
const livraisonRoutes = require('./routes/livraisonRoutes');
app.use('/livraisons', livraisonRoutes);

const serveur = server.createServer(app);
/*const io =require("socket.io")(serveur);
io.on("connection",(socket)=>{;
  console.log("user connected")
  socket.on("msgs",(data)=>{
    io.emit("msgs",data + "is connected");
  });

  socket.on("typing", (data)=>{
    console.log(data);
    io.emit("typing", data+"is typing ....");
  });

  socket.on("msg", (data)=>{
    add(data.object);
    console.log(data);
    io.emit("msg", data.name +":"+data.object);
  });

  



  socket.on("disconnect",()=>{
    console.log("user disconnected");
    io.emit("msg","user disconnected");
  });
});*/

/*const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/
serveur.listen(3000 , console.log("server run"));
module.exports = app;
/*        
     socket.on("typing",(data)=>{
         p=document.createElement("p")
        p.innerText=data;
        document.body.appendChild(p);

     })*/