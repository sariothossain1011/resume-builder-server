const jwt = require('jsonwebtoken')



const authentication =async(req,res,next)=>{
    try {
        let tmp = req.header("Authorization");
        const token = tmp && tmp.split(" ")[1];
        if(!token){
        res.status(401).json({ message: "Not authorized, please login"});
        }
        // verify token
        jwt.verify(token,process.env.SECRET_KEY,(error,decode)=>{
            if(error){
                res.status(400).json({ message: "Not authorized, please login" })
            }else{
                req.user = decode['data']
                next();
            }
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = authentication