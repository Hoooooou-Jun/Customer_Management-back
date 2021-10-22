import express from "express";
import router from "./router/router"

const app = express()

app.get('/', (req:express.Request, res:express.Response, next: express.NextFunction) => {
    res.send('Hello')
})

app.use("/router", router)

app.listen(3000, () => {
    console.log('Server Running')
})