/* 
 * Dieses Script erstellt das Spielmenue, welches zu Beginn des Spiels und
 * während des Spiels aufgerufen werden kann.
 */

/*
 * Erstellt das Startmenue in dem der Spieler diverse Optionen zum Start des
 * Spiels einstellen und waehlen kann
 */
function erstelleStartmenue() {
    var overlay = document.getElementById("overlay");
    overlay.style.visibility = "visible";
}

function schliesseStartmenue(){
    var overlay = document.getElementById("overlay");
    overlay.style.visibility = "hidden";
}

/*
 * Fuer jeden Spieler oeffnet sich ein Menue in dem er seine Farbe waehlen kann
 */
function spielerGewaehlt(e) {
    var anzahl = e.options[e.selectedIndex].value;
    var farben = ["Blau", "Gruen", "Gelb", "Rot"];
    $("#spieleranzahl").append('<select id="farbauswahl"></select>');

    switch(anzahl){
        case 1:
            $('#farbauswahl').append("Spieler 1 ");
        case 2:
            $('#farbauswahl').append("Spieler 1 ");
            $('#farbauswahl').append("Spieler 2 ");
        case 3:
            
        case 4:
    }
}

/*
 * Erstellt ein Pausenmenue das während des Spiels geoeffnet und geschlossen
 * werden kann
 */
function erstelleSpielmenue() {

}


