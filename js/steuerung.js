/*
 * In dieser Datei werden Funktionen und Aktionen, die fuer die Spielmechanik und
 * Spielsteuerung noetig sind, ausgefuehrt
 */

//Globale Variablen
var spielernummer = 0;                  // Pointer auf Spieler
var counter = 0;                        // Wuerfelzaehler
var anzahlSpieler = 4;                  // Anzahl der Mitspieler
var wuerfelZahl;                        // Gewuerfelte Augenzahl
var gewuerfelt = false;                 // Sperrvariable

/*
 * Wechselt den aktuellen Spieler, Wuerfelcounter wird resetet und das
 * Spielfeld wird dementsprechend gedreht.
 */
function wechsleSpieler() {
  counter = 0;
  spielernummer = (spielernummer + 1) % anzahlSpieler;
  spielfeldDrehen(spielernummer);
  ausgabe(spielerArr[spielernummer].name + " ist an der Reihe.");
}

/*
 * Öffnet ein Overlay, in dem sich der Wuerfel aufgrund der generierten 
 * Zufallszahl dreht und anzeigt
 */
function wuerfeln() {
  if (!gewuerfelt) {
    function rad(angle) {
      return (angle + 360 * 5) / 180 * Math.PI;
    }

    // Hier ein Fenster oeffnen zum Bestaetigen zum Wuerfeln und/oder Animation
    // var zahl = Math.floor((Math.random() * 6) + 1);
    wuerfelZahl = Math.floor((Math.random() * 6) + 1);
    // wuerfelZahl = 6;
    wuerfelCube.rotation.x = 0;
    wuerfelCube.rotation.y = 0;
    wuerfelCube.rotation.z = 0;

    //Öffnet Fenster
    $('#modal_wuerfeln').modal('show');
    rendererWuerfel.setSize($('#modal_wuerfeln .modal-body').width(), 300);

    $('#modal_wuerfeln .ergebnis').html(wuerfelZahl);

    switch (wuerfelZahl) {
      case 1:
        new TWEEN.Tween(wuerfelCube.rotation).to({x: rad(0), z: rad(90), y: rad(0)}, 2000).easing(TWEEN.Easing.Elastic.Out).delay(500).start().onComplete(function() {
          show_result()
        });
        break;
      case 2:
        new TWEEN.Tween(wuerfelCube.rotation).to({x: rad(90), z: rad(0), y: rad(0)}, 2000).easing(TWEEN.Easing.Elastic.Out).delay(500).start().onComplete(function() {
          show_result()
        });
        break;
      case 3:
        new TWEEN.Tween(wuerfelCube.rotation).to({x: rad(0), z: rad(0), y: rad(0)}, 2000).easing(TWEEN.Easing.Elastic.Out).delay(500).start().onComplete(function() {
          show_result()
        });
        break;
      case 4:
        new TWEEN.Tween(wuerfelCube.rotation).to({x: rad(180), z: rad(0), y: rad(0)}, 2000).easing(TWEEN.Easing.Elastic.Out).delay(500).start().onComplete(function() {
          show_result()
        });
        break;
      case 5:
        new TWEEN.Tween(wuerfelCube.rotation).to({x: rad(-90), z: rad(0), y: rad(0)}, 2000).easing(TWEEN.Easing.Elastic.Out).delay(500).start().onComplete(function() {
          show_result()
        });
        break;
      case 6:
        new TWEEN.Tween(wuerfelCube.rotation).to({x: rad(0), z: rad(-90), y: rad(0)}, 2000).easing(TWEEN.Easing.Elastic.Out).delay(500).start().onComplete(function() {
          show_result()
        });
        break;
    }

    function show_result() {
      $("#modal_wuerfeln .ergebnis").show().css({
        opacity: '0',
        fontSize: '1em'
      }).animate({
        opacity: 0.7,
        fontSize: "28em",
      }, 1000).delay(1000).fadeOut('fast', function() {
        $('#modal_wuerfeln').modal('hide');
        ausgabe(spielerArr[spielernummer].name + " bitte Figur setzen.");
      })
    }
    if ((!spielerArr[spielernummer].figure1.aktuellePos && !spielerArr[spielernummer].figure2.aktuellePos
            && !spielerArr[spielernummer].figure3.aktuellePos && !spielerArr[spielernummer].figure4.aktuellePos) && wuerfelZahl !== 6) {
      counter++;
    }
    else {
      gewuerfelt = true;
    }
    if (counter === 3 && wuerfelZahl !== 6) {
      setTimeout(function() {
        wechsleSpieler();
      }, 5000);
    }
  }
  else
  {
    ausgabe("Bitte erst setzen");
  }

}

