const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const User = require("./models/User")
const Action = require("./models/Action")

const app = express()
const authMiddleware = require("./authMiddleware")
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1/elevators")

//Enregistrer une action :

app.post("/registerAction", async (req, res) => {
  try {
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
app.get("/admin/actions", authMiddleware, async (req, res) => {
  try {
    const actions = await Action.find()
    res.status(200).json(actions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Inscription
app.post("/admin/signup", async (req, res) => {
  const { username, password } = req.body

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" })
    }

    // Créer un nouvel utilisateur
    const newUser = new User({
      username,
      password
    })

    await newUser.save()
    res.status(201).json({ message: "User registered successfully" })
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
