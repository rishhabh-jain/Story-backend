const express = require("express")
const {ensureAuth , ensureGuest}  = require('../middleware/auth')
const router= express.Router()
const GoogleStrategy = require('passport-google-oauth20').Strategy
const ID = '676159018096-j239la4ic0c48gqkbvfpk7lcj8fd3gbt.apps.googleusercontent.com'
const SECRET = 'pCEnR74n0l__g-NYDVo5UoOb'

router.get('/' ,ensureGuest, (req,res)=>
{
    res.send('login')
})
router.get('/dashboard' , ensureAuth , (req,res)=>{
    res.send(`Hello ${req.user.firstName}`)
})

module.exports = router