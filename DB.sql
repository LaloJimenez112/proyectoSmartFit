CREATE DATABASE IF NOT EXISTS GYM;

USE GYM;

CREATE TABLE IF NOT EXISTS usuario(
	idUsuario VARCHAR(10) NOT NULL,
	nombreUsuario VARCHAR(50) NOT NULL, CHECK(nombreUsuario NOT LIKE '%[0-9]%'),
	apellidoPUsuario VARCHAR(50) NOT NULL, CHECK(ApellidoPUsuario NOT LIKE '%[0-9]%'),
	apellidoMUsuario VARCHAR(50) NOT NULL, CHECK(ApellidoMUsuario NOT LIKE '%[0-9]%'),
	edadUsuario INT NOT NULL,
	sexoUsuario CHAR(1) NOT NULL,
	CONSTRAINT sU_CHECK CHECK (sexoUsuario IN ('M', 'F')),
	calleUsuario CHAR(50) NOT NULL,
	numeroCalleUsuario CHAR(50),
	coloniaUsuario CHAR(50) NOT NULL,
	cpUsuario CHAR (50) NOT NULL,
	alcaldiaUsuario CHAR(50) NOT NULL,
	usuarioUsuario VARCHAR(20) NOT NULL,
	contrasenaUsuario VARCHAR(20) NOT NULL,
	PRIMARY KEY (idUsuario)
);

CREATE TABLE IF NOT EXISTS sucursal(
	idSucursal VARCHAR(10) NOT NULL,
	nombreSucursal VARCHAR(50) NOT NULL, CHECK(nombreSucursal NOT LIKE '%[0-9]%'),
	calleSucursal VARCHAR(50) NOT NULL,
	coloniaSucursal VARCHAR(50) NOT NULL,
	numeroCalleSucursal NUMERIC(3),
	alcaldiaSucursal VARCHAR(50) NOT NULL,
	ubicacionSucursal VARCHAR(50),
	telefonoSucursal NUMERIC(10) NOT NULL,
	PRIMARY KEY (idSucursal)
);



