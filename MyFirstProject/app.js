var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var methodOverride = require('method-override')
var passport = require('passport')
var LocalStrategy = require('passport-local')
var passportLocalMongoose = require('passport-local-mongoose')

app.set('view engine', "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(require('express-session')({
  secret: "This is a secret encoded message",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect('mongodb://localhost/my_blog')

//User Schema
var userSchema = new mongoose.Schema({
  username: String,
  password: String
})

userSchema.plugin(passportLocalMongoose)
var User = mongoose.model("User", userSchema)

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// User.register(new User({username: "admin"}),"AdminPassword", function(err, user) {
//   if(err) {
//     console.log(err) 
//   } else {
//     console.log('Created User!')
//     console.log(user)
  
//   }
// })

//Blog Schemas
var cblogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date , default: Date.now}
})

var sblogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date , default: Date.now}
})

//Mongoose Blog Models
var cBlog = mongoose.model("cBlog", cblogSchema)
var sBlog = mongoose.model("sBlog", sblogSchema)


// cBlog.create({
//   title: "First",
//   image: "https://www.gettyimages.com/gi-resources/images/Embed/new/embed2.jpg",
//   body: "fqfeqofiqejwqw"
// })


// sBlog.create({
//   title: "First" ,
//   image: "https://www.gettyimages.com/gi-resources/images/Embed/new/embed2.jpg",
//   body: "fqwjeqwjw;eqiojfow;"
// })



//Index Routes
app.get('/', function(req,res) {
  res.render("home")
})

app.get('/about', function(req,res) {
  res.render('about')
})

app.get('/compsci', function(req,res) {
  cBlog.find({}, function(err, cblog) {
    if(err) {
      console.log(err)
    } else {
      res.render('compsci', {cblog:cblog})
    }
  })
})

app.get('/sportsci', function(req,res) {
  sBlog.find({}, function(err, sblog) {
    if(err) {
      console.log(err) 
    } else {
      res.render('sportsci', {sblog:sblog})
    }
  })
})

app.get('/login', function(req,res) {
  res.render('login')
})

app.post('/login',passport.authenticate('local', {
  successRedirect: "/admin",
  failureRedirect: '/'
}), function(req,res) {
})

app.get('/admin', isLoggedIn, function(req,res) {
  res.render('admin')
})

app.get('/logout', function(req,res) {
  req.logout() 
  res.redirect('/')
})

//NEW Routes
//Compsci new
app.get('/compsci/new', function(req,res) {
  res.render('cnew')
})

app.post('/compsci', function(req,res) {
  cBlog.create(req.body.cblog, function(err, blog) {
    if(err) {
      console.log(err)
    } else {
      console.log("blog created")
      res.redirect('/compsci')
    }
  })
})
//Sportsci NEW
app.get('/sportsci/new', function(req,res) {
  res.render('snew')
})

app.post('/sportsci', function(req,res) {
  sBlog.create(req.body.sblog, function(err, blog) {
    if(err) {
      console.log(err)
    } else {
      console.log("blog created")
      res.redirect('/sportsci')
    }
  })
})


//SHOW Route
app.get('/compsci/:id', function(req,res) {
  cBlog.findById(req.params.id, function(err, afoundBlog) {
    if(err) {
      res.redirect('/')
    } else {
      res.render('cshow',{afoundBlog:afoundBlog})
      console.log(afoundBlog)
    }
  })
})

app.get('/sportsci/:id', function(req,res) {
  sBlog.findById(req.params.id, function(err, foundBlog) {
    if(err) {
      res.redirect('/')
    } else {
      res.render('sshow',{foundBlog:foundBlog})
      console.log(foundBlog)
    }
  })
}) 

//EDIT / UPDATE ROUTE
app.get('/compsci/:id/edit', function(req,res) {
  cBlog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      console.log(err)
    } else {
      res.render('cedit', {foundBlog:foundBlog})
    }
  })
})


app.get('/sportsci/:id/edit', function(req,res) {
  sBlog.findById(req.params.id, function(err, foundBlog) {
    if(err) {
      console.log(err)
    } else {
      res.render('sedit', {foundBlog:foundBlog})
    }
  })
})

app.put('/compsci/:id', function(req,res) {
  cBlog.findByIdAndUpdate(req.params.id, req.body.cblog, function(err, updatedBlog) {
    if(err) {
      console.log(err)
    } else {
      console.log(updatedBlog)
      res.redirect('/compsci/' + req.params.id)
      console.log('updated blog!')
    }
  })
})

app.put('/sportsci/:id', function(req,res) {
  sBlog.findByIdAndUpdate(req.params.id, req.body.sblog, function(err, updatedBlog) {
    if(err) {
      console.log(err)
    } else {
      console.log(updatedBlog)
      res.redirect('/sportsci/' + req.params.id)
      console.log('updated blog!')
    }
  })
})


//DELETE ROUTe
app.delete('/compsci/:id', function(req,res) {
  cBlog.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('Deleted')
      res.redirect('/compsci')
    }
  })
})

app.delete('/sportsci/:id', function(req,res) {
  sBlog.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('Deleted')
      res.redirect('/sportsci')
    }
  })
})

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()) {
    return next()
  }
  return res.redirect('/login')
}

//LISTEN
app.listen(3000, '0.0.0.0', function() {
  console.log('The Server is Started!')
})

