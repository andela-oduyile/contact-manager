#!/usr/bin/env node


//require the Twilio module and create a REST client
var client = require('twilio')('AC06f7572e3d20c4abe3d3670c74ac5012', '95b5f2557f42e4fb9cd391460469e9d1');

//Send an SMS text message
client.sendMessage({

    to:'+2348060299701', // Any number Twilio can deliver to
    from: '+14694477787', // A number you bought from Twilio and can use for outbound communication
    body: 'Hello bro. How\'s it going? Send me a message on slack if you get this' // body of the SMS message

}, function(err, responseData) { 

    if (!err) {

        console.log(responseData.from); 
        console.log(responseData.body); 

    }else{
    	console.log(err);
    }
});



/*
// AfricasTalking API key - 'c120eb1f085c86d8084cedce584ac16ccff9b2a65bc9d2a3ce327ee524d5a2b9'

// We need this to build our post string
var querystring = require('querystring');
var https       = require('https');
// Your login credentials
var username = 'iamtomi14';
var apikey   = 'c120eb1f085c86d8084cedce584ac16ccff9b2a65bc9d2a3ce327ee524d5a2b9';
function sendMessage() {
    
    // Define the recipient numbers in a comma separated string
    // Numbers should be in international format as shown
    var to      = '+2348060299701';
    
    // And of course we want our recipients to know what we really do
    var message = "I'm a lumberjack and its ok, I sleep all night and I work all day";
    
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
                for (var i = 0; i < recipients.length; ++i ) {
                    var logStr  = 'number=' + recipients[i].number;
                    logStr     += ';cost='   + recipients[i].cost;
                    logStr     += ';status=' + recipients[i].status; // status is either "Success" or "error message"
                    console.log(logStr);
                    }
                } else {
                    console.log('Error while sending: ' + jsObject.SMSMessageData.Message);
            }
        });
    });
    
    // Add post parameters to the http request
    post_req.write(post_data);
    
    post_req.end();
}
//Call sendMessage method
sendMessage();

*/