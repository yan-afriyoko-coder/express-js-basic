const { v4: uuidv4 } = require('uuid')

const Users = require('../models/Users')

// let users = [
//     {id: 1, name: 'Daban', email:'daban@email.com'},
//     {id: 2, name: 'Yan ', email:'yan@email.com'},
// ]

module.exports = {
    index: (req, res) => {
        // // Di laravel seperti metode all()
        // Users.find({}, "name _id", function(err, users){
        //     if(err) console.log(err)

        //     console.log(users)
        //     res.render('pages/users/index', {users})
        // })

        // // Di laravel seperti menggunakan where email ...
        // Users.find({name: 'Baliho'}, function(err, users){
        //     if(err) console.log(err)

        //     res.render('pages/users/index', {users})
        // })

        // // Di laravel seperti menggunakan first() ...
        // Users.findOne({name: 'Baliho'}, function(err, users){
        //     if(err) console.log(err)

        // // Di laravel seperti query LIKE biasa digunakan di search
        let search = {}

        if(req.query.search){
            search = {name: {$regex: req.query.search}} //contoh hasil = /search/
        }
        // cara 1
        // Users.find(search, "name _id", function(err, users){
        //     if(err) console.log(err)

        //     console.log(users)
        //     res.render('pages/users/index', {users})
        // })

        // cara 2
        const query = Users.find(search)
        query.select('name _id')
        query.exec(function(err, users){
            if(err) console.log(err)

            console.log(users)
            res.render('pages/users/index', {users})
        })

        //     console.log(users)
        //     res.render('pages/users/index', {users})
        // })

        // dibawah ini diambil dari data json diatas let users
        // res.render('pages/users/index', {users})
    },

    create: (req, res) => {
        res.render('pages/users/create')
    },

    store: (req, res) => {
        // MongoDB cara 1
        // const user = new Users ({
        //     id: uuidv4(),
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: req.body.password,
        // })
        // user.save(function(err, data) {
        //     if (err) console.log(err)
        //     // saved!
        //     console.log(data)
        //     res.redirect('/users')
        // })

        // MongoDB cara 2
        Users.create({
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        },  function (err, data) {
            if (err)  console.log(err)
                // saved!
            console.log(data)
            res.redirect('/users')
        })

        // Test Json
        // users.push({
        //     id: uuidv4(),
        //     name: req.body.name,
        //     email: req.body.email,
        // })
        // console.log(users)
        // res.end()
    },

    show: (req, res) => {
        const id = req.params.id
        Users.findById(id, function(err, user){
            if(err) console.log(err)
            
            console.log(user)
            res.render('pages/users/detail', {user})
        })

        // Test Json
        // const data = users.filter(user => {
        //     return user.id == id
        //     })
        // // res.send(data)
        // // console.log(id);
        // res.render('pages/users/detail', {user: data})
    },

    edit: (req, res) => {
        const id = req.params.id
        Users.findById(id, function(err, user){
            if(err) console.log(err)
            
            console.log(user)
            res.render('pages/users/edit', {user})
        })
    },

    update: (req, res) => {
        const id = req.params.id

        Users.findById(id, function(err, user){
            if(err) console.log(err)

            if(user.id == id){
                user.name = req.body.name
                user.email = req.body.email
            }
            console.log(user)
            res.redirect('/users')
        })

        // TEST JSON
        // users.filter(user => {
        //     if(user.id == id){
        //         user.id = id
        //         user.name = req.body.name
        //         user.email = req.body.email
        
        //         return user
        //     }
        //     })
        //     res.json({
        //         status: true,
        //         data: users,
        //         message: 'Data user updated successfully!',
        //         method: req.method,
        //         url: req.url
        // })
    },
    
    destroy: (req, res) => {
        let id = req.params.userId
        users = users.filter(user => user.id != id)
        res.json({
            status: true,
            data: users,
            message: 'Data user deleted successfully!',
            method: req.method,
            url: req.url
        })
    }
}