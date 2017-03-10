var CLIENT_ID="VSDDESDCOD5QLYA10OUSGRNKPT5AYEXIZGLV01QI4Q5LYRIY";
var CLIENT_SECRET="GKSKXXWKTUEYL0PAKNUUHH5QBU2F5LW3HN5R02HRJ3HVY4SS";
var VERSION=20161016;
var request;

var results = [];


function setup() {
  createCanvas(1024,1024);
  request = {
    //ll:{lat:41.878114, lon:-87.629798},
    radius:100,
    query: "food"
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
  var url = "https://api.foursquare.com/v2/venues/explore?"
             + "query=" + request.query 
             + "&ll=" + position.latitude + "%2C%20" + position.longitude
             + "&radius=" + request.radius
             + "&client_id=" + CLIENT_ID
             + "&client_secret=" + CLIENT_SECRET
             + "&v=" + VERSION;
   loadJSON(url, function(response){
     console.log(url);
     for(var i=0; i< response["response"]["groups"][0]["items"].length; i++){
       var venue = response["response"]["groups"][0]["items"][i]["venue"];
       if(request.radius >= venue.location.distance){
          results.push(venue.name + ": " + venue.location.distance);
          draw(); //force a draw after each item //
       }
     }
     noLoop(); //should all be drawn. Force noLoop//
   });
}