jQuery.noConflict();

(function($, $R){

  $(function() {

    var suggestedTemplate = $("#TemplateSuggestedRoom").html();
    var t = _.template(suggestedTemplate);
    if ($R.Rooms.length) {
      var out = t($R.Rooms[0]);
      $("#suggestion").html(out)
    }

    _.each($R.Rooms, console.log);
  });

})(jQuery, ROOMSTANT);
