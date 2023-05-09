import express from 'express';
import mongoose from 'mongoose';
import {PORT} from './config.js'

const app = express();

app.use(express.json());

try {
    await mongoose.connect('mongodb+srv://Drugs:Drugs@cluster0.0pxc1mu.mongodb.net/drugs?retryWrites=true&w=majority')
    console.log("DB ok");
} catch (error) {
    console.log(error)
}

// modelos schema 

const alarmaSchema = new mongoose.Schema({
    hour: String,
    day: Array,
    info:String,
    cajon: String,
    usuario: Object
});
  

//Crear modelo
const Alarma = mongoose.model('Alarma', alarmaSchema)


// Rutas
    app.get('/',(req,res) =>{
        Alarma.find().then(date => res.json(date)).catch(error => res.json(error))
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