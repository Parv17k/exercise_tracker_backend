const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req, res) => {
    let id=req.params.id;
    User.findById(id)
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
  });
router.route('/add').post((req, res) => {

const username = req.body.username;
const newUser = new User({username});
newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/delete/:id').delete((req, res) => {
    let id=req.params.id;

   User.findByIdAndDelete(id)
   .then(el=>{
       res.json({"status":"ok","desciption":"delete user "+id});
   })
   .catch(
    err => res.status(400).json('Error: ' + err))
});

router.route('/update/:id').post((req, res) => {
    let id=req.params.id;
    let data =req.body.username;

   User.findByIdAndUpdate(id)
   .then(el=>{
       el.username=data;
       el.save().then(()=>res.json({"status":"ok","desc":"update"}))
       .catch(err=>res.json(err));
   })
   .catch(
    err => res.status(400).json('Error: ' + err))
});

module.exports = router;