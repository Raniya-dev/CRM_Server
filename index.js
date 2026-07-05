import express from "express"
import { configDotenv } from "dotenv"
import UserRouter from './routes/UserRoutes.js'
import ConnectDB from "./config/ConnectDB.js"
import cors from "cors"
import errorHandler from "./middleware/errorHandler.js"

configDotenv()
ConnectDB()

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("JWT_SECRET:", process.env.JWT_SECRET);

app.get('/',(req,res)=>{
    res.send("Hello World!")
})


app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use('/user',UserRouter)
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT} `)
})