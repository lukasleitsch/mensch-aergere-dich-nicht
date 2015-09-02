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
function wechsleSpieler () {
  gewuerfelt = false;
  counter = 0;
  spielernummer = (spielernummer + 1) % anzahlSpieler;
  spielfeldDrehen (spielernummer);
  ausgabe (spielerArr[spielernummer].name + " ist an der Reihe.");
  setTimeout (function () {
    ausgabe ("Bitte Würfeln.");
  }, 2000);
}

/*
 * Ã–ffnet ein Overlay, in dem sich der Wuerfel aufgrund der generierten 
 * Zufallszahl dreht und anzeigt
 */
function wuerfeln () {
  if (!gewuerfelt) {
    function rad (angle) {
      return (angle + 360 * 5) / 180 * Math.PI;
    }

    // Hier ein Fenster oeffnen zum Bestaetigen zum Wuerfeln und/oder Animation
    // var zahl = Math.floor((Math.random() * 6) + 1);
    // wuerfelZahl = Math.floor((Math.random() * 6) + 1);
    wuerfelZahl = 6;
    wuerfelCube.rotation.x = 0;
    wuerfelCube.rotation.y = 0;
    wuerfelCube.rotation.z = 0;

    //Ã–ffnet Fenster
    $ ('#modal_wuerfeln').modal ('show');
    rendererWuerfel.setSize ($ ('#modal_wuerfeln .modal-body').width (), 300);

    $ ('#modal_wuerfeln .ergebnis').html (wuerfelZahl);

    switch (wuerfelZahl) {
      case 1:
        new TWEEN.Tween (wuerfelCube.rotation).to ({x : rad (0), z : rad (90), y : rad (0)}, 2000).easing (TWEEN.Easing.Elastic.Out).delay (500).start ().onComplete (function () {
          show_result ()
        });
        break;
      case 2:
        new TWEEN.Tween (wuerfelCube.rotation).to ({x : rad (90), z : rad (0), y : rad (0)}, 2000).easing (TWEEN.Easing.Elastic.Out).delay (500).start ().onComplete (function () {
          show_result ()
        });
        break;
      case 3:
        new TWEEN.Tween (wuerfelCube.rotation).to ({x : rad (0), z : rad (0), y : rad (0)}, 2000).easing (TWEEN.Easing.Elastic.Out).delay (500).start ().onComplete (function () {
          show_result ()
        });
        break;
      case 4:
        new TWEEN.Tween (wuerfelCube.rotation).to ({x : rad (180), z : rad (0), y : rad (0)}, 2000).easing (TWEEN.Easing.Elastic.Out).delay (500).start ().onComplete (function () {
          show_result ()
        });
        break;
      case 5:
        new TWEEN.Tween (wuerfelCube.rotation).to ({x : rad (-90), z : rad (0), y : rad (0)}, 2000).easing (TWEEN.Easing.Elastic.Out).delay (500).start ().onComplete (function () {
          show_result ()
        });
        break;
      case 6:
        new TWEEN.Tween (wuerfelCube.rotation).to ({x : rad (0), z : rad (-90), y : rad (0)}, 2000).easing (TWEEN.Easing.Elastic.Out).delay (500).start ().onComplete (function () {
          show_result ()
        });
        break;
    }

    function show_result () {
      $ ("#modal_wuerfeln .ergebnis").show ().css ({
        opacity : '0',
        fontSize : '1em'
      }).animate ({
        opacity : 0.7,
        fontSize : "28em",
      }, 1000).delay (1000).fadeOut ('fast', function () {
        $ ('#modal_wuerfeln').modal ('hide');
      })
    }
    if (typeof spielerArr[spielernummer].figur1.aktuellePos === 'undefined'
            && typeof spielerArr[spielernummer].figur2.aktuellePos === 'undefined'
            && typeof spielerArr[spielernummer].figur3.aktuellePos === 'undefined'
            && typeof spielerArr[spielernummer].figur4.aktuellePos === 'undefined'
            && wuerfelZahl !== 6) {
      counter++;
      setTimeout (function () {
        ausgabe ("Noch " + (3 - counter) + " Versuche.");
      }, 4000);
    }
    else {
      gewuerfelt = true;
      setTimeout (function () {
        ausgabe ("Bitte Figur setzen.");
      }, 4000);
    }
    if (counter === 3 && wuerfelZahl !== 6) {
      setTimeout (function () {
        wechsleSpieler ();
      }, 5000);
    }
  }
  else
  {
    ausgabe ("Bitte erst setzen.");
  }

}

