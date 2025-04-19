const jwt = require("jsonwebtoken");

const authorise = (Roles)=>{

  return (req, res, next) => {

    try {
      // Roles = ['admin']
      let user = req.user;
      if(!Roles.includes(user.role)){
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Some error in Authorise ' });
    }
  };
  
} 

// mongoose methods: 1. findByID2. findOne3. findOneAndUpdate4. update5. updateMany6. findByIdAndUpdate


module.exports = authorise;