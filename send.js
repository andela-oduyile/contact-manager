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


