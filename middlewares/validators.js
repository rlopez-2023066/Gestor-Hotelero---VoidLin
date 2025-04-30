import {
    body
} from 'express-validator'

import {
    validateErrors,
    validateErrorsWithoutFiles
} from './validate.error.js'

import {
    existEmail,
    existUsername,
    notRequiredField
} from '../utils/db.validators.js'

/* Observación: Colocar comentario acerca de la Validación */


// Validaciones para el registro de usuario
export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min: 8})
        .withMessage('Password must be 8 characters'),
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

//Validaciones para que el usuario actualice su perfil.
export const updateUserValidator = [
    body('username', 'Name cannot be empty')
        .optional()
        .notEmpty()
        .toLowerCase()
        .custom((username, {req}) => existUsername(username, req.user)),
    body('email', 'Email cannot be empty')
        .optional()
        .notEmpty()
        .isEmail()
        .custom((email, {req})=> existEmail(email, req.user)),
    body('password')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('role')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    validateErrorsWithoutFiles
]

//Validaciones para que el usuario elimine su perfil.
export const deleteUserValidator = [
    body('password', 'Password cannot be empty')
        .notEmpty(),
    validateErrors
]


//Validaciones para que el usuario actualice su contraseña.
export const updatePasswordValidator = [
    body('oldPassword', 'Old password cannot be empty')
        .notEmpty(),
    body('newPassword', 'New password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('New password must be strong')
        .isLength({min: 8, max: 20})
        .withMessage('Enter your password again'),
    validateErrors
]

//Validaciones para agregar Hotel
export const registerHotelValidator = [
    body('name')
        .notEmpty()
        .isLength({min: 8, max: 50 })
        .withMessage('Enter name again'),
    body('direction')
        .notEmpty()
        .isLength({min: 5, max: 90})
        .withMessage('Enter direction again'),
    body('category')
        .notEmpty(),
    body('description')
        .notEmpty()
        .isLength({min: 10, max: 200})
        .withMessage('Enter description again'),
    body('telephone')
        .notEmpty()
        .isMobilePhone(),
    validateErrorsWithoutFiles
]

//Validciones para actualizar el Hotel
export const updateHotelValidator = [
    body('name')
        .optional()
        .notEmpty(),
    body('direction')
        .optional()
        .notEmpty(),
    body('category')
        .optional()
        .notEmpty(),
    body('description')
        .optional()
        .notEmpty(),
    body('telephone')
        .optional()
        .notEmpty(),
    validateErrorsWithoutFiles
]


