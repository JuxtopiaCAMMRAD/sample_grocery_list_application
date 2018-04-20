
  // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var request = require('request');
    var https = require('https');
   
    var helmet = require('helmet');
    app.use(helmet());
    
    
    var crypto = require('crypto');

    //********************
    
    
    //PASSPORT JS 

    var passport = require('passport');
    CustomStrategy = require('passport-custom').Strategy;
    
    
    passport.use('TokenAuthStrategy',new CustomStrategy(
      function(req, done) {
          
          
                         return done(null, {user:''});

       
          if("auth_token" in req.headers && req.headers.auth_token !== ""){
               
               req.headers.auth_token === "abc123";
               
               return done(null, {user:''});

         
          }else{
            return done(null, false, { message: 'Invalid token.' });
          }
 
      }
    ));

    //MIDDLEWARE*****************

    app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth_token");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

    next();
    });
    
      
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());


   
    var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
    });

    //************************

    //MySQL
    
    var mysql = require('mysql');
    
    var pool =  mysql.createPool({
	host: "localhost",
        user: "saboor",
        password: "howard214",
        database: "grocery_list", 
        connectionLimit : 1000
  });
  
    pool.getConnection(function(err, connection){
      
        connection.query('CREATE DATABASE IF NOT EXISTS grocery_list', function (err) {
    
            if (err) throw err;
                console.log(err);

    
         connection.query('USE grocery_list', function (err) {
        
             if (err) throw err;
                console.log(err);

        
                    connection.query('CREATE TABLE IF NOT EXISTS grocery_item(GROCERY_ITEM_ID int NOT NULL AUTO_INCREMENT, PRIMARY KEY (GROCERY_ITEM_ID) , USER_ID VARCHAR(200) NOT NULL, text VARCHAR(2000), quantity int, createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);',function (err) {

                        if (err) throw err;
                            console.log(err);

                            connection.query('CREATE TABLE IF NOT EXISTS users (USER_ID VARCHAR(200) NOT NULL, email VARCHAR(40), PRIMARY KEY (USER_ID, email), password VARCHAR(200));',function (err) {

                                        connection.release();   

                                        if (err) throw err;
                                            console.log(err);
                            
                                });


                    });

         });
    });
    
    
    });
 
//Route for attempting login
app.post('/api/login',
       passport.authenticate('TokenAuthStrategy', { session: false, failureRedirect: '/access-denied'  }), 
       function(req, res) {
           
           
        //Check for required data in body of post request 
         if("email" in req.body && "password" in req.body){
  
              var sql = "SELECT * FROM users WHERE email = ? AND password = ?";
               
               //Attempt connect to MYSQL
                pool.getConnection(function(err, connection){
                   
                   //If error connecting return 400 status to client
                    if(err){
                        
                        res.status(400);
                        res.send({status: 'ERROR', message: err});
                                          
                    }else{
                   
                        //Attempt to run SQL query 
                        connection.query({
                                sql: sql,
                                timeout: 4000, // 40s
                                values: [req.body.email, req.body.password]},
                            function (err, users) {
                                        
                                      //If error running query
                                      if (err){
                                          console.log(err);
                                          res.status(400);
                                          res.send({status: 'ERROR', message: err});
                                      }else if(users.length < 1){
                                     
                                            res.status(404);
                                            res.json({status: 'ERROR', message: 'INVALID CREDENTIALS'});
                                     }else{
                                         res.status(200);
                                         res.json({status: 'SUCCESS', user: users[0]});
                                     }
                                    });
   
                    }

                });
               
                
         }else{
             res.status(400);
             res.send({status: 'ERROR', message: "INVALID PARAMETERS PROVIDED"});
             console.log("Missing Required Parameters");

         }
                           
                        
     });


