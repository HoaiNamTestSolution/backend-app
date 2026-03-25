const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]; 
    
    if(!authHeader)
        return res.status(403).json({ message: "No token" });

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
        req.user = decoded;
        next();
    }catch (err){
        res.status(401).json({ message: "Invalid token"});
    }
};

const isAdmin = (req, res, next) => {
    if(req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden"});
    }
    next();
};

module.exports = { verifyToken, isAdmin };