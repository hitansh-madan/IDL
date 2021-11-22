import express from "express";
import cors from "cors";
import templates from "./api/templates.route.js";
// const mongoose = require('mongoose');

// require('dotenv').config();

const app = express();
// const port = process.env.port || 5000 ;

app.use(cors());
app.use(express.json());

app.use("/api/templates", templates);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri);

// const connection = mongoose.connection;
// connection.once('open', ()=> {
//     console.log("MongoDB Connected");
// });

// app.listen(port,()=> {
//     console.log(`running on port : ${port}`);
// });
