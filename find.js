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



function search(){

	if(!process.argv[2]){
		console.log("Oops! something went wrong");
	}else{
		searchItem = process.argv[2];
	}

	contactRef.on('value', function(snapshot){
		var contacts = snapshot.val();
		var keys = Object.keys(contacts);

		for (var i = 0; i < keys.length; i++) {
			var k = keys[i];
			names.push(contacts[k].name);
			phone_no.push(contacts[k].phone_no);
		}


		for (var i = 0; i < names.length; i++) {
			
			//console.log(names[i].split(" "));
			if(names[i] === searchItem){
				console.log(phone_no[i]);
				break;
			}
		}
		
	});

}

search();