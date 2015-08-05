function initialisiereSpieler(spielerGelb, spielerRot, spielerBlau, spielerGruen){
	// Initialisiere Spielerobjekte
	var spielerGelb = {
		aktiv: spielerGelb.aktiv,
		name: "",
		positionFigur1: "",
		positionFigur2: "", 
		positionFigur3: "", 
		positionFigur4: "", 
		haus1: {
			x: hausfelder[3][0].position.x,
			y: -4
		},
		haus2: {
			x: 4,
			y: -5
		},
		haus3: {
			x: 5,
			y: -4
		},
		haus4: {
			x: 5,
			y: -5
		},
		start: ""
	};

	// Setze Spieler in Hausfelder
}