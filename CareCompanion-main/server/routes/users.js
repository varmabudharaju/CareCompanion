const router = require("express").Router();
const {User,validate} = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async(req,res)=>{
    console.log("hi");
    try{
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message});
        
        const user = await User.findOne({ email: req.body.email});

        if(user){
            return res.status(409).send({message: "User with given email already exists"});
        }

        const salt= await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);


        await new User({...req.body, password:hashPassword}).save();
        res.status(201).send({message: "User created successfully"})
    } catch(error){
        console.log(error);
         res.status(500).send({message:"Error!!"});
    }
});

router.get('/doctor/:doctorId', async (req, res) => {
    try {
      const doctorId = req.params.doctorId;
      //const records = await User.findOne({ doctorId }).populate('doctorId', 'firstName', 'lastName');
      const records = await User.findOne({email: doctorId}).populate( 'firstName',  'lastName');
      res.json(records);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });


module.exports = router;