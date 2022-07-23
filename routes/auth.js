const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env['JWT_SECRET']



router.post('/signup', (req, res) => {
    const { username, password, email } = req.body
    if ( !username || !password || !email) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    else {
        User.findOne({ email: email })
            .then(doc => {
                if (doc) {
                    return res.status(422).json({ error: "User with this email already exists" })
                }
                bcrypt.hash(password, 10)
                    .then(hashedpass => {
                        const user = new User({
                            username,
                            password: hashedpass,
                            email
                        })
                        user.save()
                            .then(saveduser => {
                                res.status(200).json({ message: "saved successfully" })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }).catch((err) => {
                        console.log(err);
                    })

            }).catch((err) => {
                console.log(err);
            })
    }

})


router.route("/user/login").post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(422).json({ error: "please add username and paswsword" })
    }
    User.findOne({ email: username })
        .then(doc => {
            if (!doc) {
                return res.status(422).json({ error: "Invalid username or password" });
            }
            bcrypt.compare(password, doc.password)
                .then(doMatch => {
                    if (doMatch) {
                        console.log("doc:", doc)
                        const token = jwt.sign({ _id: doc._id }, JWT_SECRET)
                        const { _id, username, email } = doc;
                        res.json({ token, user: { _id, username, email} })
                    }
                    else {
                        return res.status(422).json({ error: "Invalid username or password" });
                    }
                })
                .catch(err => {
                    console.log('error is', err);
                })

        })
})

module.exports = router
