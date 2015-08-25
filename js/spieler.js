var spielerArr = new Array(4);             //Spielerobjekte

// Initialisiere SpielerBlau
var spielerBlau = {
	aktiv: "",
	name: "",
	farbe: 0x2600FF,
	haus1: {
		x: hausfelder[1][0].position.x,
		y: hausfelder[1][0].position.z
	},
	haus2: {
		x: hausfelder[1][1].position.x,
		y: hausfelder[1][1].position.z
	},
	haus3: {
		x: hausfelder[1][2].position.x,
		y: hausfelder[1][2].position.z
	},
	haus4: {
		x: hausfelder[1][3].position.x,
		y: hausfelder[1][3].position.z
	},
	start: 18
};

// Setze SpielerBlau in Hausfelder

spielerBlau.figure1 = spielfigure(spielerBlau.farbe, spielerBlau.haus1.x, spielerBlau.haus1.y);
spielerBlau.figure1.hausfeld = hausfelder[1][0];

spielerBlau.figure2 = spielfigure(spielerBlau.farbe, spielerBlau.haus2.x, spielerBlau.haus2.y);
spielerBlau.figure2.hausfeld = hausfelder[1][1];

spielerBlau.figure3 = spielfigure(spielerBlau.farbe, spielerBlau.haus3.x, spielerBlau.haus3.y);
spielerBlau.figure3.hausfeld = hausfelder[1][2];

spielerBlau.figure4 = spielfigure(spielerBlau.farbe, spielerBlau.haus4.x, spielerBlau.haus4.y);
spielerBlau.figure4.hausfeld = hausfelder[1][3];


// Spieler wird Spieler-Array hinzugefügt
spielerArr[0] = spielerBlau;

// Initialisiere SpielerRot
var spielerRot = {
	aktiv: "",
	name: "",
	farbe: 0xFF0000,
	haus1: {
		x: hausfelder[0][0].position.x,
		y: hausfelder[0][0].position.z
	},
	haus2: {
		x: hausfelder[0][1].position.x,
		y: hausfelder[0][1].position.z
	},
	haus3: {
		x: hausfelder[0][2].position.x,
		y: hausfelder[0][2].position.z
	},
	haus4: {
		x: hausfelder[0][3].position.x,
		y: hausfelder[0][3].position.z
	},
	start: 8
};

// Setze SpielerRot in Hausfelder und weise hausfelder den Hueten zu

spielerRot.figure1 = spielfigure(spielerRot.farbe, spielerRot.haus1.x, spielerRot.haus1.y);
spielerRot.figure1.hausfeld = hausfelder[0][0];

spielerRot.figure2 = spielfigure(spielerRot.farbe, spielerRot.haus2.x, spielerRot.haus2.y);
spielerRot.figure2.hausfeld = hausfelder[0][1];

spielerRot.figure3 = spielfigure(spielerRot.farbe, spielerRot.haus3.x, spielerRot.haus3.y);
spielerRot.figure3.hausfeld = hausfelder[0][2];

spielerRot.figure4 = spielfigure(spielerRot.farbe, spielerRot.haus4.x, spielerRot.haus4.y);
spielerRot.figure4.hausfeld = hausfelder[0][3];

// Spieler wird Spieler-Array hinzugefügt
spielerArr[1] = spielerRot;


// Initialisiere SpielerGeld
var spielerGelb = {
	aktiv: "",
	name: "",
	farbe: 0xFFFC00, 
	haus1: {
		x: hausfelder[3][0].position.x,
		y: hausfelder[3][0].position.z
	},
	haus2: {
		x: hausfelder[3][1].position.x,
		y: hausfelder[3][1].position.z
	},
	haus3: {
		x: hausfelder[3][2].position.x,
		y: hausfelder[3][2].position.z
	},
	haus4: {
		x: hausfelder[3][3].position.x,
		y: hausfelder[3][3].position.z
	},
	start: 38
};

// Setze spielerGelb in Hausfelder

spielerGelb.figure1 = spielfigure(spielerGelb.farbe, spielerGelb.haus1.x, spielerGelb.haus1.y);
spielerGelb.figure1.hausfeld = hausfelder[3][0];

spielerGelb.figure2 = spielfigure(spielerGelb.farbe, spielerGelb.haus2.x, spielerGelb.haus2.y);
spielerGelb.figure2.hausfeld = hausfelder[3][1];

spielerGelb.figure3 = spielfigure(spielerGelb.farbe, spielerGelb.haus3.x, spielerGelb.haus3.y);
spielerGelb.figure3.hausfeld = hausfelder[3][2];

spielerGelb.figure4 = spielfigure(spielerGelb.farbe, spielerGelb.haus4.x, spielerGelb.haus4.y);
spielerGelb.figure4.hausfeld = hausfelder[3][3];

// Spieler wird Spieler-Array hinzugefügt
spielerArr[2] = spielerGelb;


// Initialisiere SpielerGruen

var spielerGruen = {
	aktiv: "",
	name: "",
	farbe: 0x2EAE00,
	haus1: {
		x: hausfelder[2][0].position.x,
		y: hausfelder[2][0].position.z
	},
	haus2: {
		x: hausfelder[2][1].position.x,
		y: hausfelder[2][1].position.z
	},
	haus3: {
		x: hausfelder[2][2].position.x,
		y: hausfelder[2][2].position.z
	},
	haus4: {
		x: hausfelder[2][3].position.x,
		y: hausfelder[2][3].position.z
	},
	start: 28
};

// Setze SpielerRot in Hausfelder

spielerGruen.figure1 = spielfigure(spielerGruen.farbe, spielerGruen.haus1.x, spielerGruen.haus1.y);
spielerGruen.figure1.hausfeld = hausfelder[2][0];

spielerGruen.figure2 = spielfigure(spielerGruen.farbe, spielerGruen.haus2.x, spielerGruen.haus2.y);
spielerGruen.figure2.hausfeld = hausfelder[2][1];

spielerGruen.figure3 = spielfigure(spielerGruen.farbe, spielerGruen.haus3.x, spielerGruen.haus3.y);
spielerGruen.figure3.hausfeld = hausfelder[2][2];

spielerGruen.figure4 = spielfigure(spielerGruen.farbe, spielerGruen.haus4.x, spielerGruen.haus4.y);
spielerGruen.figure4.hausfeld = hausfelder[2][3];

// Spieler wird Spieler-Array hinzugefügt

spielerArr[3] = spielerGruen;