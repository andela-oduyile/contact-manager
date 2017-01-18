#!/usr/bin/env node

var firebase = require("firebase");

// Initialize Firebase
var config = {
	apiKey: "AIzaSyBvo5Y-wKqsIqJS2xKC3HGyjSIO--krl0U",
	authDomain: "contact-manager-71833.firebaseapp.com",
	databaseURL: "https://contact-manager-71833.firebaseio.com",
	storageBucket: "contact-manager-71833.appspot.com",
	messagingSenderId: "867603135513"
};
firebase.initializeApp(config);

var ref = firebase.database().ref();
var contactRef = ref.child('contact');

var names = [];
var phone_no = [];



function search(searchItem){

	if(!process.argv[2]){
		console.log("Oops! something went wrong");
		process.exit();
	}else{
		searchItem = process.argv[2];
	}

	contactRef.on('value', function(snapshot){
		var contacts = snapshot.val();
		var keys = Object.keys(contacts);
		var first_names = [];
		var last_names = [];
		var duplicates = {
			"names" : [],
			"phone_no": []
		};
		var found = false; 
		var prompt;
		var count = 0;
		var answer;
		

		for (var i = 0; i < keys.length; i++) {
			var k = keys[i];
			names.push(contacts[k].name);
			phone_no.push(contacts[k].phone_no);
		}

		for (var i = 0; i < names.length; i++) {
			first_names.push(names[i].split(" ")[0]);
			last_names.push(names[i].split(" ")[1]);
		}

		for (var i = 0; i < names.length; i++) {
			if(names[i] === searchItem){
				console.log(phone_no[i]);
				found = true;
				process.exit();
			}
			
			if(first_names[i] === searchItem || last_names[i] === searchItem){
				duplicates.names.push(first_names[i]);
				duplicates.phone_no.push(phone_no[i]);
				found = true;
			}
		}

		if(found === false){
			console.log("Contact not found");
			process.exit();
		}

		if(duplicates.names.length > 0){

			prompt = "which " + searchItem + "? ";
			// Loop through a dictionary
			for (var i =0; i < duplicates.names.length; i++) {
				count++;
				prompt += "[" + count + "]" + duplicates.names[i] + " ";
			}

			process.stdout.write(prompt + '\n');
			process.stdin.on('data', function(data){
				answer = parseInt(data);
				
				if(answer === 1){
					process.stdout.write(duplicates.phone_no[0]);
					process.exit();
				}else if(answer === 2){
					process.stdout.write(duplicates.phone_no[1]);
					process.exit();
				}else if(answer === 3){
					process.stdout.write(duplicates.phone_no[2]);
					process.exit();
				}else{
					process.stdout.write("Incorrect Option");
					process.exit();
				}
			});
		}

		
	});

}

search(process.argv[2]);