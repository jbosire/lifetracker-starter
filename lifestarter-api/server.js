const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const {PORT} = require("./config")
const authRoutes = require("./routes/auth")
const sleepRoutes = require("./routes/sleep")
const nutritionRoutes = require("./routes/nutrition")
const exerciseRoutes = require("./routes/exercise")
const activityRoutes = require("./routes/activity")
const security = require("./middleware/security")

const {BadRequestError, NotFoundError} = require("./utils/errors")

const app = express()

app.use(cors())

app.use(express.json())

app.use(morgan("tiny"))

app.use(security.extractUserFromJwt)

app.use("/auth", authRoutes)
app.use("/nutrition", nutritionRoutes)
app.use("/sleep", sleepRoutes)
app.use("/exercise", exerciseRoutes)
app.use("/activity", activityRoutes)

app.use((req,res,next) =>{
    return next(new NotFoundError())
})

app.use((err,req,res,next) => {
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error: {message,status},
    })
})


app.listen(PORT, () => {
    console.log(`🚀Server running https://lifestarter-jbosire.herokuapp.com`)
})