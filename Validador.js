
 import z from 'zod'

  const Validador = z.object({
    nombre: z.string({
        invalid_type_error: 'A ocurrido un error de validacion',
        required_error:'Este campo es requerido'
    }),
    contrasena:  z.string({
        invalid_type_error: 'A ocurrido un error de validacion',
        required_error:'Este campo es requerido'
    }),
    alias:  z.string({
        invalid_type_error: 'A ocurrido un error de validacion',
        required_error:'Este campo es requerido'
    })
  })


  export function ValidadarInicio(object){
  return Validador.partial().safeParse(object)
 
  }

  export function ValidarAll(object){
    return Validador.safeParse(object)
  }