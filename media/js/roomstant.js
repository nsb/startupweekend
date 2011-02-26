jQuery.noConflict();

(function($, $R){

  $(function() {
    renderResults();
    
  });
  
  function renderResults(){
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

    for (var i=0;i<$R.Rooms.length;i++){
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
        if (a._distance<b._distance){
            return -1;
        } else if (a._distance>=b._distance){
            return 1;
        } else {
            return 0;
        }
    }
    function starSort(a,b){
        if (a.hotel.stars<b.hotel.stars){
            return -1;
        } else if (a.hotel.stars>=b.hotel.stars){
            return 1;
        } else {
            return 0;
        }
    }

    function sortRooms(pricePreference,distancePreference,starPreference){
        if (pricePreference >= distancePreference && PricePreference>=starPreference){
            $R.Rooms.sort(priceSort);
        } else if (pricePreference>=starPreference){
            calculateDistance(rooms);
            $R.Rooms.sort(distanceSort);
        } else {
            $R.Rooms.sort(starSort);
        }
    }

    function calculateDistance(locationLat,locationLon){
        x1=locationLat;
        y1=locationLon;
        for (var i=0;i<$R.Rooms.length;i++){
            x2 = $R.Rooms[i].room.hotel.lat;
            y2 = $R.Rooms[i].room.hotel.lon;
            $R.Rooms[i]._distance = sqrt((x1-x2)^2 +(y1-y2)^2);
        }
        return;
    }
    
    function handlePreferenceChange(){
        price = $("#price_slider input").value;
        distance = $("#distance_slider input").value;
        stars = $("#stars_slider input").value*20;
        sortRooms(price,distance,stars);
        
    }
    $("#price_slider input, #distance_slider input,#stars_slider input").change(handlePreferenceChange);
    
})(jQuery, ROOMSTANT);

