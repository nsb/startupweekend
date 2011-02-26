jQuery.noConflict();

(function($, $R){

  $(function() {
//     Main suggestion
    var suggestedTemplate = $("#TemplateSuggestedRoom").html();
    var t = _.template(suggestedTemplate);
    if ($R.Rooms.length) {
      var out = t($R.Rooms[0]);
      $("#suggestion").html(out)
    }
    
    var suggestionListTemplate = $("#TemplateSuggestion_list").html();
    var t = _.template(suggestionListTemplate);
    
    for (var i=0;i<$R.Rooms.length;i++){
      if (i>3) break;  
      var out = t($R.Rooms[i]);
      $("#suggestion_list").append(out);
    }
    
  });

})(jQuery, ROOMSTANT);

function priceSort($a,$b){
    if (a.price<b.price){
        return -1;
    } else if (a.price>=b.price){
        return 1;
    } else {
        return 0;
    }
}

// function sortRooms{$price,}