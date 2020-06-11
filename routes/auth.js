const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");


//User model
const User = require("../models/User");

//@route GET api/auth
//@desc  GET logged in user
//@access Private
router.get('/', auth, async(req, res) => {
  try {
    const user = await (await User.findById(req.user.id)).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}); 


//@route POST api/auth
//@desc  Get logged in User
//@access private

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").exists()
  ],
  async(req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    const { email, password } = req.body;


    //check existing user
    try {
      //check existing user
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

     //if user exist use bcypt.compare password entered to stored password user.password

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch){
        return res.status(400).json({msg: 'Invalid Credentials'})
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      //Generate token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { 
          expiresIn: 36000
         },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
   
  });

//@route GET /auth/user
//@desc  GET user data
//@access private
// router.get("/user", auth, (req, res) => {
//   User.findById(req.user.id)
//     .select("-password")
//     .then((user) => res.json(user));
// });

module.exports = router;
