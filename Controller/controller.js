import { ValidadarInicio,ValidarAll } from "../Validador.js";  

import jwt from 'jsonwebtoken'
export class Controller {  
    constructor({Model}){
        this.Model = Model
    }
  Login = async(req, res) => {  
         
        try {  
            const Validado = ValidadarInicio(req.body);  
            if (Validado.success) {  
                const result = await this.Model.Login(Validado);
             console.log(result)
                 const jwtc = jwt.sign({result},'is-amesone-secret-key',{expiresIn:'1h'})
             res.status(200).send(jwtc)
            } else {  
             throw new Error(Validado.error.message)
            }  
        } catch (error) {  
            console.error('Login error:', error);  
            res.status(500).send({ error: 'A ocurrido un error2: ' + error });  
        }  
    }  
    Register = async(req,res)=>{
        try{
          const Validado = ValidarAll(req.body)
          if(!Validado.success){
            console.error('A ocurrido un error de validacion' + Validado.error)
            res.status(500).send(`${Validado.error.message}`)
          }       
          const results = await this.Model.Register(Validado)
          res.status(201).send(results)
        }
        catch(error){
            res.status(500).send(`A ocurrido un error: ${error.message}`)
            throw new Error('A ocurrido un error en register' + error.message)
            
        }
    }
   Update = async(req,res)=>{

    try{
      const {id} = req.params
       const Validado = ValidadarInicio(req.body)         
       if(Validado.success){
          const results = await this.Model.Update({id:id,object:Validado})
          if(results === 'Se actualizo la info correctamente correctamente'){
            res.status(200).send(`${results}`)
          }
          res.status(400).send(`${results}`)

       }

     
       throw new Error('A ocurrido un error en el Update' + Validado.error.message)
    }catch(error){
   
        throw new Error('A ocurrido un error en el Update' + error.message)

    }
   } 
}