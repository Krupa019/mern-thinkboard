import ratelimit  from "../config/upstash.js"

const rateLimiter = async (req,res,next)=>{
try{
    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
    const{success} = await ratelimit.limit(`limit_${ip}`);
    if(!success){
        return res.status(429).json({
            message:"Too many requests,plrase try again later"
        })
    }
    next()
}
    catch(error){
        console.log("Rate limit error",error);
        next(error);
    }
}

export default rateLimiter;