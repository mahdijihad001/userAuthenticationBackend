const jwt = require("jsonwebtoken");

exports.genarateJwt = (id) =>{
    return jwt.sign({id} , process.env.jwt_secrate , {expiresIn : "7d"})
};

exports.protect = async (req, res, next) => {

    let token = req.cookies?.token;
    
    if (!token) return res.status(401).json({ message: "Not authorized , Not token" });


    try {
        const decoded = jwt.verify(token, process.env.jwt_secrate);

        req.id = decoded.id;
        req.user = await userModel.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized , Token failed" });
    }

}