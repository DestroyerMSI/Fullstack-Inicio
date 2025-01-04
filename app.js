
import e from "express";
import { cors } from "./Midelwhare/Cors.js";
import {Enrutado} from './Route/route.js'
import { Model } from "./Modal/MYSQL.js";
const app = e()

app.use(e.json())
app.disable('x-powered-by')
app.use(cors())
app.use('/user',Enrutado({Model:Model}))

app.get('/', (req,res)=>{
  res.status(200).send('Hola')
})


const Port = process.env.PORT || 4000

app.listen(Port,()=>{
    console.log('Esta en el puerto :' + Port)
})