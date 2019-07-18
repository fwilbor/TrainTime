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


    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
    clickCounter++;
    console.log(clickCounter);
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstTrain),
        $("<td>").text(frequency,


        ));



    // Append the new row to the table
    $("#currentTrain").append(newRow);
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










//     // Prettify the employee start
//     var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

//     // Calculate the months worked using hardcore math
//     // To calculate the months worked
//     var empMonths = moment().diff(moment(empStart, "X"), "months");
//     console.log(empMonths);

//     // Calculate the total billed rate
//     var empBilled = empMonths * empRate;
//     console.log(empBilled);

//     // Create the new row
//     var newRow = $("<tr>").append(
//         $("<td>").text(empName),
//         $("<td>").text(empRole),
//         $("<td>").text(empStartPretty),
//         $("<td>").text(empMonths),
//         $("<td>").text(empRate),
//         $("<td>").text(empBilled)
//     );

//     // Append the new row to the table
//     $("#employee-table > tbody").append(newRow);
// });



// ("#currentTrain").append("<tr class='well'><th class='trainName'> " +
//     snapshot.val().name +
//     " </th><td class='destination'> " + snapshot.val().destination +
//     " </td><td class='frequency'> " + snapshot.val().frequency +
//     " </td><td class='nextArrival'> " + moment(nextTrain).format("hh:mm") + "<td class='minutesAway'> " + tMinutesTillTrain +
//     " </td></tr>");


