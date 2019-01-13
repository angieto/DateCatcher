
const User = require("./model");

module.exports = {
    Register: (req,res) =>User.create(req.body)
                            .then(data=>console.log("Register success") || res.json(data))
                            .catch(errs=>console.log("Register error") || res.json(errs)),
    Login:(req,res) =>User.findOne({"email" :req.body.email, "password" : req.body.password})
                            .then(data=>console.log("Login  success") || res.json(data))
                            .catch(errs=>console.log("Login error") || res.json(errs)),
    GetLoginUser:(req,res)=>User.findOne(req.body)
                            .then(data=>console.log("Get Login User success") || res.json(data))
                            .catch(errs=>console.log("Get Login User success") || res.json(errs)),
    GetUser:(req,res) =>User.findById(req.params.id)                 
                            .then(data=>console.log("get one User success") || res.json(data))
                            .catch(errs=>console.log("get one User error") || res.json(errs)),
    GetUsers:(req,res)=>User.find({'city' : req.params.city})
                            .then(data=>console.log("Get all User success") || res.json(data))
                            .catch(errs=>console.log("Get All User error") || res.json(errs)),
    CreateDate:(req,res)=>User.findByIdAndUpdate(req.params.user1_id,{$push:{Date: req.body}}, {new :true})
                            .then(data=>console.log("Create Date User success") || res.json(data))
                            .catch(errs=>console.log("Create Date User error") || res.json(errs)),
    UpdateUserDate:(req,res)=>User.findByIdAndUpdate(req.params.user2_id,{$push:{Date: req.body}})
                            .then(data=>console.log("Update User Date success") || res.json(data))
                            .catch(errs=>console.log("Update User Date error") || res.json(errs)),
    RemoveDate:(req,res)=>User.findOneAndUpdate({"Date._id" : req.params.date_id},
                            {$pull : {"Date" : {"_id" : req.params.date_id}}}, {new:true})
                            .then(data=>console.log("Create Date User success") || res.json(data))
                            .catch(errs=>console.log("Create Date User error") || res.json(errs)),
}
                            