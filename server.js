const express = require('express');  // accessing the express library
const app = express();// app is an instance of express. 

const hbs = require('hbs'); // accessing the handle bars

const fs = require('fs');

const port = process.env.PORT || 3000;


//registering up the partials by passing its folder
//ALWAYS BE CAREFUL THAT WE SHOULD GIVE EXTENSION IN THE TERMINAL SO BROWSER WILL WORK IF THE hbs FILE HAS BEEN CHANGED
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('year', ()=>new Date().getFullYear());
hbs.registerHelper('convert', (text)=>'This is the real test'+text);//helper can be use in wider range and minimizes code repeatition


// using express middleware like we can create a folders in the browser. it takes a middleware function. Here we use built in middleware function which is express.static which is a method of express to which path to the html file is passed. __dirname gives path to the root of respective file.
app.use(express.static(__dirname+'/public'));//------------------------------
//for our own middleware we pass a function with three parameters: req, res, next to app.use.
app.use((req, res, next)=>{
    var date = new Date().toString();
    var log = `${date}:${req.method}:${req.url}`
    console.log(log);
    fs.appendFile('server.log', log+'\n',(error)=>{
        if (error){
            console.log("work is not done");
        }
    });
    next();
});

//middleware that renders the maintenence page
/*app.use((req, res, next)=>{
    res.render('maintainence.hbs');
});*/

//we are setting up the key value pairs: view engine and its value
app.set('view engine', 'hbs');
// calling the get method that has two arguments: first one the path and the second one the handler that handles the request. The handler function takes two arguments request and response. request has details of request and response has details of response.
app.get('/', (req, res)=>{
/*//    response.send('<h1>Hello express</h1>'); // sending an html document
    //sending a json data. For this we can just send an object that will displayed as a json file by the browser
    res.send({
        name: "Bhuwan Adhikari",
        skill:[
            'accounting', 'mathematics'
        ]
    });*/
    res.render('home.hbs', {
        pageName: "Homepage",
    })
});

app.get('/about', (req, res)=>{
//res.send("You should always include about page in your website.")
    res.render('about.hbs', {
        pageName: "About Page",
    });  //rendering this about.hbs of above url. and for making it dynamic we pass a object with this res.render as we did.
    
});


//rendering projects page
app.get('/projects',(req, res)=>{
   res.render('projects.hbs' , {
      pageName:'Project Page'
   });
});

//rendering blogs page 
app.get('/blogs', (req, res)=>{
   res.render('blogs.hbs', {
       pageName: "Blogs of Bhuwan Adhikari"
   });
});
 



// assigning the port to the app. It takes two parameters one of them is port number and another is callback function that triggers when the server is up.
app.listen(port, ()=>{
    console.log(`Server is up at: ${port}`);
});