/*
 * Dreht das Spielfeld bzw. die Kamera um einen Wert entsprechend der Spieler-
 * anzahl und der Spielerverteilung
 * @param {int} count
 */
function spielfeldDrehen (count) {

  function KameraDrehen (x, y, z) {
    new TWEEN.Tween (camera.position)
            .to ({x : x, y : y, z : z}, 2000)
            .easing (TWEEN.Easing.Quartic.InOut)
            .onUpdate (function () {
              camera.lookAt (scene.position);
            }).onComplete (function () {
      camera.lookAt (scene.position);
    }).start ()
  }

  switch (count) {
    case 0:
      KameraDrehen (0, 11, 11);
      break;
    case 1:
      KameraDrehen (-11, 11, 0);
      break;
    case 2:
      KameraDrehen (0, 11, -11);
      break;
    case 3:
      KameraDrehen (11, 11, 0);
      break;
  }
}

/*
 * Startet ein Event wenn man den Button 'WÃ¼rfeln' drueckt
 */
$ (function () {
  $ ('button.wuerfeln').click (function (event) {
    wuerfeln ();
  });
});

/*
 * Die Funktion ermoeglicht es den Spieler sein Huetchen anhand der gewuerfelten
 * Zahl ein Huetchen zu setzen
 * 
 * @param {int} spielernummer
 */
function setzeHut (figur) {
  //Prueft ob gewuerfelt wurde
  if (gewuerfelt) {
    //Wandelt aus Spielernummer das Spielerobjekt
    var spieler = spielerArr[spielernummer];
    //Prueft ob das aktuelle ein aktives Huetchen ist
    if (typeof figur.aktuellePos === 'undefined') {
      //Prueft wie oft gewuerfelt und ob eine 6 gewuerfelt wurde
      if (counter < 3 && wuerfelZahl === 6) {
        //Setzt die Figur auf das Startfeld der entsprechenden Farbe
        var setzen = new TWEEN.Tween (figur.position).to (spielfelder[spieler.start].position, 1000).easing (TWEEN.Easing.Elastic.InOut);
        figur.aktuellePos = spieler.start;
        //Sitzt eine Figur dort, wird diese rausgeworfen
        if (spielfelder[figur.aktuellePos].besetzt) {
          rauswerfen (figur.aktuellePos).chain (setzen).start ();
        }
        else {
          setzen.start ();
        }
        spielfelder[figur.aktuellePos].besetzt = figur;
        counter = 0;
        gewuerfelt = false;
        ausgabe ("Nochmal Würfeln.");
      }
    }
    else {
      //Erstellt ein Array fuer die Animationen
      var tween = new Array ();
      //Merkvariable fuer die Anzahl der Zuege
      var merkeZahl = wuerfelZahl;
      //Ist Wuerfelzahl innerhalb des Feldes -> Keine 2te Runde oder ueber Gewinnfelder hinweg
      if (pruefeWeg (figur) && figur.aktuellePos < 1000) {
        //Aktuelle Bindung auf Spielfeld loeschen
        delete spielfelder[figur.aktuellePos].besetzt;
        while (merkeZahl > 0) {
          //Sitzt die Figur auf dem letzten Feld oder gar auf einem Gewinnfeld
          if (figur.aktuellePos >= 1000 || ((figur.aktuellePos + 1) % spielfelder.length) === spieler.start) {
            if (figur.aktuellePos >= 1000) {
              tween.push (new TWEEN.Tween (figur.position).to (gewinnfelder[spielernummer][(figur.aktuellePos + 1) % 1000].position, 500).easing (TWEEN.Easing.Elastic.InOut));
              figur.aktuellePos = figur.aktuellePos + 1;
            }
            else {
              tween.push (new TWEEN.Tween (figur.position).to (gewinnfelder[spielernummer][0].position, 500).easing (TWEEN.Easing.Elastic.InOut));
              figur.aktuellePos = 1000;
            }
          }
          else {
            //Rauswerfen sofern das letzte Feld besetzt ist
            if (merkeZahl === 1 && spielfelder[(figur.aktuellePos + 1) % spielfelder.length].besetzt) {
              tween.push (rauswerfen (figur.aktuellePos + 1));
              ausgabe ("Rausgeworfen!");
            }
            //Laesst die Figur auf einem Feld ausweichen
            if (merkeZahl !== 1 && spielfelder[(figur.aktuellePos + 1) % spielfelder.length].besetzt) {
              tween = ausweichen(tween, figur);
              merkeZahl--;
            }
            else {
              tween.push (new TWEEN.Tween (figur.position).to (spielfelder[(figur.aktuellePos + 1) % spielfelder.length].position, 500).easing (TWEEN.Easing.Elastic.InOut));
              //Weißt das naechste Feld zu
              figur.aktuellePos = (figur.aktuellePos + 1) % spielfelder.length;
            }
          }
          merkeZahl--;
        }
        //Verkettet die Animationen
        for (var i = 0; i < tween.length - 1; i++) {
          tween[i].chain (tween[i + 1]);
        }
        //Hat der Spieler eine 6 gewuerfelt darf er nochmals wuerfeln
        if (wuerfelZahl !== 6) {
          tween[tween.length - 1].onComplete (function () {
            wechsleSpieler ();
          });
        }
        else {
          tween[tween.length - 1].onComplete (function () {
            ausgabe ("Nochmal Würfeln.");
          });
        }
        //Startet die Animationen und den Setzvorgang
        tween[0].start ();
        if (figur.aktuellePos >= 1000) {
          gewinnfelder[spielernummer][figur.aktuellePos % 1000].besetzt = figur;
        }
        else {
          spielfelder[figur.aktuellePos].besetzt = figur;
        }
        gewuerfelt = false;
      }
      else {
        wechsleSpieler ();
      }
    }
  }
}

