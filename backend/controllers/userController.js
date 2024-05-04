const { body, validationResult } = require('express-validator');

exports.createUser = [
    body('username').trim().notEmpty().escape().withMessage("username cannot be empty"),
    body('email').trim().isEmail().withMessage("Not a valid email"),
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

        res.sendStatus(200);
    }
];