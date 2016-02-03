 $(document).on("click", ".myclass ul li", function() {
    var txt = $('i', this).length ? $('i', this).text() : $(this).text();
    alert( txt );
});