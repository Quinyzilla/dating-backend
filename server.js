import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Cards from './dbCards.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(Cors());

const db = "mongodb+srv://datingadmin:datingapp@cluster0.g5zgim9.mongodb.net/?retryWrites=true&w=majority"
mongoose
    .connect(db, { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.get("/", (req, res) => res.status(200). send('Hello world'));

app.post("/dating/cards", (req, res) =>{
    const dbCard = req.body;
    Cards.create(dbCard, (err, data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    });
});
    
app.get("/dating/cards", (req, res) =>{
    Cards.find((err, data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });
});
app.listen(port, () => console.log(`listening on localhost: ${port}`));
