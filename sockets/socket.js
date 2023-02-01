const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Bom Jovi"));
bands.addBand(new Band("Héroes del Silencio"));
bands.addBand(new Band("Metallica"));
bands.addBand(new Band("Linkin Park"));

console.log(bands);

// Mensajes de Sockets
io.on("connection", (client) => {
  // client.on('event', data => { /* … */ });
  console.log("Cliente conectado");

  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  client.on("vote-band", (payload) => {
    // console.log(payload);

    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  client.on("add-band", (payload) => {
    // console.log(payload);

    const newBand = new Band(payload.name);
    bands.addBand(newBand);
    io.emit("active-bands", bands.getBands());
  });

  client.on("delete-band", (payload) => {
    // console.log(payload);

    bands.deteleBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  //   client.on("emitir-mensaje", (payload) => {
  //     // io.emit("nuevo-mensaje", payload); //Emite a todos!
  //     console.log(payload);
  //     client.broadcast.emit("nuevo-mensaje", payload); // emite a todo menos el que lo emitio
  //   });

  //   client.on("mensaje", (payload) => {
  //     console.log("Mensaje", payload);
  //     io.emit("mensaje", { admin: "nuevo mensaje" });
  //   });
});
