#!/usr/bin/env node

var firebase = require("firebase");

// Initialize Firebase
var config = require("./config/config-firebase.js");
firebase.initializeApp(config);

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

console.log("Processing...");

function addContact() {

	var name = get('-n');
	var phone_no = get('-p');

	if(!name || !phone_no){
		console.log("Oops! something went wrong");
	}else{
		contactRef.push({
			'name': name,
			'phone_no': phone_no

		}, function(err){
			if(!err){
				console.log("Your contact has been added");
				process.exit();
			}else{
				console.log("An error occured!");
			}
		});
	}

}

addContact();