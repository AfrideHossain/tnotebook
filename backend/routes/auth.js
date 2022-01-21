const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'AfrideIsGre@t';

//ROUTE 1: Create new user using POST (/api/auth/createuser). No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email address').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 })
], async (req, res) => {
    //if there are any errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        //Check whether the user with the same email already exists.
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const securedPass = await bcrypt.hash(req.body.password, salt);

        //Create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        //Create authentication token with jsonwebtoken
        const authtoken = jwt.sign(data, JWT_SECRET);

        // res.json(user);
        res.json({ authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");;

    }

})

//ROUTE 2: Log in with credentials using POST (/api/auth/login). No login required
router.post('/login', [
    body('email', 'Enter a valid email address').isEmail(),
    body('password', 'Password can not be blank').exists()
], async (req, res) => {
    //if there are any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: "please try to login with correct credentials" });
        }

        //password compare
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ errors: "please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 3: Fetch user using POST (/api/auth/getuser). Login required.
router.use('/getuser', fetchuser, async (req, res) => {
    try {
        let userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router
