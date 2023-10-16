import express from 'express'
import { AdminLogin, UserLogin, userRegister } from '../controllers/authController.js'

const router=express.Router()

router.post('/userRegister',userRegister)
router.post('/UserLogin',UserLogin)
router.post('/AdminLogin',AdminLogin)


export default router
