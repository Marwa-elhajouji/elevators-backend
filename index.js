const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors"); // Import du module cors

const app = express()
app.use(cors()); // Utilisation du middleware cors
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1/elevators")

//Déclaration du Modèle Action :
const Action = mongoose.model("Action", {
  //Numéro ascenseur
  elevator: String,
  //Type d'action : Appel depuis extérieur ou appui sur bouton intérieur
  actionType: String,
  //Date et heure de l'action
  time: String,
  //Etage courant
  currentFloor: Number,
  //Etage cible
  targetFloor: Number
})
//Enregistrer une action :

app.post("/registerAction", async (req, res) => {
  // console.log(req.body);

  console.log("<<<", req.body)
  try {
    //Améliorer cette condition
    // if (!req.body.elevatorNum || !req.body.fromFloor || !req.body.toFloor) {
    //   throw { status: 400, message: "Missing parameter" }
    // }
    const newAction = new Action({
      elevator: req.body.elevator,
      actionType: req.body.actionType,
      time: req.body.time,
      currentFloor: req.body.currentFloor,
      targetFloor: req.body.targetFloor
    })

    await newAction.save()
    res.status(201).json({ message: "Action Creacted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.all("*", (req, res) => {
  res.json({ message: "Page not found" })
})

app.listen(3000, () => {
  console.log("Server has strarted")
})
