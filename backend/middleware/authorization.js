const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const userToken = req.header("token");

        if (!userToken)
            res.status(403).json("Not Authorized");
        
        const payload = await jwt.verify(userToken, process.env.jwtSecret);

        req.user = payload.user;
        
        next();
    } catch (error) {
        console.error(error.message);
        res.status(403).json("Not Authorized")
    }
}