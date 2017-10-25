var express =require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var uc = require('./usersCtrl');

var app = express();

app.use(bodyParser.json());

app.get('/api/users', uc.getUsers);
app.get('/api/users/:userId', uc.getUserById)
app.get('/api/admins', uc.getAdmins)
app.get('/api/nonadmins', uc.getNonAdmins)
app.get('/api/user_type/:userType', uc.getUserType)
app.put('/api/users/:userId', uc.putById)
app.post('/api/users', uc.postNewUser)
app.delete('/api/users/:userId', uc.deleteUser)



var port = 3000;

app.listen(port, function(){
    console.log(`listening on port ${port}`)
})