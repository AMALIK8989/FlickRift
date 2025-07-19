$(document).ready(function () {
  // Hide all seasons except Season 1 by default
  $("section[id^='Episodes']").hide();
  $("section[data-season='1']").show();

  // Handle dropdown change
  $('#season-selector').on('change', function () {
    let selectedSeason = $(this).val();
    
    // Hide all season sections
    $("section[id^='Episodes']").hide();

    // Show selected season only
    $(`section[data-season='${selectedSeason}']`).show();
  });
});
