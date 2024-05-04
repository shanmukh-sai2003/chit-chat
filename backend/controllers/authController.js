const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateAccessToken = (user) => {
    const token = jwt.sign({ user: user }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '30m'});
    return token
}

exports.verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'];

    if(!authHeader) {
        return res.status(403).json({ success: false, message: "User is not authenticated" });
    }

    const token = authHeader.split()[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, deocde) => {
        if(err) {
            return res.status(403).json({ success: false, message: "Not a valid user"});
        }

        req.user = deocde;
        next();
    });
} 

exports.generateRefreshToken = (user) => {
    const token = jwt.sign({ user: user }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '2d' });
    return token;
}

exports.verifyRefreshToken = (req, res) => {
    const refreshToken = req.cookies['refreshToken'];
    if(!refreshToken) {
        return res.status(403).json({ success: false, message: "user is not authenticated" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decode) => {
        if(err) {
            return res.status(403).json({ success: false, message: "not a valid user" });
        }

        const accessToken = this.generateAccessToken(decode.user);
        res.status(200).json({ success: true, accessToken: accessToken, data: decode.user });
    });
}