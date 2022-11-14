const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const indexRouter = require("./routes/index")
const cookieParser = require("cookie-parser")

const globalErrorHandler = require("./utils/errorController")

const app = express()
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
)
app.options("*", cors())

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"))
}
app.use(cookieParser())
app.use(express.json({ limit: "10kb" }))
app.use("/api", indexRouter)
app.use(globalErrorHandler)

module.exports = app
