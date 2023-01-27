const User = require('./../../model/auth/user')
const bcrypt = require('bcryptjs')


exports.getLogin = (req, res) => {
    res.render('auth/login')
}



exports.postLogin = (req, res) => {
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, match) => {
                    if (err) {
                        console.log("Somthing went wrong");
                    }
                    if (match == true) {
                        session = req.session;
                        session.email = req.body.email;
                        res.redirect('/admin/dashboard')
                    } else {
                        console.log("Credintial Doesnt Match")
                    }
                })
            } else {
                console.log("No user found");
            }

        })
        .catch(err => {
            console.log(err)
        })

}

exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect("/admin/login");
}