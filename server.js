// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var cookieParser = require('cookie-parser');
var session= require('express-session');
var passport = require('passport');
var morgan = require('morgan');

//replace this with your Mongolab URL
mongoose.connect('mongodb://admin:ax84GTFgZDK42JLT@ds013931.mlab.com:13931/final_project');
require('./config/passport')(passport);
// Create our Express application
var app = express();

// Use environment defined port or 4000
var port = process.env.PORT || 4000;

//Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST,HEAD, OPTIONS,PUT, DELETE");
    next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({ secret: 'FinalProject' }));

app.use(passport.initialize());
app.use(passport.session());

require('./models/routes.js')(app, passport);

function getParam(param) {
    return eval('(' + param + ')');
}

function getErrorMessage(error) {
    var message = "Error: ";

    if (!error.errors) {
        message += error.message;
    }
    else {
        var isFirstError = true;
        for (var key in error.errors) {
            if (error.errors.hasOwnProperty(key)) {
                message += (isFirstError ? "" : " " ) + error.errors[key].message;
                isFirstError = false;
            }
        }
    }

    return message;
}

//Default route here
var homeRoute = router.route('/');

homeRoute.get(function (req, res) {
    res.status(200).json({message: 'Hello World!', data: []});
});

// All our routes will start with /api
app.use('/api', router);

//Add more routes here
var User = require('./models/user.js');
//200 (success), 201 (created), 404 (not found), 500 (server error).
router.route('/users')
    .get(function (req, res) {
        var _where = null;
        var _sort = null;
        var _select = null;
        var _skip = null;
        var _limit = null;
        var _count = null;
        if (req.query.where)
            _where = eval("(" + req.query.where + ")");
        if (req.query.sort)
            _sort = eval("(" + req.query.sort + ")");
        if (req.query.select)
            _select = eval("(" + req.query.select + ")");
        if (req.query.skip)
            _skip = eval("(" + req.query.skip + ")");
        if (req.query.limit)
            _limit = eval("(" + req.query.limit + ")");
        if (req.query.count)
            _count = eval("(" + req.query.count + ")");

        User.find(function (err, users) {
            if (err)
                res.status(500).json({message: "Cannot GET users", data: err});
            else
                res.status(200).json({message: "OK", data: users});
        }).find(_where).sort(_sort).select(_select).skip(_skip).limit(_limit).count(_count);
    })
    .post(function (req, res) {
        var username = req.body.username;
        var name = req.body.name;
        var email = req.body.email;
        var pass = req.body.password;

        if (typeof name === "undefined") {
            res.status(100).json({message: "Missing name", data: []});
        }
        else if (typeof email === "undefined") {
            res.status(500).json({message: "Missing email", data: []});
        }
        else if (typeof username === "undefined") {
            res.status(500).json({message: "Invalid username", data: []});
        }
        else if (typeof pass === "undefined") {
            res.status(500).json({message: "Invalid e-mail", data: []});
        }
        else {
            var user = new User();
            user.username = username;
            user.name = name;
            user.email = email;
            user.password = pass;
            user.picture_url = req.body.picture_url;

            user.save(function (err) {
                if (err) {
                    if (err.code == 11000)
                        res.status(500).json({message: "Duplicate user", data: err});
                    else
                        res.status(500).json({message: "Error", data: err});
                }
                else {
                    res.status(201).json({message: "User created", data: user});
                }
            });
        }

    })
    .options(function (req, res) {
        res.writeHead(200);
        res.end();
    });

router.route('/users/:id')
    .get(function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err)
                res.status(500).json({message: "GET failed", data: err});
            else if (user == null)
                res.status(404).json({message: "User not found", data: user});
            else
                res.status(200).json({message: "User found", data: user});
        });
    })
    .put(function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err)
                res.status(500).json({message: "PUT failed", data: err});
            else if (user == null)
                res.status(404).json({message: "User not found", data: user})
            else {
                user.username = req.body.username;
                user.name = req.body.name;
                user.email = req.body.email;
                user.password = req.body.password;
                //user.favorited_ids = req.body.favorited_ids;
                user.bio = req.body.bio;
                user.picture_url = req.body.picture_url;
                user.save(function (err) {
                    if (err) {
                        if (err.code == 11000)
                            res.status(500).json({message: "Duplicate e-mail", data: []});
                        else
                            res.status(500).json({message: "Error", data: []});
                    }
                    else
                        res.status(200).json({message: "User updated", data: user});
                });
            }

        });
    })
    .delete(function (req, res) {

        User.findByIdAndRemove(req.params.id, function (err, user) {
            if (err)
                res.status(500).json({message: "DELETE failed", data: err});
            else if (user == null) {
                res.status(404).json({message: "User not found", data: []});
            }
            else
                res.status(200).json({message: "User deleted", data: []});
        });
    });

