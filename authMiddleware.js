const User = require("./models/User")
const authMiddleware = async (req, res, next) => {
  console.log("req.headers", req.headers)
  console.log("Authorization header:", req.headers.authorization)

  const authHeader = req.headers.authorization || ""
  const base64Credentials = authHeader.split(" ")[1] || ""
  console.log("base64Credentials:", base64Credentials)

  const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8")
  console.log("Decoded credentials:", credentials)

  const [username, password] = credentials.split(":")
  console.log("username:", username)
  console.log("password:", password)

  const user = await User.findOne({ username, password })
  console.log("user:", user)

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  req.user = user

  next()
}

module.exports = authMiddleware
