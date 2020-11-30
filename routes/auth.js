const GoogleStrategy = require('passport-google-oauth20').Strategy

const ID = '676159018096-j239la4ic0c48gqkbvfpk7lcj8fd3gbt.apps.googleusercontent.com'
const SECRET = 'pCEnR74n0l__g-NYDVo5UoOb'
const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // res.json({ success : true })
    res.redirect('http://localhost:3000/');
  }
)
router.get('/login/success', (req, res) => {
  const user = req.user
  res.json({
    success: true,
    message: "user has successfully authenticated",
    name : user 
  });
})
router.get('/req', (req, res) => {
  res.json({
    user : req.user  
  });
})
// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('http://localhost:3000/')
})

module.exports = router