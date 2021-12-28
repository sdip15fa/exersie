const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path')
const User = require('./user')
const methodOverride = require('method-override')
const bcrypt = require('bcrypt')
const session =require('express-session')
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(session({secret: 'notagoodsecret'}))
// view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
// router 
app.get('/dog', (req, res) => {
    res.send('dog')
})
// app.get('/users', async (req, res) => {
//     const user = await User.find({})
//     res.render('index.ejs', {user})
// })
app.get('/users/new', async (req, res) => {
    const user = await User.find({})
    res.render('new.ejs', {user})
})
// app.post('/users', async (req, res) => {
//     const newUser =new User(req.body)
//     try {
//     await newUser.save()
//     console.log(newUser)
//     res.redirect(`/users/${newUser.id}`)
//     }
//     catch(err) {
//         console.log(err)
//     }
// })
app.post('/users', async (req, res) => {
    try {
    const {password, name} = req.body
    const hash = await bcrypt.hash(password, 12)
    const user = new User({name, password:hash})
    await user.save()
    res.redirect('/game')
    }
    catch(err) {
        console.log(err)
    }
})
app.get('/login', async (req, res) => {
    res.render('login')
 })
app.get('/' , (req, res) => {
    res.redirect('login')
 })
 app.post('/login', async (req, res) => {
    try {
    const { name , password} = req.body
    const user = await User.findOne( {name})
    const vaildPassword =await bcrypt.compare(password, user.password)
    if(vaildPassword) {
        req.session.user_id = user._id
        res.render('game')
    }
else {
        res.send('try again')
    }
}catch(err) {
    res.send('try again')
}
 })
 app.post('/logout', (req , res) => {
    req.session.user_id = null
    res.redirect('/login')
 })
app.get(`/users/:id`, async (req, res) => {
    const {id} = req.params
    console.log(id)
    const user = await User.findById(id)
    res.render('find.ejs', {user})

})
app.get(`/users/:id/edit`, async (req, res) => {
    const {id} = req.params
    console.log(id)
    const user = await User.findById(id)
    res.render('edit.ejs', {user})
})
app.put(`/users/:id`, async (req, res) => {
    const {id} = req.params
    console.log(id, req.body)
    res.send('put')
})

app.get('/game',  (req, res) => {
    if(!req.session.user_id) {
        res.redirect('/login')
    }else {
    res.render('game')
}
})
app.get('/rngame',(req, res) => {
    if(!req.session.user_id) {
        res.redirect('/login')
    }
    res.render('rngame')
})   
app.get('/rcgame',(req, res) => {
    if(!req.session.user_id) {
        res.redirect('/login')
    }
    res.render('rcgame')
})
// database connection
const dbURI = 'mongodb+srv://root:fXxL32XoHVTVvbdE@cluster0.lv5ms.mongodb.net/userlist?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then(() => {
        console.log('connect database')
        
    })
    .catch((e) => {
        console.log(e)
    })
////////////

// const am = new User({name:'sSAFASF', password:'fasss'})
// console.log(am)
// am.save()

//  User.insertMany([
//     {name:'ASFASFa', password:'fasss'},
//     {name:'ASFASF', password:'fasss'},
//     {name:'ASFASF', password:'fasss'},
//     {name:'ASFASF', password:'fasss'}
//      ])
//     .then(data => {
//         console.log(data)
//  })
/////find
// User.find({}).then(data => console.log(data))
// User.find({}).then(data => console.log(data))
// User.find({name: 'aasfa'}).then(data => console.log(data))
//  User.findOneAndUpdate({name: 'ssafasf'},{password: 'aaaaaaaa'}, {new:true,runValidators:true} )
//      .then(data => console.log(data))
//      .catch(err => console.log(`wrong number ${err}` ))

app.listen(2999, () =>{
        console.log("server on http://localhost:2999/")
})