/*
 * Erstellt und gibt eine Animation fuer das zurueckzusetzende Huetchen
 * zurueck
 * @param {int} feldnummer  Position des gegnerischen Huetchens
 * @returns {TWEEN} Animation des Rauswurfes
 */
function rauswerfen (feldnummer) {
//Ermittle Spieler und Figur
  var spielerFigur = spielfelder[feldnummer].besetzt;
  //Animation zum Hausfeld
  var rauswurf = new TWEEN.Tween (spielerFigur.position).to (spielerFigur.hausfeld.position, 1000).easing (TWEEN.Easing.Elastic.InOut);
  //Loesche Aktivitaet
  delete spielerFigur.aktuellePos;
  return rauswurf;
}

function ausweichen (tween, figur) {
  // Ermittle Figur
  var ausweichendeFigur = spielfelder[figur.aktuellePos + 1].besetzt;
  // Animation zum nach oben Ausweichen, Setzen und Zuruecksetzen
  tween.push(new TWEEN.Tween (ausweichendeFigur.position).to ({x : ausweichendeFigur.position.x, y : 2, z : ausweichendeFigur.position.z}, 500).easing (TWEEN.Easing.Elastic.InOut));
  tween.push (new TWEEN.Tween (figur.position).to (spielfelder[(figur.aktuellePos + 1) % spielfelder.length].position, 500).easing (TWEEN.Easing.Elastic.InOut));
  figur.aktuellePos = (figur.aktuellePos + 1) % spielfelder.length;
  tween.push (new TWEEN.Tween (figur.position).to (spielfelder[(figur.aktuellePos + 1) % spielfelder.length].position, 500).easing (TWEEN.Easing.Elastic.InOut));
  figur.aktuellePos = (figur.aktuellePos + 1) % spielfelder.length;
  tween.push (new TWEEN.Tween (ausweichendeFigur.position).to ({x : ausweichendeFigur.position.x, y : 0, z : ausweichendeFigur.position.z}, 500).easing (TWEEN.Easing.Elastic.InOut));
  return tween;
}

