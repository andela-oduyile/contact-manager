#!/usr/bin/env node

var firebase = require("firebase");
var async = require('async');

// Initialize Firebase
var config = require("./config/config-firebase.js");
firebase.initializeApp(config);

var ref = firebase.database().ref();
var contactRef = ref.child('contact');

function getSearchItem() {
	if(process.argv[2]){
		return process.argv[2];
	}else{
		console.log("Oops! Something went wrong...");
		process.exit();
	}
}

function promptUserForInput(duplicates, searchItem){
	var prompt;
	var count = 0;
	var answer;

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
			
			for (var i = 0; i < duplicates.names.length; i++) {
				if(answer === i+1){
					process.stdout.write(duplicates.phone_no[i]);
					process.exit();
				}
			}
			
			process.stdout.write("Incorrect Option");
			process.exit();
			
		});
	}	
}


function checkIfItemIsFound(names, duplicates, phone_no, first_names, last_names, searchItem){
	for (var i = 0; i < names.length; i++) {
		if(names[i] === searchItem){
			console.log(phone_no[i]);
			process.exit();
		}
		
		if(first_names[i] === searchItem || last_names[i] === searchItem){
			duplicates.names.push(last_names[i]);
			duplicates.phone_no.push(phone_no[i]);
			found = true;
		}
	}

	if(found === false){
		console.log("Contact not found");
		process.exit();
	}
}

function addItems(names, first_names, last_names, contacts, phone_no, keys){
	//This function adds names and phone_no to the array

	for (var i = 0; i < keys.length; i++) {
		var k = keys[i];
		names.push(contacts[k].name);
		phone_no.push(contacts[k].phone_no);
	}

	for (var i = 0; i < names.length; i++) {
		first_names.push(names[i].split(" ")[0]);
		last_names.push(names[i].split(" ")[1]);
	}
}

console.log("Searching...");

function search() {
	var searchItem = getSearchItem();

	var names = [];
	var phone_no = [];

	contactRef.orderByChild('name')
    .startAt(searchItem)
    .endAt(searchItem + '\uf8ff')
    .on('value', function(snap) {
    	var contacts = snap.val();
    	var keys = Object.keys(contacts);
    	var first_names = [];
		var last_names = [];
		var duplicates = {
			"names" : [],
			"phone_no": []
		};
		var found = false; 
		
		addItems(names, first_names, last_names, contacts, phone_no, keys);

		checkIfItemIsFound(names, duplicates, phone_no, first_names, last_names, searchItem);

		promptUserForInput(duplicates, searchItem);

    });
 
}

module.exports.search = search;

search();



