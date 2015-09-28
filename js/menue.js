/* 
 * Dieses Script erstellt das Spielmenue, welches zu Beginn des Spiels und
 * während des Spiels aufgerufen werden kann.
 */

/*
 * Erstellt das Startmenue in dem der Spieler diverse Optionen zum Start des
 * Spiels einstellen und waehlen kann
 */

var farben_spieler = new Array(4);

$(function() {

  // Menü nach dem Laden der Seite anzeigen
  $('#menu').modal();

  // Mit der Anzahl der Spieler werden weitere Felder eingeblendet

  $('#spieleranzahl').change(function(event) {
    switch (event.target.value) {
      case '3':
        $('.spieler_3').show();
        $('.spieler_4').hide();
        break;
      case '4':
        $('.spieler_3, .spieler_4').show();
        break;
      default:
        $('.spieler_3, .spieler_4').hide();
        break;
    }
  });

  // Zeige Menue, wenn der Button Pause gedrückt wird

  $('button.pause').click(function(event) {
    $('#menu').modal('show');

    // Alte Einstellungen im Menü zurücksetzen

    $('#menu').find('.active').removeClass('active');
    $('#menu').find('.disable').removeClass('disable');
    $('#spieleranzahl').prop('selectedIndex',0);
    $('.spieler_3, .spieler_4').hide();
  });


  // Farbe für Spieler festhalten und gleiche Farbe für andere Spieler deaktivieren

  $('.spieler_farben span').each(function(index, el) {
    // Beim Klick auf die Farbe
    $(this).click(function(event) {
      // Überprüfen, ob die Farbe schon gewählt wurde
      if(!$(this).hasClass('disable')){
        var farbe = $(this).data('color');
        $(this).addClass('active');

        // Andere Farben beim Spieler deaktivieren
        $(this).parent().children().each(function(index, el) {
          if(!$(this).hasClass('active')){
            $(this).addClass('disable');
          }
        });

        // Die ausgewählte Farbe bei den anderen Spielern deaktivieren
        $('.spieler_farben span').each(function(index, el) {
          if(farbe === $(this).data('color') && !$(this).hasClass('active')){
            $(this).addClass('disable');
          }
        });
      }
    });
  });

  $('#menue_speichern').click(function(event) {
    var countSpieler = $('.spieler_farben .active').length.toString();
    if($('#spieleranzahl').val() !== countSpieler){
      $('#menu .error').fadeIn('fast');
    } else {
      $('#menu').modal('hide');
      $('#menu .error').hide();
      // Alter Spieler resten
      spielerBlau.aktiv = false;
      spielerRot.aktiv = false;
      spielerGelb.aktiv = false;
      spielerGruen.aktiv = false;
      // Gewählte Spieler suchen
      $('.spieler_farben .active').each(function(index, el) {
        var name = $(this).closest('div').find('input').val();
        switch($(this).data('color')) {
          case 'blau':
            if (name !== ''){
              spielerBlau.name = name;
            }
            spielerBlau.aktiv = true;
          break;
          case 'rot':
            if (name !== ''){
              spielerRot.name = name;
            }
            spielerRot.aktiv = true;
          break;
          case 'gelb':
            if (name !== ''){
              spielerGelb.name = name;
            }
            spielerGelb.aktiv = true;
          break;
          case 'gruen':
            if (name !== ''){
              spielerGruen.name = name;
            }
            spielerGruen.aktiv = true;
          break;
        }
      });
      anzahlSpieler = countSpieler;
      init();
    }
  });
});


