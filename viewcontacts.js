#!/usr/bin/env node

var firebase = require("firebase");

// Initialize Firebase
var config = require("./config/config-firebase.js");
firebase.initializeApp(config);

var ref = firebase.database().ref();
var contactRef = ref.child('contact');

console.log("Processing...");
function viewAllContacts(){

	var names = [];
	var phone_no = [];

	if(process.argv[2] === "-a" && process.argv.length === 3){
		
		contactRef.on('value', function(snapshot){
			var contacts = snapshot.val();
			var keys = Object.keys(contacts);
			var count = 0;
			var answer;

			for (var i = 0; i < keys.length; i++) {
				var k = keys[i];
				names.push(contacts[k].name);
				phone_no.push(contacts[k].phone_no);
				count++;
				console.log("[" + count + "] " + names[i]);
			}
			console.log('\n' + count + " contacts found!")
			console.log("Enter the associated number to view the phone number or type anything else to exit\n");
			process.stdin.on('data', function(data){
				response = parseInt(data)
				for (var i = 1; i <= count; i++) {
					if(response === i){
						process.stdout.write("\n" + phone_no[i-1] + "\n");
						break;
					}
				}
				process.exit();
			});
		});

	}else{
		console.log("Oops! something went wrong with your command!");
		process.exit();
	}
}

viewAllContacts();