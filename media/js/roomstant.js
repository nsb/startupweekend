jQuery.noConflict();

(function($, $R){

  $(function() {
    renderResults();
    
  });
  
  function renderResults(){
    console.log("render");
      // Main suggestion
    var suggestedTemplate = $("#TemplateSuggestedRoom").html();
    var t = _.template(suggestedTemplate);
    if ($R.Rooms.length) {
      var out = t($R.Rooms[0]);
      $("#suggestion").html(out)
    }
    //suggestion list
    var suggestionListTemplate = $("#TemplateSuggestion_list").html();
    var t = _.template(suggestionListTemplate);
    $("#suggestion_list").html("");
    for (var i=1;i<$R.Rooms.length;i++){
      if (i>3) break;  
      var out = t($R.Rooms[i]);
      $("#suggestion_list").append(out);
    }
  }


  function priceSort(a,b){
    if (a.price<b.price){
        return -1;
    } else if (a.price>=b.price){
        return 1;
    } else {
        return 0;
    }    
  }
  
    function distanceSort(a,b){
        if (a.distance<b.distance){
            return -1;
        } else if (a.distance>=b.distance){
            return 1;
        } else {
            return 0;
        }
    }
    function starSort(a,b){
        if (a.room.hotel.stars<b.room.hotel.stars){
            return -1;
        } else if (a.room.hotel.stars>=b.room.hotel.stars){
            return 1;
        } else {
            return 0;
        }
    }

    function sortRooms(pricePreference,distancePreference,starPreference){
        if (pricePreference >= distancePreference && pricePreference>=starPreference){
            $R.Rooms.sort(priceSort);
        } else if (distancePreference>=starPreference){
            calculateDistance();
            $R.Rooms.sort(distanceSort);
        } else {
            a=2;
            //bla
            $R.Rooms.sort(starSort);
            $R.Rooms.reverse(); //we want the 5 stars first.
        }
    }

    function calculateDistance(locationLat,locationLon){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                $R.lat = position.coords.latitude;
                $R.lon = position.coords.longitude;
//                 console.log("Your position: "+lat+", "+lng);
        })} else {console.log("cant calculate position.")}
        x1=$R.lat;
        y1=$R.lon;
        for (var i=0;i<$R.Rooms.length;i++){
            x2 = $R.Rooms[i].room.hotel.lat;
            y2 = $R.Rooms[i].room.hotel.lon;
            $R.Rooms[i].distance = Math.sqrt((x1-x2)^2 +(y1-y2)^2);
        }
        return;
    }
    var t;
    document.render = renderResults;

    function handlePreferenceChange(){
//         myprice = document.getElementsByName("price_slider").value;
//         console.log(myprice);
        price = $("#price_slider input").val();
        distance = $("#distance_slider input").val();
        stars = $("#stars_slider input").val()*20;
        sortRooms(price,distance,stars);
        if (t) clearTimeout(t);
        t= setTimeout("document.render();",200);
    }
    $("#price_slider input, #distance_slider input,#stars_slider input").change(handlePreferenceChange);
    handlePreferenceChange();
    
    
})(jQuery, ROOMSTANT);

