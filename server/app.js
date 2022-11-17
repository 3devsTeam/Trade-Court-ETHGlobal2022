const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const path = require("path")
const indexRouter = require("./routes/index")
const cookieParser = require("cookie-parser")

const globalErrorHandler = require("./utils/errorController")

const app = express()

app.use(cookieParser())
app.use(express.json({ limit: "10kb" }))
app.use(globalErrorHandler)

if (process.env.NODE_ENV == "prod") {
  app.use(
    cors({
      origin: "http://161.35.83.140:3030",
      credentials: true,
    })
  )
} else if (process.env.NODE_ENV == "dev") {
  app.use(
    cors({
      origin: "http://127.0.0.1:5173",
      credentials: true,
    })
  )
}

app.options("*", cors())

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"))
}

app.use(express.static(path.join(__dirname, "../client/build")))
app.use("/api", indexRouter)
app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err)
      }
    }
  )
})

module.exports = app
