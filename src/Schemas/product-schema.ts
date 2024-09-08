
import { z } from "zod";


const status = ["0", "1"] as const

export const ProductSchema = z.object({
    name: z
        .string()
        .min(3, { message: "El nombre debe tener minimo 3 carácteres" })
        .max(50,{message:"El nombre debe tener como máximo 50 carácteres"}),
    description: z
        .string()
        .min(3, { message: "La descripcion debe tener minimo 3 carácteres" })
        .max(50,{message:"La descripcion debe tener como máximo 50 carácteres"}),
    status: z.enum(status, { errorMap: () => ({ 
        message: "El estado no es válido" 
        }) 
    }),
    price:z.string().refine(price=>!isNaN(parseFloat(price)),{
        message:"El precio no es válido"
    }),
    initStock:z.string().refine(initStock => !isNaN(parseInt(initStock)),{
        message:"El stock no es valido"
    }),
    category:z.string().refine(category=>!isNaN(parseInt(category)),{
        message:"La categoria no es válida"
    }),
    provider:z.string().refine(provider=>!isNaN(parseInt(provider)),{
        message:"El proveedor no es válido"
    })
})
