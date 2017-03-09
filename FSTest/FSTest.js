var CLIENT_ID="VSDDESDCOD5QLYA10OUSGRNKPT5AYEXIZGLV01QI4Q5LYRIY";
var CLIENT_SECRET="GKSKXXWKTUEYL0PAKNUUHH5QBU2F5LW3HN5R02HRJ3HVY4SS";
var VERSION=20161016;
var request;

var results = [];

function setup() {
  createCanvas(1024,1024);
  request = {
    //ll:{lat:41.878114, lon:-87.629798},
    radius:10000,
    query: "coffee"
  };
    
    //response.groups[i].venue => {ID, Name, Contact, Location,
    //                             Categories, Verified, stats,
    //                             URL, Price, Rating, RatingColor
    //                             RatingSignals, Menu, AllowMenuUrlEdit
    //                             BeenHere, Hours, Photos, HereNow, Tips,
    //                             ReferralId
    //fetchFSData(request);
    getCurrentPosition(fetchFSData);
}

function draw() {
  background(255);
  for(var i=0; i<results.length; i++){
    translate(0,20);
    text(results[i], 0,0);
  }
}

function fetchFSData(position){
  console.log(position); 
  var url = "https://api.foursquare.com/v2/venues/search?"
             + "query=" + request.query 
             + "&ll=" + position.latitude + "%2C%20" + position.longitude
             + "&radius=" + request.radius
             + "&client_id=" + CLIENT_ID
             + "&client_secret=" + CLIENT_SECRET
             + "&v=" + VERSION;
   loadJSON(url, function(response){
     console.log(url);
     for(var i=0; i< response["response"]["venues"].length; i++){
       if(request.radius >= response["response"]["venues"][i].location.distance){
          results.push(response.response.venues[i].name + ": " + response.response.venues[i].location.distance);
          draw(); //force a draw after each item //
       }
     }
     noLoop(); //should all be drawn. Force noLoop//
   });
}