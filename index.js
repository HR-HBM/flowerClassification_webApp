// Requiring module 
let express = require("express"); 
let app = express(); 
let path = require("path");

// app.use(function(req,res, next) {
//   console.log(`${req.method} request for ${req.url}`);
//   next();
// });


  
// Set public as static directory 
app.use(express.static('public')); 
  
app.set('views', path.join(__dirname, '/views')) 
  
// Use ejs as template engine 
app.set('view engine', 'ejs'); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
  
// Render main template 
app.get('/',(req,res)=>{ 
    res.render('main') 
}) 
  
// Server setup 
app.listen(81, () => { 
  console.log("Server static on 81")  
});