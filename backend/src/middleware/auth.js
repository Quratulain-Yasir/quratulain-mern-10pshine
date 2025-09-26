import jwt from 'jsonwebtoken' 

const auth =  (req, res, next) => { 
    const auth = req.headers.authorization; 
    if (!auth || !auth.startsWith('Bearer ')) { 
        return res.status(401).json({ message: 'No token, authorization denied' }); 
    
    }
    const token = auth.split(' ')[1]; 
    try { 
        const decoded = jwt.verify(token, process.env.SECRET_KEY); 
        req.user = { id: decoded.id };  
     next(); } 
    catch (err) {
         return res.status(401).json({ message: 'Token is not valid' }); } 
        }
    

        export default auth;