const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const Sample = require('../models/sample')

module.exports = (app) => {
//view all users
    app.get('/user/getAll', function(req, res) {
        Sample.find(function(error, samples) {
            if (error)
                res.send(error);
            res.status(200);
            res.json(samples);
        });
    });
//Create User
    app.post('/user/create',bodyParser.json(), function(req, res) {

        var regexForEmail = /([\w.]+)@([\w\.]+)\.(\w+)/;
        var regexForPassword = ("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,14})");

        var email = req.body.email;
        var password = req.body.password;

        if( !email.trim().match(regexForEmail)){
            res.status(400);
            res.json("Email ID entered is not valid or correct. Please check entered details again.");
        }

        else if(!password.trim().match(regexForPassword)){
            res.status(400);
            res.json("Password should be 8-14 characters long. \n  Must contain an uppercase letter and a lowercase letter \n A special character and a numeric character (0-9) ");
        }

        else {
            Sample.findOne({email: email}, function(err, user){
                if(err) {
                  console.log(err);
                }
                var message;
                if(user) {
                    message = "User already exists with email: "+email;
                    res.json({message: message})
                } else {
                    var rec = new Sample(req.body);
                    rec.password = bcrypt.hashSync(req.body.password, 10);
                    rec.save(function(error, data) {
                        if (error) {
                            res.json({"message":"create failed!"});
                        }
                        res.status(201)
                        res.json(data);
                    });
                }
            });
        }
    });

    //edit users
    app.put('/user/edit',function(req,res){

        var regexForEmail = /([\w.]+)@([\w\.]+)\.(\w+)/;
        var regexForPassword = ("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,14})");

        let oldEmail = req.body.oldEmail;
        let newEmail = req.body.newEmail;

        if( !oldEmail.trim().match(regexForEmail)){
            res.status(400);
            res.json("Old Email ID entered is not valid or correct. Please check entered details again.");
        }

        if( !newEmail.trim().match(regexForEmail)){
            res.status(400);
            res.json("New Email ID entered is not valid or correct. Please check entered details again.");
        }

        else if(!req.body.newPassword.trim().match(regexForPassword)){
            res.status(400);
            res.json("New Password should be 8-14 characters long. \n  Must contain an uppercase letter and a lowercase letter \n A special character and a numeric character (0-9) ");
        }

        let newPassword = bcrypt.hashSync(req.body.newPassword, 10);

        if(newEmail && newPassword){

        Sample.findOneAndUpdate({email: oldEmail},
            {$set:{email: newEmail, password: newPassword}},
            {new: true}, (error,doc) => {
                console.log(doc);
                if(error){
                    res.json({"message":"Update failed!"});
                    console.log("Update failed!");
                }
                
                if(doc == null){
                    res.status(400);
                    res.json("No record found!! Please check entered details again");
                }
                else{
                    res.status(204);
                    res.json("Data record updated successfully and saved to Database")
                }
            })}
            else{
                res.json("New Email and Password cannot be blank. Please re-enter the details")

            }
    })

//delete users
    app.delete('/user/delete',function(req,res){
        let emailDelete = req.body.email;

        Sample.findOneAndDelete({email:emailDelete}, function(error, doc){
            if(error){
                res.json("Delete failed! Try again.");
                console.log("Delete failed!");
            }
            if(doc == null){
                res.status(400);
                res.json("No Record found!! Please check the details again.");
            }
            else{
                res.status(204);
                res.json("Data record deleted successfully with email: "+emailDelete);
            }
        });
    });

    app.post('/user/login',function(req,res){
        let email= req.body.email;
        let Password = req.body.password;

        Sample.findOne({email:email}, function(error, doc){
            if(error){
                res.json("Fetch failed");
                console.log("Fetch failed!");
            }
            if(doc == null){
                res.status(400);
                res.json("No Record found!! Please check the details again.");
            }
            else{
                bcrypt.compare(Password, doc.password, function(err, result) {
                    if(err){
                        res.status(400);
                res.json("Fetch Failed");
                    }
                    if (result) {
                      console.log("It matches!")
                      res.status(200);
                        res.json("Success");

                    }
                    else {
                      console.log("Invalid password!");
                      res.status(400);
                res.json("Invalid password!");
                    }
                  });
            }
        });
    });


}