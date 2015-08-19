/*
 * In dieser Datei werden Funktionen und Aktionen, die fuer die Spielmechanik und
 * Spielsteuerung noetig sind, ausgefuehrt
 */

//Globale Variablen
var spielernummer = 3;                  //Pointer auf Spieler
var counter = 0;

/*
 * Startet und initialisiert das Spiel
 * Beendet wird es durch einen Sieg oder durch beenden (run = false)
 */
function wechsleSpieler(){
    //Bedinung pruefen ob Spiel beendet ist
    if (pruefeFertig()){
        run = !run;
    }
    counter = 0;
    spielernummer = (spielernummer + 1) % 4;
    spielfeldDrehen(spielernummer);
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
         }, 1000).delay(1000).fadeOut('fast', function(){
            $('#modal_wuerfeln').modal('hide');
         })
    }
    //Verzögerung zu Testzwecken
    setTimeout(function(){
        setzeHut(spielernummer, zahl);
    }, 5000);
}

/*
 * Dreht das Spielfeld bzw. die Kamera um einen Wert entsprechend der Spieler-
 * anzahl und der Spielerverteilung
 * @param {int} count
 */
function spielfeldDrehen(count){

    function KameraDrehen(x, y, z){
        new TWEEN.Tween (camera.position)
                .to ({ x: x, y: y, z: z}, 2000)
                .easing(TWEEN.Easing.Quartic.InOut)
                .onUpdate(function () {
                    camera.lookAt(scene.position);
                }).onComplete(function () {
                    camera.lookAt(scene.position);
                }).start()
    }

    switch(count) {
        case 0:
            KameraDrehen(10,10,0);
            count++;
            break;        
        case 1:
            KameraDrehen(0,10,-10);
            count++;
            break;        
        case 2:
            KameraDrehen(-10,10,0);
            count++;
            break;        
        case 3:
            KameraDrehen(0,10,10);
            count = 0;
            break;
    }
}

/*
 * Startet ein Event wenn man den Button 'Würfeln' drueckt
 */
$(function() {
    $('button.wuerfeln').click(function(event) {
        wuerfeln();
    });

    $('button.drehen').click(function(event) {
        //setzeHut(spielerGelb, 5);
        spielfeldDrehen();
    });
});

/*
 * Die Funktion ermoeglicht es den Spieler sein Huetchen anhand der gewuerfelten
 * Zahl ein Huetchen zu setzen
 * 
 * @param {int} spielernummer
 */
function setzeHut(spielernummer, zahl){
    //Wandelt aus Spielernummer das Spielerobjekt
    var spieler = spielerArr[spielernummer];
    //Prueft ob es ein aktives Huetchen gibt
    if(!spieler.figure1.aktuellePos){
        //Prueft wie oft gewuerfelt und ob eine 6 gewuerfelt wurde
        if(counter < 3 && zahl === 6){
            new TWEEN.Tween(spieler.figure1.position).to(spielfelder[spieler.start].position, 1000).easing(TWEEN.Easing.Elastic.InOut).start();
            spieler.figure1.aktuellePos = spieler.start; 
        }
        counter++;
        if(counter === 3 && zahl !== 6){
            wechsleSpieler();
        }
    }
    else{
        var tween = new Array(zahl);
        for( var i = 0; i < zahl; i++){
            //Erstellt die einzelnen Animationen
            tween[i] = new TWEEN.Tween(spieler.figure1.position).to(spielfelder[(spieler.figure1.aktuellePos + 39) % spielfelder.length].position, 500).easing(TWEEN.Easing.Elastic.InOut);
            //Weißt das naechste Feld zu
            spieler.figure1.aktuellePos = (spieler.figure1.aktuellePos + 39) % spielfelder.length;
        } 
     
        for( var i = 0; i < zahl - 1; i++){
            tween[i].chain(tween[i+1]);
            
            if(i === zahl - 2 && zahl !== 6){
                tween[i + 1].onComplete(function() {
                    wechsleSpieler();
                })
            }
        }
        tween[0].start();
    }
 
}

/*
 * Prueft ob das Spiel beendet ist. Das Spiel ist beendet sobald nurnoch 1 Spieler
 * seine Huete auf dem Spielfeld hat, waehrend die Mitspieler ihrer im Ziel haben.
 */
function pruefeFertig(){

}
