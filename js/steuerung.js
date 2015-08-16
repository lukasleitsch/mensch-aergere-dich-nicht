/*
 * In dieser Datei werden Funktionen und Aktionen, die fuer die Spielmechanik und
 * Spielsteuerung noetig sind, ausgefuehrt
 */

//Globale Variablen
var spieler = new Array(4);             //Spielerobjekte
var run = true;                         //Abbruchbedingung

/*
 * Startet und initialisiert das Spiel
 * Beendet wird es durch einen Sieg oder durch beenden (run = false)
 */
function beginneSpiel(anzahl){
    rotateCamera((-90 * Math.PI / 180));
    if (anzahl <= 2 && anzahl >= 4){
        throw "Fehler, bitte erneut Versuchen.";
    }
    var spielernummer = 0;
    while(run){
        if (spieler[spielernummer].aufFeld != 0 || spieler[spielernummer].imHaus != 0){
            //Ruft erst Wuerfeln auf, dann Setzen mit der entsprechend gewuerfeltet Augenzahl
            setzen(spielernummer, wuerfeln(spielernummer));
        }
        spielernummer = (spielernummer + 1) % anzahl;
        if (pruefeFertig()){
            run = !run;
        }
    }
}

/*
 * gibt Zufallszahl zwischen 1 und 6 heraus
 */
function wuerfeln(){
    function rad(angle){
        return (angle + 360*5) / 180 * Math.PI;
    }
    // Hier ein Fenster oeffnen zum Bestaetigen zum Wuerfeln und/oder Animation
    var zahl = Math.floor((Math.random() * 6) + 1);
    wuerfelCube.rotation.x = 0;
    wuerfelCube.rotation.y = 0;
    wuerfelCube.rotation.z = 0;

    $('#modal_wuerfeln').modal('show');
    rendererWuerfel.setSize($('#modal_wuerfeln .modal-body').width(), 300);

    $('#modal_wuerfeln .ergebnis').html(zahl);

    switch(zahl) {
        case 1:
            new TWEEN.Tween(wuerfelCube.rotation).to({ x: rad(0), z: rad(90), y: rad(0)}, 2000).easing(TWEEN.Easing.Elastic.Out).delay(500).start().onComplete(function(){show_result()});
            break;
        case 2:
            new TWEEN.Tween(wuerfelCube.rotation).to({ x: rad(90), z: rad(0), y: rad(0)}, 2000).easing(TWEEN.Easing.Elastic.Out).delay(500).start().onComplete(function(){show_result()});
            break;
        case 3:
            new TWEEN.Tween(wuerfelCube.rotation).to({ x: rad(0), z: rad(0), y: rad(0)}, 2000).easing(TWEEN.Easing.Elastic.Out).delay(500).start().onComplete(function(){show_result()});
            break;
        case 4:
            new TWEEN.Tween(wuerfelCube.rotation).to({ x: rad(180), z: rad(0), y: rad(0)}, 2000).easing(TWEEN.Easing.Elastic.Out).delay(500).start().onComplete(function(){show_result()});
            break;
        case 5:
            new TWEEN.Tween(wuerfelCube.rotation).to({ x: rad(-90), z: rad(0), y: rad(0)}, 2000).easing(TWEEN.Easing.Elastic.Out).delay(500).start().onComplete(function(){show_result()});
            break;
        case 6:
            new TWEEN.Tween(wuerfelCube.rotation).to({ x: rad(0), z: rad(-90), y: rad(0)}, 2000).easing(TWEEN.Easing.Elastic.Out).delay(500).start().onComplete(function(){show_result()});
            break;
    }

    function show_result(){
        $( "#modal_wuerfeln .ergebnis" ).show().css({
            opacity: '0',
            fontSize: '1em'
        }).animate({
           opacity: 0.7,
           fontSize: "28em",
         }, 1000).delay(1000).queue(function(){
            $('#modal_wuerfeln').modal('hide');
         })
       
    }
}



$(function() {
    $('button.wuerfeln').click(function(event) {
        wuerfeln();
    });
});



function setzeHut(spielernummer){
    // Auswahl des Hutes
    // Setzen des ausgewählten Hutes
}

/*
 * Prueft ob das Spiel beendet ist. Das Spiel ist beendet sobald nurnoch 1 Spieler
 * seine Huete auf dem Spielfeld hat, waehrend die Mitspieler ihrer im Ziel haben.
 */
function pruefeFertig(){

}

/*
 * Animiert die Kamerabewegung um 90° im Uhrzeigersinn
 */
function rotateCamera() {

}

