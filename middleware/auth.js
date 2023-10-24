import  Jwt  from "jsonwebtoken";
export const verifyToken = (req,res,next) =>{
    try{
        let token = req.header("Authorization");
        if(!token) return res.status(403).send("Access denied");
        if(token.startWith("Bearer ")){
        }
        const verified =Jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified;
        next();
    }catch(error){
        res.status(500).json({error:error.message});
    }
}