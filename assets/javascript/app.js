$(document).ready(function(){
 
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAujTXLAHOFBtZxuwSC7ar1lAunMB8Eaqo",
    authDomain: "trains-7e2d2.firebaseapp.com",
    databaseURL: "https://trains-7e2d2.firebaseio.com",
    projectId: "trains-7e2d2",
    storageBucket: "trains-7e2d2.appspot.com",
    messagingSenderId: "777077444156"
  };
  firebase.initializeApp(config);

  var database= firebase.database(); 

$("button").on("click", function() {
    var name = $("#trainInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    var userTrain= {
  
      name: name,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };
  

    database.ref().push(userTrain);
  
    console.log(userTrain.name);
    console.log(userTrain.destination);
    console.log(userTrain.firstTrain);
    console.log(userTrain.frequency);
}); 

database.ref().on("child_added", function(updateData){

    // var child={
    //     name: updateData.val().name,
    //     destination:updateData.val().destination, 
    //     firstTrain:updateData.val().firstTrain,
    //     frequency:updateData.val().frequency, 
    // }
    var cName = updateData.val().name;
    var cDestination = updateData.val().destination;
    var cFrequency = updateData.val().frequency;
    var cFirstTrain = updateData.val().firstTrain;


    console.log(cName);
    console.log(cDestination);
    console.log(cFirstTrain);
    console.log(cFrequency); 
    
    var firstTime=moment(cFirstTrain,"HH,mm").subtract(1, "years"); 
    console.log(firstTime);
    var firstTMinutes= moment().diff(moment(firstTime),"minutes"); 
    console.log(firstTMinutes); 
    var timeRemaining= firstTMinutes%cFrequency;
    console.log(timeRemaining); 
    var timeUntil= cFrequency-timeRemaining; 
    var nextArrival= moment().add(timeUntil, "minutes").format("HH:mm"); 
    console.log(nextArrival); 

    tableRow= $("<tr>");
 
    tableRow.append($("<td id='appendRows'>").append(cName)); 
    tableRow.append($("<td id='appendRows'>").append(cDestination));
    tableRow.append($("<td id='appendRows'>").append(cFrequency));
    tableRow.append($("<td id='appendRows'>").append(nextArrival));
    tableRow.append($("<td id='appendRows'>").append(timeUntil));
    

    $("tbody").prepend(tableRow); 


})









});  