//Route for creating new grocery list item
 app.post('/api/create/grocery_item',
       passport.authenticate('TokenAuthStrategy', { session: false, failureRedirect: '/access-denied'  }), 
       function(req, res) {
        
        //Check for required data in body of post request 
         if("text" in req.body && "quantity" in req.body && "user_id" in req.body){
  
              var sql = "INSERT INTO grocery_item (USER_ID,text,quantity) VALUES (?,?,?)";
               
               //Attempt connect to MYSQL
                pool.getConnection(function(err, connection){
                   
                   //If error connecting return 400 status to client
                    if(err){
                        
                        res.status(400);
                        res.send({status: 'ERROR', message: err});
                                          
                    }else{
                   
                        //Attempt to run SQL query 
                        connection.query({
                                sql: sql,
                                timeout: 4000, // 40s
                                values: [req.body.user_id, req.body.text, req.body.quantity]},
                            function (err, item) {
                                        
                                      //If error running query
                                      if (err){
                                          console.log(err);
                                          res.status(400);
                                          res.send({status: 'ERROR', message: err});
                                      }else{
                                            console.log("Printing response...");
                                            console.log(item);
                                            
                                            res.status(200);
                                            res.json({status: 'SUCCESS', payload: item});
                                    }
                                    });
   
                    }

                });
               
                
         }else{
             res.status(400);
             res.send({status: 'ERROR', message: "INVALID PARAMETERS PROVIDED"});
             console.log("Missing Required Parameters");

         }
                           
                        
     });
     
     
     //Delete a grocery item
       app.delete('/api/delete/grocery_item',
       passport.authenticate('TokenAuthStrategy', { session: false, failureRedirect: '/access-denied'  }), 
       function(req, res) {
         
         if("grocery_item_id" in req.query){
                      
                pool.getConnection(function(err, connection){
                   
                    if(err){
                        
                        res.status(400);
                        res.send({status: 'ERROR', message: err});
                                          
                    }else{
                        
                                            sql = "DELETE FROM grocery_item WHERE GROCERY_ITEM_ID = ?";
                                            connection.query({
                                                    sql: sql,
                                                    timeout: 40000, // 40s
                                                    values: [req.query.grocery_item_id]},
                                                function (err, result) {
                                                          if (err){
                                                              res.status(400);
                                                              res.send({status: 'ERROR', message: err});

                                                          }else{
                                                           console.log("1 record deleted");
                                                           res.status(200);
                                                           res.send(result);
                                                        }
                                                        });
                   
                    }

                });
       
         }else{
             res.status(400);
             res.send({status: 'ERROR', message: "INVALID PARAMETERS PROVIDED"});
         }
                               
     });
     

    app.get('/get/grocery_items/by/user',
      passport.authenticate('TokenAuthStrategy', { session: false, failureRedirect: '/access-denied'  }), 
      function(req, res) { //save additional profile data
         
        if(req.query.user_id){
            
           var sql = "SELECT * FROM grocery_item WHERE USER_ID = ?";
       
                pool.getConnection(function(err, connection){
                   
                    if(err){
                        res.status(400);
                        res.send({status: 'ERROR', message: err});
                                          
                    }else{
                   
                  connection.query({
                                sql: sql,
                                timeout: 40000, // 40s
                                values: [req.query.user_id]}, function (err, result) {
                                
                                                            connection.release();   

                                      if (err){
                                          res.status(400);
                                          res.send({status: 'ERROR', message: err});

                                      }else{
                                      
                                      res.status(200);
                                      res.json({status: 'SUCCESS', payload: result});
                                      console.log("Executed query: " + sql);
                                    }
                                    });
                   
                    }

                });

         }else{
             res.status(400);
             res.send({status: 'ERROR INVALID PARAMETERS'});
         }

     });
  
  
app.get('/access-denied', function(req, res) { //route all other  requests here
         
          res.status(401);
          res.send("<b>You are not authorized to access this resource</b>");
                               
});
 
 app.get('/*',  
 passport.authenticate('TokenAuthStrategy', { session: false, failureRedirect: '/access-denied'  }),
 function(req, res) { //route all other  requests here
         
          res.status(200);
          res.send("<b>THE SERVER IS UP RUNNING</b>");
                               
});
     
     
