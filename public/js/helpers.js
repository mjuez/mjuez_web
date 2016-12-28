/**
 * Helpers.js
 * 
 * @author Mario Juez.
 * @since 25/12/2016.
 */
$(document).ready(function(){
    $("#language_selector").on("change", changeLang);
    $(".icon").svgInject();
    setTimeout(hideMessages, 2000);

    /**
     * Modifies website language.
     */
    function changeLang(){
        var selectedLang = $("#language_selector").val();

        $.ajax({
            url: "lang/" + selectedLang,
            success: function(){
                location.reload();
            }
        });
    }

    function hideMessages(){
        $(".mail").slideUp(300, function(){
            $(this).remove();
        });
    }
});