'use strict'

import jwt from 'jsonwebtoken'
import { findUser } from '../utils/db.validators.js'


export const validateJwt = async(req, res, next)=>{
    try{
        //Obtener la llave de acceso privada al Token
        let secretKey = process.env.SECRET_KEY
        //Obtener el token de los headers (cabeceras)
        let { authorization } = req.headers
        //Verificamos que venga el token
        if(!authorization) return res.status(401).send({message: 'Unauthorized'})
        let user = jwt.verify(authorization, secretKey)
        //Validar que el usuario exista
        const validateUser = await findUser(user.uid)   
        if(!validateUser) return res.status(404).send(
            {
                success: false,
                message: 'User not found - unauthorized'
            }
        )
        //Inyectar en la solicitud un nuevo parámetro
        req.user = user
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Invalid credentials'})
    }
}

//Verificar si el usuario tiene el rol de Cliente
export const isClient = async(req, res, next)=>{
    try{
        const { user } = req
        if(!user || user.role !== 'CLIENT') return res.status(403).send(
            {
                success: false,
                message: `You don't have access | username ${user.username}`
            }
        )
        next()
    }catch(err){
        console.error(err)
        return res.status(403).send(
            {
                success: false,
                message: 'Error with authorization'
            }
        )
    }
}


//Verifica si el usuario tiene el ROL de ADMIN en su usuario.
export const isAdmin = async(req, res, next)=>{
    try{
        const { user } = req
        if(!user || user.role !== 'ADMIN') return res.status(403).send(
            {
                success: false,
                message: `You don't have access | username ${user.username}`
            }
        )
        next()
    }catch(err){
        console.error(err)
        return res.status(403).send(
            {
                success: false,
                message: 'Error with authorization'
            }
        )
    }
}

export const isAdminHotel = async(req, res, next)=>{
    try{
        const { user } = req
        if(!user || user.role !== 'ADMIN_HOTEL') return res.status(403).send(
            {
                success: false,
                message: `You don't have access | username ${user.username}`
            }
        )
        next()
    }catch(err){
        console.error(err)
        return res.status(403).send(
            {
                success: false,
                message: 'Error with authorization'
            }
        )
    }
}

// middlewares/authorizeRoles.js
export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.user  // Asumiendo que ya tienes el user en req (por ejemplo, desde JWT middleware)

        if (!user || !allowedRoles.includes(user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Insufficient role permissions.',
            }) 
        }

        next() 
    } 
} 



/*OBSERVACIÓN: Si se llegan agregar un Validator nuevo, tomar en cuenta
su funcionalidad y agregar un comentario acerca de eso. */