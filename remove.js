#!/usr/bin/env node

var firebase = require("firebase");

// Initialize Firebase
var config = require("./config/config-firebase.js");
firebase.initializeApp(config);

var ref = firebase.database().ref();
var contactRef = ref.child('contact')

function getItem() {
	if(process.argv[2]){
		return process.argv[2];
	}else{
		console.log("Oops! Something went wrong with your command...");
		process.exit();
	}
}

console.log("Attempting to Delete...");

function removeItem() {

	var item = getItem();

	contactRef
	.orderByChild('name')
	.equalTo(item).
	limitToFirst(1)
	.on('child_added', function(snapshot) {
	    	snapshot.ref.remove();
	    	console.log("Deleted Succesfully");
	    	process.exit();
	});

}
removeItem();