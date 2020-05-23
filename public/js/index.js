
$(document).ready(() => {
  var simplemde = new SimpleMDE({ element: document.getElementById("md"),toolbar: ['bold','italic','heading','|','code','quote','unordered-list','ordered-list','|', 'link','image','|','preview','side-by-side','fullscreen','|','guide']})

  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  })

  $('#dismiss, .overlay').on('click', function () {
    // hide sidebar
    $('#sidebar').removeClass('active')
    // hide overlay
    $('.overlay').removeClass('active')
  })

  $('#sidebarCollapse').on('click', function () {
    // open sidebar
    $('#sidebar').addClass('active')
    // fade in the overlay
    $('.overlay').addClass('active')
    $('.collapse.in').toggleClass('in')
    $('a[aria-expanded=true]').attr('aria-expanded', 'false')
  })
})




