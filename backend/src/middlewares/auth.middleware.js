import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken'

// auth middleware to protect routes
const authMiddleware = async (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success:false,
            message:'Unauthorized User'
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        req.user = user;
        next();

    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:'Invalid Token'
        });
    }
}

// auth middleware to check if 'client' or 'foodPartner - [Authorized User]
const authorize = (role) => {
    return (req, res, next) => {

        if (req.user.role !== role) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        next();
    };
};


export {authMiddleware, authorize};

