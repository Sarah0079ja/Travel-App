const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

//User model
const User = require("../models/User");

//@route POST api/users
//@desc  Register new user
//@access public

router.post("/", [
  check("firstname", "Firstname is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }) ], 
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


   const { firstname, lastname, email, password } = req.body;
    
   try {
     //check existing user
     let user =  await User.findOne({ email });

     if (user) {
       return res.status(400).json({ msg: "User already exist" });
    
    }

    //create new user using the user model

      user = new User({
      firstname,
      lastname,
      email,
      password,
    });

    //Encrypt password before saving
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    }

    //Generate token
     jwt.sign(payload, config.get("jwtSecret"), 
     { expiresIn: 36000 },
     (err, token) => {
      if (err) throw err;
        res.json({ token });
     }
     );

   } catch (err) {
     console.error(err.message);
     res.status(500).send('Server Error')
   }
  }
);             
module.exports = router;
