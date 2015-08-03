/*
 * In dieser Datei werden Funktionen und Aktionen, die fuer die Spielmechanik und
 * Spielsteuerung noetig sind, ausgefuehrt
 */

//Globale Variablen
var spieler = new array[4];             //Spielerobjekte
var run = true;                         //Abbruchbedingung

/*
 * Steuert den Programmablauf
 */
function beginneSpiel(anzahl){
    if (anzahl < 2 || anzahl > 4 || anzahl instanceof Integer){
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
 * Funktion die auf Grundlage der Spieleranzahl entsprechende Objekte erzeugt
 * Aufbau des Spielerobjektes:
 *      Farbe
 *      Im Haus stehende Huete
 *      Auf dem Feld stehende Huete
 *      Name des Spielers
 *      Summe der Würfelaugen
 */
function initialisiereSpieler(anzahl, farbe, name){
    if (anzahl.length < 1 || anzahl.length > 4){
        throw "Number of Player not available. Please change it.";
    }
    if (anzahl.length === 1){
        throw "Forever alone...Get friends!";
    }
    for (i = 0; i < anzahl.length; i++){
        spieler[i] = {
            farbe: farbe[i],
            imHaus : 4,
            aufFeld : 0,
            name: name[i],
            wuerfelsumme: 0,            //Ab hier Statistik
            hatRausgeschmissen: 0,
            wurdeRausgeschmissen: 0
        };
    }
    return true;
}

/*
 * gibt Zufallszahl zwischen 1 und 6 heraus
 */
function wuerfeln(spielernummer){
    // Hier ein Fenster oeffnen zum Bestaetigen zum Wuerfeln und/oder Animation
    return Math.floor((Math.random() * 6) + 1);
}

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