function pruefeWeg (figur) {
  var spieler = spielerArr[spielernummer];
  //differenz
  var dif = (spielfelder.length + gewinnfelder[spielernummer].length) - (((figur.aktuellePos + 40 - spieler.start) % spielfelder.length) + wuerfelZahl);
  if (((figur.aktuellePos + 40 - spieler.start) % spielfelder.length) + wuerfelZahl < spielfelder.length
          || ((figur.aktuellePos + 40 - spieler.start) % spielfelder.length) + wuerfelZahl < (spielfelder.length + gewinnfelder[spielernummer].length - 1)
          && (typeof gewinnfelder[spielernummer][dif].besetzt === 'undefined')) {
    return true;
  }
  else {
    return false;
  }
}

// Maus-Events

/*
 * Maus-Over Effekt fuer die spielfigurn. Wurde gewuerfelt und alle Bedingungen
 * sind erfuellt, so faerbt sich das zu erreichende Spielfeld, von dem sich 
 * unter dem Mauszeiger befindliche Spielerhuetchen, rot
 */
function onMouseMove (event) {
  if (gewuerfelt) {
    var raycaster = new THREE.Raycaster ();
    var mouse = new THREE.Vector2 ();
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // update the picking ray with the camera and mouse position 
    raycaster.setFromCamera (mouse, camera);
    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects (spielfigurn.children, true);
    if (intersects.length) {
      if (spielernummer === intersects[0].object.parent.spielernummer) {
        if (typeof intersects[0].object.parent.aktuellePos === 'undefined' && wuerfelZahl === 6) {
          hover = spielerArr[spielernummer].start;
          spielfelder[hover].material.color.setHex (0xFF4C4C);
        } else {
          if (pruefeWeg (intersects[0].object.parent) && intersects[0].object.parent.aktuellePos < 1000) {
            if ((intersects[0].object.parent.aktuellePos + 40
                    - spielerArr[spielernummer].start) % spielfelder.length
                    + wuerfelZahl >= spielfelder.length) {
              hover = ((intersects[0].object.parent.aktuellePos + 40 - spielerArr[spielernummer].start) % spielfelder.length + wuerfelZahl) % spielfelder.length;
              gewinnfelder[spielernummer][hover].material.color.setHex (0xFF4C4C);
            }
            else {
              hover = (intersects[0].object.parent.aktuellePos + wuerfelZahl) % spielfelder.length;
              spielfelder[hover].material.color.setHex (0xFF4C4C);
            }
          }
        }
      }
    }
    else {
      if (hover < 4) {
        if (gewinnfelder[spielernummer][hover].material.color !== spielerArr[spielernummer].farbe) {
          gewinnfelder[spielernummer][hover].material.color.setHex (spielerArr[spielernummer].farbe);
        }
        else {
          spielfelder[hover].material.color.setHex (0xffffff);
        }
        spielfelder[hover].material.color.setHex (0xffffff);
      }
      else {
        spielfelder[hover].material.color.setHex (0xffffff);
      }
    }
  }
}


/*
 * Maus-Klick Event, das zu dem aktuellen Spieler und dessen gewuerfelte
 * Augenzahl das gewuenschte Huetchen setzt, sofern die Bedingung erfuellt 
 * werden
 */
function onMouseDown (event) {

  event.preventDefault ();
  var raycaster = new THREE.Raycaster ();
  var mouse = new THREE.Vector2 ();
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // update the picking ray with the camera and mouse position 
  raycaster.setFromCamera (mouse, camera);
  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects (spielfigurn.children, true);
  if (intersects.length) {
// Nur aktiver Spieler darf Figuren setzen
    if (spielernummer === intersects[0].object.parent.spielernummer) {
      setzeHut (intersects[0].object.parent);
      if (intersects[0].object.parent.aktuellePos < 1000) {
        spielfelder[intersects[0].object.parent.aktuellePos].material.color.setHex (0xffffff);
      }
      else {
        gewinnfelder[spielernummer][intersects[0].object.parent.aktuellePos % 1000].material.color.setHex (spielerArr[spielernummer].farbe);
      }
    }
  }
}

//EventListener fÃ¼r Maus-Events
window.addEventListener ('mousemove', onMouseMove, false);
window.addEventListener ('mousedown', onMouseDown, false);
// Ausgabe

function ausgabe (text) {
  $ ('#ausgabe .content').fadeOut (600, function () {
    $ (this).html (text).fadeIn (600);
  });
}
