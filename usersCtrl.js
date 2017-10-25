var userData = require('./userData.json');

module.exports = {

        getUsers: function (req, res){
            if(req.query.age){
                var youngUsers = userData.filter((user) => user.age < req.query.age)
                res.status(200).json(youngUsers)
                
            } else if(req.query.lastname){
                var lnMatch = userData.filter((user) => user.last_name === req.query.lastname)
                res.status(200).json(lnMatch)
            } else if (req.query.email){
                var emails = userData.filter((user) => user.email === req.query.email)
                res.status(200).json(emails)
            }
            else if (req.query.favorites){
                var favorite = userData.filter((user) => user.favorites.includes(req.query.favorites))
                res.status(200).json(favorite)
            }
            else {
                res.status(200).json(userData)
            }
        },
        getUserById: function(req, res){
            var userById = userData.filter((user) => user.id == req.params.userId)
            if(userById[0]){
                res.status(200).json(userById[0])
            }
            else {
                res.status(404).json(null);
            }
        },
        getAdmins: function(req, res){
            var adminUsers = userData.filter((user) => user.type === 'admin')
                res.status(200).json(adminUsers)
        },
        getNonAdmins: function(req, res){
            var nonAdmins = userData.filter((user) => user.type !== 'admin')
                res.status(200).json(nonAdmins)
        },
        getUserType: function(req,res){
            var userTypeMatch = userData.filter((user) => user.type === req.params.userType)
            res.status(200).json(userTypeMatch);
        },
        putById: function(req,res){
            var id = req.params.userId;
            var idIndex = userData.findIndex((user) => id == user.id)

            userData[idIndex] = {
                id: req.body.id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                gender: req.body.gender,
                language: req.body.language,
                age: req.body.age,
                city: req.body.city,
                state: req.body.state,
                type: req.body.type,
                favorites: req.body.favorites
            }

            res.status(200).json(userData);
        },
        postNewUser: function (req, res){
            var newId = userData[userData.length -1].id + 1;

            var newUser = {
                id: newId,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                gender: req.body.gender,
                language: req.body.language,
                age: req.body.age,
                city: req.body.city,
                state: req.body.state,
                type: req.body.type,
                favorites: req.body.favorites
            }

            userData.push(newUser)

            res.status(200).json(userData);

        },
        deleteUser: function(req,res){
            var deletedInd = userData.findIndex((user) => req.params.userId == user.id )
            userData.splice(deletedInd, 1)
            res.status(200).send(userData)


        }



}