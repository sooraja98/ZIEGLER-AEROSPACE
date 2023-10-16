import User from '../models/user.js'
import jwt from 'jsonwebtoken'
export const userRegister = async (req, res, next) => {
    try {
      const {name,email, password } = req.body; // Get email and password from the request body
  
      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.json({ message: 'User alreday exist' });
      }
  
      // Creating a new user object
      const newUser = new User({
        name,
        email,
        password, // You might want to hash the password before saving it
      });
  
      await newUser.save();

      return res.json({ message: 'Registration successful' });
    } catch (error) {
      next(error);
    }
  };

export const UserLogin = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (! user) {
        res.json({message: "not registerd"})
    } else {
        const userpassword = user.password
        if (userpassword === password) {
            const token=jwt.sign({email},"mysecretkey",{expiresIn: "1d"})
            res.json({message:"approve",token})
        } else {
            res.json({message: "password error"})

        }
    }
}

export const AdminLogin =async(req,res)=>{
  const {email, password} = req.body
  const email1="admin@gmail.com"
  const password1="123"
    
    if (email===email1 &&password===password1) {
      const token=jwt.sign({email},"mysecretkey",{expiresIn: "1d"})
            res.json({message:"approve",token})
    } else {
       
            res.json({message: "password error"})

        }
    
}
