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


function get(flag) {
	var index = process.argv.indexOf(flag);
	if(index === -1){
		return null;
	}else{
		return process.argv[index+1];
	}
}

function addContact() {

	var name = get('-n');
	var phone_no = get('-p');

	if(!name || !phone_no){
		console.log("Oops! something went wrong");
	}else{
		contactRef.push({
			'name': name,
			'phone_no': phone_no
		});
	}

}

addContact();