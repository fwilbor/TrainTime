// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new train - then update the html + update the database
// 3. Create a way to retrieve train data from the train database database.
// 4. Create a way to calculate the Arrival Times Using difference between start and current time.
//    Then use moment.js formatting to set difference in mins.
// 5. Calculate Arrival Time

// // Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyC9lAWu61A_JVb9HfavIEm9HGbI52qQluw",
    authDomain: "train-time-ff972.firebaseapp.com",
    databaseURL: "https://train-time-ff972.firebaseio.com",
    projectId: "train-time-ff972",
    storageBucket: "",
    messagingSenderId: "785358838486",
    appId: "1:785358838486:web:88ad4cfdc63dd19f"
};
// Initialize Firebase
firebase.initializeApp(config);


// Cicking Submit Button to Add New Train

var database = firebase.database();



var clickCounter = 0

$("#submitButton").on("click", function (event) {
    event.preventDefault();
    //Grab user input
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    console.log(destination);


    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name)

    clickCounter++;
    console.log(clickCounter);

});

// Frequency at which the next train comes 
var tFrequency = 3;

// Time is 3:30 AM
var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));