/*
 * Dreht das Spielfeld bzw. die Kamera um einen Wert entsprechend der Spieler-
 * anzahl und der Spielerverteilung
 * @param {int} count
 */
function spielfeldDrehen(count) {

  function KameraDrehen(x, y, z) {
    new TWEEN.Tween(camera.position)
            .to({x: x, y: y, z: z}, 2000)
            .easing(TWEEN.Easing.Quartic.InOut)
            .onUpdate(function() {
              camera.lookAt(scene.position);
            }).onComplete(function() {
      camera.lookAt(scene.position);
    }).start()
  }

  switch (count) {
    case 0:
      KameraDrehen(0, 10, 10);
      break;
    case 1:
      KameraDrehen(-10, 10, 0);
      break;
    case 2:
      KameraDrehen(0, 10, -10);
      break;
    case 3:
      KameraDrehen(10, 10, 0);
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
});

/*
 * Die Funktion ermoeglicht es den Spieler sein Huetchen anhand der gewuerfelten
 * Zahl ein Huetchen zu setzen
 * 
 * @param {int} spielernummer
 */
function setzeHut(figur) {
  if (gewuerfelt) {
    //Wandelt aus Spielernummer das Spielerobjekt
    var spieler = spielerArr[spielernummer];
    gewuerfelt = false;
    //Prueft ob es ein aktives Huetchen gibt
    if (typeof figur.aktuellePos === 'undefined') {
      //Prueft wie oft gewuerfelt und ob eine 6 gewuerfelt wurde
      if (counter < 3 && wuerfelZahl === 6) {
        var setzen = new TWEEN.Tween(figur.position).to(spielfelder[spieler.start].position, 1000).easing(TWEEN.Easing.Elastic.InOut);
        figur.aktuellePos = spieler.start;
        if (spielfelder[figur.aktuellePos].besetzt) {
          rauswerfen(figur.aktuellePos).chain(setzen).start();
        } else {
          setzen.start();
        }
        spielfelder[figur.aktuellePos].besetzt = figur;
        counter = 0;
      }
    } else {
      var tween;
      //Erstellt ein Array mit der Anwzahl benötigter Animationen
      delete spielfelder[figur.aktuellePos].besetzt;

      if (spielfelder[(figur.aktuellePos + wuerfelZahl) % spielfelder.length].besetzt) {
        tween = new Array(wuerfelZahl + 1);
      } else {
        tween = new Array(wuerfelZahl);
      }
      //Initialisiert die Animationen fuer jedes Feld
      for (var i = 0; i < tween.length; i++) {
        //Erstellt die einzelnen Animationen
        tween[i] = new TWEEN.Tween(figur.position).to(spielfelder[(figur.aktuellePos + 1) % spielfelder.length].position, 500).easing(TWEEN.Easing.Elastic.InOut);
        //Weißt das naechste Feld zu
        figur.aktuellePos = (figur.aktuellePos + 1) % spielfelder.length;
        //Erstellt die Animation fuer das Rauswerfen
        if (tween.length > wuerfelZahl && i === wuerfelZahl - 2) {
          tween[i + 1] = rauswerfen((figur.aktuellePos + 1) % spielfelder.length);
          i = i + 1;
        }
      }
      //Verkettet die Animationen
      for (var i = 0; i < tween.length - 1; i++) {
        tween[i].chain(tween[i + 1]);
      }
      //Hat der Spieler eine 6 gewuerfelt darf er nochmals wuerfeln
      if (wuerfelZahl !== 6) {
        tween[tween.length - 1].onComplete(function() {
          wechsleSpieler();
        });
      }
      //Startet die Animationen und den Setzvorgang
      tween[0].start();
      spielfelder[figur.aktuellePos].besetzt = figur;
    }
  }
}

/*
 * Erstellt und gibt eine Animation fuer das zurueckzusetzende Huetchen
 * zurueck
 * @param {int} feldnummer  Position des gegnerischen Huetchens
 * @returns {TWEEN} Animation des Rauswurfes
 */
function rauswerfen(feldnummer) {
  //Ermittle Spieler und Figur
  var spielerFigur = spielfelder[feldnummer].besetzt;
  //Animation zum Hausfeld
  var rauswurf = new TWEEN.Tween(spielerFigur.position).to(spielerFigur.hausfeld.position, 1000).easing(TWEEN.Easing.Elastic.InOut);
  //Loesche Aktivitaet
  delete spielerFigur.aktuellePos;
  return rauswurf;
}

