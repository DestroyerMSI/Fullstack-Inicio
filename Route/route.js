
 import { Router } from "express";
import { Controller } from "../Controller/controller.js";

export const Enrutado = ({Model}) =>{
 const route = Router()
   const controller = new Controller({Model})

   route.post('/login',controller.Login)
   route.post('/register',controller.Register)
   route.patch('/update/:id', controller.Update)

   return route
}
