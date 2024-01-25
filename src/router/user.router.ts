import { Router } from "express";
import { sample_shoes, sample_users } from "../data";
import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/user.model";
import asynceHandler from 'express-async-handler'; 
import { http_bad_request } from "../constants/http_statu";
import bcrypt from 'bcryptjs';


const  router = Router();

router.get("/Craze", asynceHandler(
  async(req, resp)=>{
    const shoeCount = await UserModel.countDocuments();
    if(shoeCount>0){
      resp.send("Data Already Inserted!");
      return 
    }
    await UserModel.create(sample_users);
    resp.send(sample_users);
  }
 
)
);

router.post("/api/users/login", asynceHandler(async (req, resp) => {
  const body = req.body;
  const { email, password } = body;
  const user =  await UserModel.find(
    (user: { email: any; password: any; }) => user.email === email && user.password === password
  );

  if (user) {
    resp.send(generateTokenResposne(user));
  }
  else{
    resp.status(400).send("Username Or password is not valid!")
  }
}));
  
  // router.post('/signup', asynceHandler(async(req,resp)=>{
  //   const {username , email , password}=req.body;
  //   const user=  await UserModel.findOne({email});
    
  //   if(user){
  //     resp.status(http_bad_request).send('User already exist, Please Login!');
  //     return;
  //   }
   
  //  const encryptpassword = await bcrypt.hash(password, 10);
   
  //  const newUser:User={
  //    id: '',
  //    email: email.toLowerCase(),
  //    password: encryptpassword,
  //    isAdmin: false,
  //    name: "",
  //    token: ""
  //  }

  //  const dbUser = await UserModel.create(newUser);
  //  resp.send(generateTokenResposne)

  // }))

  const generateTokenResposne = (user: any) => {
    const token = jwt.sign(
      {
        email: user.email,
        isAdmin: user.isAdmin,
      },
      "Sometxt",
      {
        expiresIn: "30d",
      }
    );
    user.token = token;
    return user;
  };
  export default router;


  