function ausweichen(feldnummer, animation) {
  // Ermittle Spieler und Figur
  var spielerFigur = spielfelder[feldnummer].besetzt;
  // Animation zum nach oben Ausweichen
  var ausweichen = new TWEEN.Tween(spielerFigur.position).to({x: spielerFigur.position.x, y: 2, z: spielerFigur.position.z}, 500).easing(TWEEN.Easing.Elastic.InOut);
  // Animation zum zuruecksetzen
  var zurueck = new TWEEN.Tween(spielerFigur.position).to({x: spielerFigur.position.x, y: 0, z: spielerFigur.position.z}, 500).easing(TWEEN.Easing.Elastic.InOut);
  return ausweichen;
}

/*
 * Ueberprueft, ob sich ein eigenes Huetchen auf dem Ziel-Hausfeld befindet
 * @returns {boolean} false wenn es besetzt ist, true andernfalls 
 */
function pruefeFrei(hut) {

}

/*
 * Ueberprueft, ob es mit der aktuellen Wuerfelzahl moeglich ist auf ein HausFeld
 * zu gelangen
 * @returns {boolean} true wenn moeglich, false andernfalls
 */
function pruefeWeg(hut) {
  if (spielernummer === 0) {
    if ((spielerArr[spielernummer].start + 40 - wuerfelZahl) % spielfelder.length <= hut.aktuellePos
            && (hut.aktuellePos + 1 - spielfelder.length) % spielfelder.length + hausfelder[spielernummer].length <= wuerfelZahl) {
      return true;
    }
  }
  else {
    if ((spielerArr[spielernummer].start + 40 - wuerfelZahl) % spielfelder.length <= hut.aktuellePos
            && (spielerArr[spielernummer].start + 40 - hut.aktuellePos - 1 + 40) + hausfelder[spielernummer].length <= wuerfelZahl) {
      return true;
    }
  }
  return false;
}

// Maus-Events

/*
 * Maus-Over Effekt fuer die Spielfiguren. Wurde gewuerfelt und alle Bedingungen
 * sind erfuellt, so faerbt sich das zu erreichende Spielfeld, von dem sich 
 * unter dem Mauszeiger befindliche Spielerhuetchen, rot
 */
function onMouseMove(event) {
  if (gewuerfelt) {
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;


    // update the picking ray with the camera and mouse position 
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(spielfiguren.children, true);

    if (intersects.length) {
      if (spielernummer === intersects[0].object.parent.spielernummer) {
        if (typeof intersects[0].object.parent.aktuellePos === 'undefined' && wuerfelZahl === 6) {
          hover = spielerArr[spielernummer].start;
          spielfelder[hover].material.color.setHex(0xFF4C4C);
        } else {
          hover = (intersects[0].object.parent.aktuellePos + wuerfelZahl) % spielfelder.length;
          console.log(hover);
          spielfelder[hover].material.color.setHex(0xFF4C4C);
        }
      }
    } else {
      spielfelder[hover].material.color.setHex(0xffffff);
    }
  }
}


/*
 * Maus-Klick Event, das zu dem aktuellen Spieler und dessen gewuerfelte
 * Augenzahl das gewuenschte Huetchen setzt, sofern die Bedingung erfuellt 
 * werden
 */
function onMouseDown(event) {

  event.preventDefault();

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;


  // update the picking ray with the camera and mouse position 
  raycaster.setFromCamera(mouse, camera);

  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects(spielfiguren.children, true);

  if (intersects.length) {
    // Nur aktiver Spieler darf Figuren setzen
    if (spielernummer === intersects[0].object.parent.spielernummer) {
      setzeHut(intersects[0].object.parent);
      spielfelder[intersects[0].object.parent.aktuellePos].material.color.setHex(0xffffff);
    }
  }

  if(!gewuerfelt){
    ausgabe("Bitte würfeln!");
  }
}

//EventListener für Maus-Events
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onMouseDown, false);

// Ausgabe

function ausgabe(text) {
  $ausgabe = $('#ausgabe .wrap');
  $ausgabe.append('<p>' + text + '</p>');
  var offset = parseInt($ausgabe.css('top')) - 38;
  $ausgabe.animate({
    top: offset + "px",
  }, 1500);
}