// Apartments
var Apartment = require('./models/apartment.js');
var Comment = require('./models/comment.js');
router.route('/apartment')
    .get(function (req, res) {
        Apartment.find(getParam(req.query.where))
            .select(getParam(req.query.select))
            .skip(req.query.skip)
            .limit(req.query.limit)
            .sort(getParam(req.query.sort))
            .exec(function (error, apartments) {
                if (error) {
                    res.status(500);
                    res.json({
                        message: getErrorMessage(error),
                        data: []
                    });
                }
                else {
                    res.json({
                        message: "OK",
                        data: apartments
                    });
                }
            });
    })
    .post(function (req, res) {
        var apartment = new Apartment();
        apartment.name = req.body.name;
        apartment.address = req.body.address;
        apartment.lat = req.body.lat;
        apartment.lon = req.body.lon;
        apartment.company = req.body.company;
        apartment.price = req.body.price;
        apartment.noOfBedroom = req.body.noOfBedroom;
        apartment.noOfBathRoom = req.body.noOfBathRoom;
        apartment.startLease = req.body.startLease;
        apartment.endLease = req.body.endLease;
        apartment.description = req.body.description;
        apartment.image = req.body.image;

        apartment.save(function (error) {
            if (error) {
                res.status(500);
                res.json({
                    message: getErrorMessage(error),
                    data: []
                });
            }
            else {
                res.status(201);
                res.json({
                    message: "Apartment added",
                    data: apartment
                });
            }
        });
    });
router.route('/apartment/:id')
    .get(function (req, res) {
        Comment.find({
            apartmentId: req.params.id
        })
            .exec(function (error, comments) {
                if (error) {
                    res.status(500);
                    res.json({
                        message: getErrorMessage(error),
                        data: []
                    });
                }
                else {
                    var totalRating = 0;
                    for (var i = 0; i < comments.length; i++) {
                        totalRating += comments[i].rating;
                    }

                    if (totalRating > 0) {
                        totalRating = Math.floor(totalRating / comments.length * 100) / 100;
                    }

                    Apartment.findById(req.params.id, function (error, apartment) {
                        if (error) {
                            res.status(500);
                            res.json({
                                message: getErrorMessage(error),
                                data: []
                            });
                        }
                        else if (apartment == null) {
                            res.status(404);
                            res.json({
                                message: "Apartment not found",
                                data: []
                            });
                        }
                        else {
                            var output = JSON.parse(JSON.stringify(apartment));
                            output['rating'] = totalRating;

                            res.json({
                                message: "OK",
                                data: output
                            });
                        }
                    });
                }
            });
    })
    .put(function (req, res) {
        Apartment.findById(req.params.id, function (error, apartment) {
            if (error) {
                res.status(500);
                res.json({
                    message: getErrorMessage(error),
                    data: []
                });

                return;
            }
            else if (apartment == null) {
                res.status(404);
                res.json({
                    message: "Apartment not found",
                    data: []
                });

                return;
            }

            apartment.name = req.body.name;
            apartment.address = req.body.address;
            apartment.lat = req.body.lat;
            apartment.lon = req.body.lon;
            apartment.company = req.body.company;
            apartment.price = req.body.price;
            apartment.noOfBedroom = req.body.noOfBedroom;
            apartment.noOfBathRoom = req.body.noOfBathRoom;
            apartment.startLease = req.body.startLease;
            apartment.endLease = req.body.endLease;
            apartment.description = req.body.description;
            apartment.image = req.body.image;

            apartment.save(function (error) {
                if (error) {
                    res.status(500);
                    res.json({
                        message: getErrorMessage(error),
                        data: []
                    });
                }
                else {
                    res.json({
                        message: "Apartment updated",
                        data: apartment
                    });
                }
            });
        });
    })
    .delete(function (req, res) {
        Apartment.findByIdAndRemove(req.params.id, function (error, apartment) {
            if (error) {
                res.status(500);
                res.json({
                    message: getErrorMessage(error),
                    data: []
                });
            }
            else if (apartment == null) {
                res.status(404);
                res.json({
                    message: "Apartment not found",
                    data: []
                });
            }
            else {
                res.json({
                    message: "Apartment deleted",
                    data: []
                });
            }
        });
    });

// Comments
router.route('/comment')
    .get(function (req, res) {
        Comment.find(getParam(req.query.where))
            .select(getParam(req.query.select))
            .skip(req.query.skip)
            .limit(req.query.limit)
            .sort(getParam(req.query.sort))
            .exec(function (error, comments) {
                if (error) {
                    res.status(500);
                    res.json({
                        message: getErrorMessage(error),
                        data: []
                    });
                }
                else {
                    res.json({
                        message: "OK",
                        data: comments
                    });
                }
            });
    })
    .post(function (req, res) {
        var comment = new Comment();
        comment.apartmentId = req.body.apartmentId;
        comment.userId = req.body.userId;
        comment.rating = req.body.rating;
        comment.title = req.body.title;
        comment.comment = req.body.comment;

        comment.save(function (error) {
            if (error) {
                res.status(500);
                res.json({
                    message: getErrorMessage(error),
                    data: []
                });
            }
            else {
                res.status(201);
                res.json({
                    message: "Comment added",
                    data: comment
                });
            }
        });
    });

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
