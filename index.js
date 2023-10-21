import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
// import {authRoutes} from "./routes/auth.js"
import authRoutes from "./routes/auth.js"
import { register } from "./controllers/auth.js";
/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
dotenv.config();
const app = express();
//.use is used to add middleware
app.use(express.json());
app.use(helmet());//secure your Express.js web applications by setting various HTTP headers to enhance security and protect against well-known web vulnerabilities.
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());// is a common middleware configuration used in Express.js applications to enable Cross-Origin Resource Sharing (CORS) support. CORS is a security feature implemented by web browsers to control which web pages or web applications can make requests to a different domain, known as cross-origin requests.
app.use("/assets",express.static(path.join(__dirname,'public/assets')));
/* File Storage */
const storage = multer.diskStorage({
     destination:function(req,file,cb){
        cb(null,"public/assets"); //disk storage engine for multer. The diskStorage method is used to specify where to store uploaded files on your server's disk.
        //cb: A callback function that you call to specify the destination directory.
     },
     filename:function(req,file,cb){
        cb(null,file.originalname);
     }
})
const upload = multer({storage});
//  Routes with file 
app.post("/auth/register",upload.single("picture"),register);
//Routes
app.use("/auth",authRoutes);
// Mongoose Setup
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)}); 
}).catch((error)=>{console.log(`${error} did not connect`)});
//authentication:when you are registered and you logged in
//authorization:When you want to make sure someone is logged in and allow her for certain actions 