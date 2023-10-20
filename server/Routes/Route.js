const express=require("express")
const router=express.Router()
const UserModel=require("../models/Users")
const LoginModel=require("../models/Login")
const SignUpModel = require("../models/SignUp")
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const secretKey = 'anshuman14';
const jwtAlgorithm = 'HS256';

const requireAuth = (req, res, next) => {
    // Check if the request contains a valid user object
    if (req.user) {
        // If the request has a valid user object (authenticated), continue to the next middleware.
        next();
    } else {
        // If not authenticated, redirect to the login page or send an error response.
        res.status(401).redirect('/login'); // You can customize this URL to match your login route.
    }
};

router.use(
    expressJwt({ secret: secretKey, algorithms: [jwtAlgorithm] }).unless({ path: ['/login', '/signUp'] })
);

router.get('/', requireAuth, async (req, res) => {
    let users = await UserModel.find({});
    res.json(users);
});

router.get("/getUser/:id",requireAuth, async(req,res)=>{
    const id = req.params.id;
    let users=await UserModel.findById({_id:id})
   res.json(users)
})

router.post("/createUser", async(req,res)=>{
    try {
        
        const users= await UserModel.create(req.body)
        res.json(users)
    } catch (error) {
        res.json(error)
    }
})

router.put("/updateUser/:id",requireAuth,  async(req, res)=>{
    try {
        
        const id= req.params.id
        let users= await UserModel.findByIdAndUpdate({_id:id},{
            name:req.body.name,
            email:req.body.email,
            age:req.body.age,
        })
        res.json(users)
    } catch (error) {
        res.json(error)
    }
})

router.delete("/deleteUser/:id",requireAuth, async (req,res)=>{

    try {
        
        const id=req.params.id
        await UserModel.findByIdAndDelete({_id:id})
        res.json(res)
    } catch (error) {
        res.json(error)
    }

    
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await SignUpModel.findOne({ email, password });

        if (user) {
            // Generate a JWT token
            const token = jwt.sign({ email: user.email }, 'anshuman14', { expiresIn: '1h' });

            res.status(200).json({ message: "Authentication successful", token });
        } else {
            res.status(401).json({ message: "Authentication failed" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.post('/signUp', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Create a new user (replace with your user creation logic)
        const user = await SignUpModel.create({ email, password });

        if (user) {
            // User registration was successful; generate a JWT token
            const token = jwt.sign({ userId: user._id, email: user.email }, 'anshuman14', {
                expiresIn: '1h', // Set an expiration time for the token
            });

            // Include the token in the response
            res.status(200).json({ message: 'User registered', user, token });
        } else {
            res.status(400).json({ message: 'User registration failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports=router