import User from './../models/user.js'
import express from 'express'
import bcrypt from 'bcrypt'


const userRouter = express.Router();

//add new user
//@route POST /api/users/add
userRouter.post('/add', async (req, res) => {
    try{
        const{
            username,
            password
        } = req.body;

        //digit angka mau berapa banyak
        var saltRounds = 10;
        const hashedPw = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            "username":username,
            "password": hashedPw
        });

        const createdUser = await newUser.save();
  
        res.status(201).json(createdUser);

    }
    catch(error){
        res.status(500).json({ error: error})
    }
})

//login
//@route POST /api/users/login
userRouter.post('/login', async (req, res) => {
    try{

        const{
            username,
            password
        } = req.body;
        
        const currentUser = await new Promise((resolve, reject) =>{
            User.find({"username": username}, function(err, user){
                if(err)
                    reject(err)
                resolve(user)
            })
        })
        
        //cek apakah ada user?
       if(currentUser[0]){
            //check password
            bcrypt.compare(password, currentUser[0].password).then(function(result) {
                if(result){
                    //urus token disini
                    res.status(201).json({"status":"logged in!"});
                }
                else
                    res.status(201).json({"status":"wrong password."});
            });
        }
        else{
            res.status(201).json({"status":"username not found"});
        }

    }
    catch(error){
        res.status(500).json({ error: error})
    }
})

//Get All users
//router GET /api/users/update
userRouter.get('/get', async(req, res) => {
    
    const updateUsers = await User.find({}) //kosong => if([]) =true

    if (updateUsers && updateUsers.length !== 0) {
        res.json(updateUsers)

    }else {
        res.status(404).json({
            message: 'Homeworks not found'
        })
    }
})

//get user by id
//@route GET api/users/get/:id
userRouter.get('/get/:id', async(req, res) => {

    const getUser = await User.findById(req.params.id)

    if (getUser) {
        res.json(getUser)

    }else {
        res.status(404).json({
            message: 'User not found'
        })
    }
})

//updat users
//@route PUT/api/users/update
userRouter.put('/update/:id', async(req,res) => {

    const {username, password} = req.body

    const updateUser = await User.findById(req.params.id)

    if (updateUser) {
        updateUser.username = username;
        updateUser.password = password;

        const updateUsers = await updateUser.save()

        res.json(updateUsers)

    }else {
        res.status(404).json({
            message: 'Homework not found'
        })
    }
})

//delete user by id
//@route DELETE /api/users/delete/:id
userRouter.delete('/delete/:id', async(req, res) => {

    const deleteUser = await User.findById(req.params.id)

    if(deleteUser) {
        await deleteUser.remove()
        res.json({
            message: 'User removed'
        })

    }else {
        res.status(404).json({
            message: 'User not found'
        })
    }
})

//delete all users
//@route /api/users/delete
userRouter.delete('/delete', async(req, res) => {

    if (User) {
        await User.remove({})
        res.json({
            message: "All users removed"
        })

    }else {
        res.status(404).json({
            message: 'Homeworks not found'
        })
    }
})

export default userRouter;