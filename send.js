#!/usr/bin/env node

require('dotenv').config();
var firebase = require("firebase");

var config = require("./config/config-firebase.js");
firebase.initializeApp(config);

var querystring = require('querystring');
var https       = require('https');
 
// Your login credentials
var username = process.env.USER_NAME;
var apikey   = process.env.MESSAGE_APIKEY;


var ref = firebase.database().ref();
var contactRef = ref.child('contact');


function get(flag) {
    var index = process.argv.indexOf(flag);
    if(index === -1){
        return null;
    }else{
        return process.argv[index+1];
    }
}

var searchItem = process.argv[2];

contactRef.orderByChild('name')
.equalTo(searchItem)
.limitToFirst(1)
.on('value', function(snap) {
    var contact = snap.val();
    var keys = Object.keys(contact);
    var k = keys[0];
    var phone_no = contact[k].phone_no;

    function modifyPhoneNumber(n){
        return "+234" + n.substr(1, n.length-1);
    }


    console.log('Sending...');    
    function sendMessage() {
        
        // Define the recipient numbers in a comma separated string
        // Numbers should be in international format as shown
        var to = modifyPhoneNumber(phone_no);
        
        // And of course we want our recipients to know what we really do
        var message = get('-m');
        
        // Build the post string from an object
        
        var post_data = querystring.stringify({
            'username' : username,
            'to'       : to,
            'message'  : message
        });
        
        var post_options = {
            host   : 'api.africastalking.com',
            path   : '/version1/messaging',
            method : 'POST',
            
            rejectUnauthorized : false,
            requestCert        : true,
            agent              : false,
            
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Content-Length': post_data.length,
                'Accept': 'application/json',
                'apikey': apikey
            }
        };
        
        var post_req = https.request(post_options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                var jsObject   = JSON.parse(chunk);
                var recipients = jsObject.SMSMessageData.Recipients;
                if ( recipients.length > 0 ) {
                    console.log("Message sent!");
                    for (var i = 0; i < recipients.length; ++i ) {
                        var logStr  = 'Details: number=' + recipients[i].number;
                        logStr     += ';cost='   + recipients[i].cost;
                        logStr     += ';status=' + recipients[i].status; // status is either "Success" or "error message"
                        console.log(logStr);
                        process.exit();
                        }
                    } else {
                        console.log('Error while sending: ' + jsObject.SMSMessageData.Message);
                        process.exit();
                }
            });
        });
        
        // Add post parameters to the http request
        post_req.write(post_data);
        
        post_req.end();
    }

    sendMessage();
    
       
});

