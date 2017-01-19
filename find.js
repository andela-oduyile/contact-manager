#!/usr/bin/env node

var firebase = require("firebase");
var async = require('async');

// Initialize Firebase
var config = require("./config/config-firebase.js");
firebase.initializeApp(config);

var ref = firebase.database().ref();
var contactRef = ref.child('contact');

var names = [];
var phone_no = [];
var searchItem;


function search(){
	if(process.argv[2]){
		searchItem = process.argv[2];
	}

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

    });
    

}

module.exports.search = search;

search();