const User = require("../models/userdata");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const cookie=require("cookie-parser");
exports.signup = async (req, res) => {
    console.log(req.body.data);
    const { Name, email, password, phone } = req.body.data;
    try {
        if (!Name || !email || !password || !phone) {
            return res.status(400).json({
                success: false,
                message: "All field required"
            })
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "Already signup please login"
            })
        }

        let hashedpass;
        try {
            hashedpass = await bcrypt.hash(password, 10);
        } catch (e) {
            return res.status(400).json({
                success: false,
                message: "unable to hash pass"
            })

        }
        User.create({
            Name,
            phone,
            email,
            password: hashedpass,
        })
        console.log(hashedpass);
        return res.status(200).json({
            success: true,
            message: "User signup successfully"
        })
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong try again"
        })
    }
}

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body.data;
        if(!email||!password){
            return res.status(400).json({
                success: false,
                message: "fill all details"
            })
        }
        
        const user=await User.findOne({email});
       
        if(!user){
            return res.status(400).json({
                success: false,
                message: "no account found Signup"
            })
        }
        
        const payload={
            email:user.email,
            id:user._id,
        }
        if(await bcrypt.compare(password,user.password)){
           let token=jwt.sign(payload,
            "asdfgfds",
            {
                expiresIn:"3d",
            }
           )
           
        //    user=user.toObject();
        //    user.token=token;
        //    user.password=undefined;
           
           const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
           }
           
          return res.cookie("jaat",token,options).status(200).json({
             success:true,
             token,
             user,
             message:"login hoga "
           })
        }else{
            return res.status(400).json({
                success: false,
                message: "Invalid details try again"
            })
        }
    }catch(e){
        return res.status(400).json({
            success: false,
            message: "again karr"
        })
    }
}