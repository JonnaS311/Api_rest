import express from 'express';
import mongoose from 'mongoose';
import {PORT} from './config.js'

const app = express();

app.use(express.json());

try {
    await mongoose.connect('mongodb://mongo:Da29Pos0J9P0q2ThqSyn@containers-us-west-48.railway.app:7640')
    console.log("DB ok");
} catch (error) {
    console.log(error)
}

// modelos schema 

const dateSchema = new mongoose.Schema({
    dia: String
});

const Date = mongoose.model("Date",dateSchema);

// Rutas
    app.get('/',(req,res) =>{
        Date.find().then(date => res.json(date)).catch(error => res.json(error))
    })

    app.post('/',(req,res)=>{
        const body = req.body
        const date = new Date(body)
        date.save()
        res.json({
            message:"usuario guardado",
            date
        })
    })

    app.put('/:id',async (req,res)=>{
         const {id} =req.params;
         const body = req.body;

         const newDato = await Date.findByIdAndUpdate(id,body,{new:true})
         res.json({
            message: "Actualizado",
            body
         })
    })

    app.delete("/:id",async (req,res) =>{
        const {id} = req.params;
        await Date.findByIdAndDelete(id);
        res.json({
            message:"se elimino",

        })
    })

app.listen(PORT, ()=>{
    console.log("encendido", PORT);
});