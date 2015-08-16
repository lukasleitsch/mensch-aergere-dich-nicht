// Initialisiere SpielerRot
var spielerRot = {
	aktiv: "",
	name: "",
	farbe: 0xFF0000,
	positionFigur1: "",
	positionFigur2: "", 
	positionFigur3: "", 
	positionFigur4: "", 
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
	start: {
		x: -5,
		y: -1
	}
};

// Setze SpielerRot in Hausfelder

spielfigure(spielerRot.farbe, spielerRot.haus1.x, spielerRot.haus1.y);
spielfigure(spielerRot.farbe, spielerRot.haus2.x, spielerRot.haus2.y);
spielfigure(spielerRot.farbe, spielerRot.haus3.x, spielerRot.haus3.y);
spielfigure(spielerRot.farbe, spielerRot.haus4.x, spielerRot.haus4.y);
//spielfigure(spielerRot.farbe, -5, -1);

// Initialisiere SpielerBlau
var spielerBlau = {
	aktiv: "",
	name: "",
	farbe: 0x2600FF,
	positionFigur1: "",
	positionFigur2: "", 
	positionFigur3: "", 
	positionFigur4: "", 
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
	start: {
		x: -5,
		y: -1
	}
};

// Setze SpielerBlau in Hausfelder

spielfigure(spielerBlau.farbe, spielerBlau.haus1.x, spielerBlau.haus1.y);
spielfigure(spielerBlau.farbe, spielerBlau.haus2.x, spielerBlau.haus2.y);
spielfigure(spielerBlau.farbe, spielerBlau.haus3.x, spielerBlau.haus3.y);
spielfigure(spielerBlau.farbe, spielerBlau.haus4.x, spielerBlau.haus4.y);


// Initialisiere SpielerGruen

var spielerGruen = {
	aktiv: "",
	name: "",
	farbe: 0x2EAE00,
	positionFigur1: "",
	positionFigur2: "", 
	positionFigur3: "", 
	positionFigur4: "", 
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
	start: {
		x: -5,
		y: -1
	}
};

// Setze SpielerRot in Hausfelder

spielfigure(spielerGruen.farbe, spielerGruen.haus1.x, spielerGruen.haus1.y);
spielfigure(spielerGruen.farbe, spielerGruen.haus2.x, spielerGruen.haus2.y);
spielfigure(spielerGruen.farbe, spielerGruen.haus3.x, spielerGruen.haus3.y);
spielfigure(spielerGruen.farbe, spielerGruen.haus4.x, spielerGruen.haus4.y);


// Initialisiere SpielerRot
var spielerGelb = {
	aktiv: "",
	name: "",
	farbe: 0xFFFC00,
	positionFigur1: "",
	positionFigur2: "", 
	positionFigur3: "", 
	positionFigur4: "", 
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
	start: {
		x: -5,
		y: -1
	}
};

// Setze spielerGelb in Hausfelder

spielfigure(spielerGelb.farbe, spielerGelb.haus1.x, spielerGelb.haus1.y);
spielfigure(spielerGelb.farbe, spielerGelb.haus2.x, spielerGelb.haus2.y);
spielfigure(spielerGelb.farbe, spielerGelb.haus3.x, spielerGelb.haus3.y);
spielfigure(spielerGelb.farbe, spielerGelb.haus4.x, spielerGelb.haus4.y);


spielfigure(spielerGelb.farbe, 0, -1);