CREATE TABLE IF NOT EXISTS Usuario_Sucursal(
	rel_idSucursal VARCHAR(10) NOT NULL,
	rel_idUsuario VARCHAR(10) NOT NULL,
	planUsuario VARCHAR(2) NOT NULL,
	CONSTRAINT pU_CHECK CHECK (planUsuario IN ('PS', 'PB')),
	PRIMARY KEY (rel_idSucursal, rel_idUsuario),
	CONSTRAINT fk_US_S
    FOREIGN KEY (Rel_idSucursal)
    REFERENCES sucursal (idSucursal)
    ON DELETE CASCADE,
    CONSTRAINT fk_US_U
    FOREIGN KEY (Rel_idUsuario)
    REFERENCES usuario (idUsuario)
    ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS relacionAsistencia(
	asisIdUsuario VARCHAR(10) NOT NULL,
	asisIdSucursal VARCHAR(10) NOT NULL,
	horaEntrada DATETIME,
	PRIMARY KEY(asisIdUsuario,asisIdSucursal),
	CONSTRAINT fk_rA_U
    FOREIGN KEY (asisIdUsuario)
    REFERENCES usuario (idUsuario)
    ON DELETE CASCADE,
    CONSTRAINT fk_rA_S
    FOREIGN KEY (asisIdSucursal)
    REFERENCES sucursal (idSucursal)
    ON DELETE CASCADE
);

INSERT INTO usuario VALUES ('u000000001','Eduardo Arturo','Jimenez','Hernandez',23,'M','Poniente 152','102','Vallejo',07720,'GAM','Lalo112','Ej$mplo12');
INSERT INTO usuario VALUES ('u000000002','Denise Adriana','Perez','Hernandez',22,'F','Ecatepec','63','La Goma',04850,'Edo Mex','DeniseAdris','Ej$mplo10');
INSERT INTO usuario VALUES ('u000000003','Kevin Itza','Hernandez','Aguilar',21,'M','Central Electrica','785','ProHogar',04785,'Azcapotzalco','KevHDZ','1234');
INSERT INTO usuario VALUES ('u000000004','Daniela','Herrera','Gonzalez',23,'F','Norte','31','Lindavista Vallejo',07720,'GAM','DannyHerr','danny12');
INSERT INTO usuario VALUES ('u000000005','Aaron','Ramirez','Romero',23,'M','Poniente','140','Lindavista Vallejo',07720,'GAM','Akron12','pera1234');
INSERT INTO usuario VALUES ('u000000006','Jorge','Torres','Montes',30,'M','Norte','31','Lindavista Vallejo',07720,'GAM','GerogeTower','Ej$mplo112');
INSERT INTO usuario VALUES ('u000000007','Isabella','Martinez','Flores',32,'F','Primavera','356','El Arenal',54150,'Tlanepantla','IsaMar001','flower12');
INSERT INTO usuario VALUES ('u000000008','Ana','Ramos','Ruiz',45,'F','Presa Salinilla','356','Lomas sotelo',11200,'Miguel Hidalgo','AnitaRams','Anit4');
INSERT INTO usuario VALUES ('u000000009','Rogelio','Alvarez','Mancera',29,'M','Av 604','1','Narciso Bassols',07979,'GAM','RogerALV','Marce637');
INSERT INTO usuario VALUES ('u000000010','Joaquin','Lopez','Ceron',37,'M','AV 699 A ','38','Narciso Bassols',07980,'GAM','Cerox12','C3R0x292');

SELECT * FROM usuario;

INSERT INTO sucursal VALUES ('s000000001','Smart Fit Lindavista','Av. Las Torres','Torres', 450, 'GAM', 'Plaza Torres Lindavista', 5589562310);
INSERT INTO sucursal VALUES ('s000000002','Smart Fit Ferreria','Av. Las Granjas','Ferreria', 120, 'Azcapotzalco', 'Plaza Ferreria', 5545127856);
INSERT INTO sucursal VALUES ('s000000003','Smart Fit Claveria','Egipto','Claveria', 142, 'Azcapotzalco', 'Plaza Patio Claveria', 5596324175);
INSERT INTO sucursal VALUES ('s000000004','Smart Fit Diagonal Cuitláhuac','Av Cuitláhuac','San Salvador Xochimanca', 239, 'Azcapotzalco', 'Diagonal Centro Comercial', 5573214096);
INSERT INTO sucursal VALUES ('s000000005','Smart Fit Palmas Carso','Av. Paseo de las Palmas','Lomas de Chapultepec', 781, 'Miguel Hidalgo', 'Carso Palmas', 5530124795);

SELECT * FROM sucursal;

INSERT INTO Usuario_Sucursal VALUES ('s000000001','u000000001','PS');
INSERT INTO Usuario_Sucursal VALUES ('s000000001','u000000002','PS');
INSERT INTO Usuario_Sucursal VALUES ('s000000002','u000000003','PB');
INSERT INTO Usuario_Sucursal VALUES ('s000000004','u000000004','PS');
INSERT INTO Usuario_Sucursal VALUES ('s000000004','u000000005','PB');
INSERT INTO Usuario_Sucursal VALUES ('s000000002','u000000006','PS');
INSERT INTO Usuario_Sucursal VALUES ('s000000002','u000000007','PS');
INSERT INTO Usuario_Sucursal VALUES ('s000000003','u000000008','PB');
INSERT INTO Usuario_Sucursal VALUES ('s000000002','u000000009','PS');
INSERT INTO Usuario_Sucursal VALUES ('s000000005','u000000010','PB');

INSERT INTO relacionAsistencia VALUES ('u000000001','s000000001',CURRENT_TIMESTAMP);
INSERT INTO relacionAsistencia VALUES ('u000000002','s000000005',CURRENT_TIMESTAMP);

SELECT * FROM usuario;

SELECT * FROM Usuario_Sucursal;

SELECT * FROM sucursal;

SELECT * FROM relacionAsistencia;
