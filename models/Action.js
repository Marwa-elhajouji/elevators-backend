const mongoose = require("mongoose")
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
module.exports = Action
