const jwt = require("jsonwebtoken");
const { Unauthorized, Forbidden } = require("../errors/httpErrors");

const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (authHeader) {
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) throw new Unauthorized("Token is not valid!");
            req.user = user;
            next();
        });
    } else throw new Unauthorized("You are not authenticated!");
};

module.exports = auth;