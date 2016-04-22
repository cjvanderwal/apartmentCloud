// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

//replace this with your Mongolab URL
mongoose.connect('mongodb://admin:ax84GTFgZDK42JLT@ds013931.mlab.com:13931/final_project');

// Create our Express application
var app = express();

// Use environment defined port or 4000
var port = process.env.PORT || 4000;

//Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.json());

//Default route here
var homeRoute = router.route('/');

homeRoute.get(function(req, res) {
  res.status(200).json({ message: 'Hello World!', data: [] });
});

// All our routes will start with /api
app.use('/api', router);

//Add more routes here
var User = require('./models/user.js');
//200 (success), 201 (created), 404 (not found), 500 (server error).
router.route('/users')
    .get(function(req, res) {
        var _where = null;
        var _sort = null;
        var _select = null;
        var _skip = null;
        var _limit = null;
        var _count = null;
        if(req.query.where)
          _where = eval("("+req.query.where+")");
        if(req.query.sort)
          _sort = eval("("+req.query.sort+")");
        if(req.query.select)
          _select = eval("("+req.query.select+")");
        if(req.query.skip)
          _skip = eval("("+req.query.skip+")");
        if(req.query.limit)
          _limit = eval("("+req.query.limit+")");
        if(req.query.count)
          _count = eval("("+req.query.count+")");

      User.find(function(err, users) {
            if(err)
              res.status(500).json({message:"Cannot GET users", data:err});
            else
              res.status(200).json({message:"OK", data:users});
      }).find(_where).sort(_sort).select(_select).skip(_skip).limit(_limit).count(_count);
    })
    .post(function(req, res) {
      var username = req.body.username;
      var name = req.body.name;
      var email = req.body.email;
      var pass = req.body.bcrypt_pass;

      if(name == null) {
        res.status(500).json({message:"Missing name", data:[]});
      }
      else if(email == null) {
            res.status(500).json({message:"Missing email", data:[]});
      }
      else if(username == null) {
            res.status(500).json({message:"Invalid username", data:[]});
      }
      else if(pass == null) {
            res.status(500).json({message:"Invalid e-mail", data:[]});
      }
      else {
        var user = new User();
        user.username = username;
        user.name = name;
        user.email = email;
        user.bcrypt_pass = pass;

        user.save(function(err) {
              if(err) {
                if(err.code == 11000)
                    res.status(500).json({message:"Duplicate user", data: err});
                else
                  res.status(500).json({message:"Error", data: err});
              }
              else {
                res.status(201).json({message:"User created", data: user});
              }
        });
      }

    })
    .options(function(req, res) {
      res.writeHead(200);
      res.end();
    });

router.route('/users/:id')
    .get(function(req, res) {
      User.findById(req.params.id, function(err, user) {
          if(err)
            res.status(500).json({message:"GET failed", data: err});
          else if(user == null)
            res.status(404).json({message:"User not found", data: user});
          else 
            res.status(200).json({message:"User found", data: user});
      });
    })
    .put(function(req, res) {
      User.findById(req.params.id, function(err, user) {
          if(err)
            res.status(500).json({message:"PUT failed", data: err});
          else if(user == null)
            res.status(404).json({message:"User not found", data: user})
          else {
            user.username = req.body.username;
            user.name = req.body.name;
            user.email = req.body.email;
            user.bcrypt_pass = req.body.bcrypt_pass;
            //user.favorited_ids = req.body.favorited_ids;
            user.bio = req.body.bio;
            //user.picture_id = req.body.picture_id;
            user.save(function(err) {
              if(err) {
                if(err.code == 11000)
                    res.status(500).json({message:"Duplicate e-mail", data: []});
                else
                  res.status(500).json({message:"Error", data: []});
              }
              else
                res.status(200).json({message:"User updated", data:user});
            });
          }
        
      });
    })
    .delete(function(req, res) {
  
      User.findByIdAndRemove(req.params.id, function(err, user) {
          if(err)
            res.status(500).json({message:"DELETE failed", data: err});
          else if(user == null) {
            res.status(404).json({message:"User not found", data: []});
          }
          else
            res.status(200).json({message:"User deleted", data: []});
        });
    });

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
