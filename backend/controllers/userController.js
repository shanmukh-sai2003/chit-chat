const { body, validationResult } = require('express-validator');
const User = require("../models/user");
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('./authController');

exports.createUser = [
    body('username').trim().notEmpty().escape().withMessage("username cannot be empty").custom( async (value) => {
        const user = await User.findOne({ username: value }).exec();
        if(user) throw new Error('Already user exsists with the username');
    }),
    body('email').trim().isEmail().withMessage("Not a valid email").custom( async (value) => {
        const user = await User.findOne({ email: value }).exec();
        if(user) {
            throw new Error('Already user exsists with email');
        }
    }).withMessage("Already user exsists with this email"),
    body('password').trim().isLength({ min: 8 }).withMessage("invalid password!! password length should be minimum 8"),
    body('confirmPassword').trim().custom((value, { req }) => {
        return value === req.body.password;
    }).withMessage("confirm password should be same as password"),

    async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            const response = {
                success: false,
                message: errors.array()[0].msg
            };

            return res.status(400).json(response);
        }

        const uname = req.body.username;
        const pwd = req.body.password;
        const email = req.body.email;

        try {
            const hashPwd = await bcrypt.hash(pwd, 10);

            const user = new User({ username: uname, password: hashPwd, email: email });
            await user.save();

            const response = {
                success: true,
                data: {
                    username: user.username,
                    userId: user._id,
                    email: user.email,
                    joinedAt: user.joinedAt
                },
            };

            return res.status(200).json(response);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, message: error.message });
        }
    }
];

exports.userLogin = [
    body('username').trim().notEmpty().withMessage("invalid username!! username is required to login").escape(),
    body('password').trim().isLength({ min: 8 }).withMessage("invalid password!!").escape(),

    async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            const response = {
                success: false,
                message: errors.array()[0].msg
            };
            return res.status(400).json(response);
        }

        try {
            const user = await User.findOne({ username: req.body.username }).exec();
        
            if(!user) {
                return res.status(401).json({ success: false, message: "Invalid username!! no user exsists with the username" });
            }

            const pwd = req.body.password;
            const storedPwd = user.password;
            const match = await bcrypt.compare(pwd, storedPwd);
            
            if(!match) {
                return res.status(401).json({ success: false, message: "invalid password" });
            }

            const { username, email, joinedAt, _id } = user;
            const userPlayload = { username, email, joinedAt, userId: _id };

            const accessToken = generateAccessToken(userPlayload);
            const refreshToken = generateRefreshToken(userPlayload);

            res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None' });

            return res.status(200).json({ success: true, data: userPlayload, accessToken: accessToken });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, message: error.message });
        }   
    }
];