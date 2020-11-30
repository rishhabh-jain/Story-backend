const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/Users')
const ID = '676159018096-j239la4ic0c48gqkbvfpk7lcj8fd3gbt.apps.googleusercontent.com'
const SECRET = 'pCEnR74n0l__g-NYDVo5UoOb'
module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: ID,
        clientSecret: SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        }
        console.log(accessToken)
        try {
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}