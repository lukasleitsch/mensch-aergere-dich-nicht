/* 
 * Dieses Script erstellt das Spielmenue, welches zu Beginn des Spiels und
 * während des Spiels aufgerufen werden kann.
 */

/*
 * Erstellt das Startmenue in dem der Spieler diverse Optionen zum Start des
 * Spiels einstellen und waehlen kann
 */

 $(function() {

    var anzahl_spieler = 2;

    // Zeige Menü nach dem Laden der Seite
    $('#menu').modal();


    // Speichern des Menüs
    $('#menue_speichern').click(function(event) {
        $('#menu').modal('hide');
    });


    /*
     * Fuer jeden Spieler oeffnet sich ein Menue in dem er seine Farbe waehlen kann
     */

     $('#spieleranzahl').change(function(event) {
         switch(event.target.value){
            case '3':
                $('.spieler_3').show();
                $('.spieler_4').hide();
                var anzahl_spieler = 3;
            break;
            case '4':
                $('.spieler_3, .spieler_4').show();
                var anzahl_spieler = 3;
            break;
            default:
                 $('.spieler_3, .spieler_4').hide();
                 var anzahl_spieler = 2;
            break;
         }
     });

     $('button.pause').click(function(event) {
        $('#menu').modal('show');
     });

     $('.spieler_farben span').each(function(index, el) {
        $(this).click(function(event) {
            $(this).parent().find('span').each(function(index, el) {
                $(this).removeClass('active');
            });
            $(this).addClass('active');
            var aktuelle_farbe = $(this).attr('class').split(' ')[0];
            var aktuelle_active = $(this).attr('class').split(' ')[1];
            console.log(aktuelle_active);
            console.log($(this));
            $('.spieler_farben span').each(function(index, el) {
                if($(this).hasClass(aktuelle_farbe) && !$(this).hasClass(aktuelle_active)) {
                    $(this).addClass('disabled');
                }
            });
        });
     });
});


/*
 * Erstellt ein Pausenmenue das während des Spiels geoeffnet und geschlossen
 * werden kann
 */
function erstelleSpielmenue() {

}


