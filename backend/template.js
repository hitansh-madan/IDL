const router = require('express').Router();
let Template = require('./model');

router.route('/').get((req,res)=>{
    Template.find().then(
        template =>  res.json(template)
    ).catch(
        err => console.log(err)
    )
});
