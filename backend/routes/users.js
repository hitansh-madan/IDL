const router = require('express').Router();
let User = require('../models/user.model')

router.route('/').get((req,res)=>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req,res)=>{
    // const obj = JSON.parse(req.body);
    const username = req.body.username;
    const newUser = new User(req.body,false);
    newUser.save()
        .then(() => res.json("user added"))
        .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;