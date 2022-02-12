const passport = require('passport')
const cfg = require('../config/index')
const db = require('../db')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = cfg.JWT_SECRET

// 
passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
  try {
    console.log(jwt_payload)
    const q = `SELECT username, role FROM users WHERE username = ?`;
    db.query(q, [jwt_payload.username] , (err, result)=>{
      if (err) return done(err)

      if (result.length < 0) {
          return done(new Error('user not found'))
      }

      return done(null, result[0])
    })

  } catch (err) {
      return done(err)
  }
}))


module.exports.IsLogin = (req, res, next) => {
  try {
    passport.authenticate('jwt', {session: false}, (err, user)=>{
      if (err)  return next(err);

      if (!user) {
        err = new Error('Unautehnticated')
        err.statusCode = 401
        return next(err)
      }

      req.user = user
      
      return next();
    })(req, res, next)
  } catch (err) {
      return next(err);
  }
}