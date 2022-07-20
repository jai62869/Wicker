var Firebase =('firebase');
// for hash password including cypto
var crypto = require('crypto');
var firebase = new Firebase('https://console.firebase.google.com/u/0/project/wicker-ed328/firestore/data/~2F');
var users = firebase.child('users');
//  creating object to handel requests
// defining the hash function for password
function hash (password){
    return crypto.createHash('sha512').update(password).digest('hex');
}
var router = require('express').Router();
router.use(require('body-parser').json());
router.use(require('cookie-parser')());
router.use(require('express-session')({
    resave:false,
    saveUninitialized:true,
    // saveUninitialized set true server will provide the browser with session cookie as well as save it in its memory
    secret:'asdf;sdklfsdjkfhsdkljhfjksdhfsdjhfksdhf'
    // used for incription
}));
// signup
router.post ('/api/signup',function(req,res){
    var username = req.body.username,
        password = req.body.password;
    if(!username || !password)
        return res.json({signedIn:false, message: 'NO username or password'});
    users.child(username).once('value',function(snapshot){
        if(snapshot.exists())
            return res.json({signedIn: false , message: 'username already in use'});
        var userObj={
            username: username,
            paswwordHash:hash(password)
        };    
        users.child(username).set(userObj);
        req.session.user = userObj;
        res.json({
            signedIn:true,
            user:userObj
        });
    }); 
 
});  
// sign in
router.post('/api/signin', function(req,res){
    var username = req.body.username,
        password = req.body.password;
    if(!username || !password)
        return res.json({signedIn:false, message: 'NO username or password'});    
    user.child(username).once('value', function(snapshot){
        if (!snapshot.exists() || snapshot.child('passwordHash').val() !== hash(password))
            return res.json({ signedIn: false, message: 'wrong username or password'});
        var user = snapshot.exportVal();

        req.session.user = user;
        res.json({
            signedIn: true,
            user: user
        });
    });    
});
// signout
router.post('/api/signout' , function(req, res){
    delete req.session.user;
    res.json({
        signedIn: false,
        message: 'You have been signed out'
    })
});
module.exports=router;

