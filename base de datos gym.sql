create DataBase GYM;

create table usuario(
	idUsuario varchar(10) not null,
	nombreUsuario varchar(50) not null, check(nombreUsuario NOT like '%[0-9]%'),
	apellidoPUsuario varchar(50) not null, check(ApellidoPUsuario not like '%[0-9]%'),
	apellidoMUsuario varchar(50) not null, check(ApellidoMUsuario not like '%[0-9]%'),
	edadUsuario int not null,
	sexoUsuario char(1) not null, check (sexoUsuario like '%[M,F]%'),
	calleUsuario char(50) not null,
	numeroCalleUsuario char(50),
	coloniaUsuario char(50) not null,
	cpUsuario char (50) not null,
	alcaldiaUsuario char(50) not null,
	usuarioUsuario varchar(20) not null,
	contraseñaUsuario varchar(20) not null
	primary key (idUsuario)
);



create table sucursal(
	idSucursal varchar(10) not null,
	nombreSucursal varchar(50) not null, check(nombreSucursal not like '%[0-9]%'),
	calleSucursal varchar(50) not null,
	coloniaSucursal varchar(50) not null,
	numeroCalleSucursal numeric(3),
	alcaldiaSucursal varchar(50) not null,
	ubicacionSucursal varchar(50),
	telefonoSucursal numeric(10) not null,
	primary key (idSucursal)
);



create table Usuario_Sucursal(
	rel_idSucursal varchar(10) not null,
	rel_idUsuario varchar(10) not null,
	planUsuario varchar(2) not null, check(planUsuario like '%[PS,PB]%'),
	primary key (rel_idSucursal, rel_idUsuario),
	foreign key (Rel_idSucursal) references sucursal (idSucursal),
	foreign key (Rel_idUsuario) references usuario (idUsuario)
);


create table relacionAsistencia(
	asisIdUsuario varchar(10) not null,
	asisIdSucursal varchar(10) not null,
	horaEntrada DateTime,
	primary Key(asisIdUsuario,asisIdSucursal),
	foreign key (asisIdUsuario) references usuario (idUsuario),
	foreign key (asisIdSucursal) references sucursal (idSucursal)
);




drop table Usuario_Sucursal,sucursal,usuario


insert into usuario values ('u000000001','Eduardo Arturo','Jimenez','Hernandez',23,'M','Poniente 152','102','Vallejo',07720,'GAM','Lalo112','Ej$mplo12')
insert into usuario values ('u000000002','Denise Adriana','Perez','Hernandez',22,'F','Ecatepec','63','La Goma',04850,'Edo Mex','DeniseAdris','Ej$mplo10')
insert into usuario values ('u000000003','Kevin Itza','Hernandez','Aguilar',21,'M','Central Electrica','785','ProHogar',04785,'Azcapotzalco','KevHDZ','1234')
insert into usuario values ('u000000004','Daniela','Herrera','Gonzalez',23,'F','Norte','31','Lindavista Vallejo',07720,'GAM','DannyHerr','danny12')
insert into usuario values ('u000000005','Aaron','Ramirez','Romero',23,'M','Poniente','140','Lindavista Vallejo',07720,'GAM','Akron12','pera1234')
insert into usuario values ('u000000006','Jorge','Torres','Montes',30,'M','Norte','31','Lindavista Vallejo',07720,'GAM','GerogeTower','Ej$mplo112')
insert into usuario values ('u000000007','Isabella','Martinez','Flores',32,'F','Primavera','356','El Arenal',54150,'Tlanepantla','IsaMar001','flower12')
insert into usuario values ('u000000008','Ana','Ramos','Ruiz',45,'F','Presa Salinilla','356','Lomas sotelo',11200,'Miguel Hidalgo','AnitaRams','Anit4')
insert into usuario values ('u000000009','Rogelio','Alvarez','Mancera',29,'M','Av 604','1','Narciso Bassols',07979,'GAM','RogerALV','Marce637')
insert into usuario values ('u000000010','Joaquin','Lopez','Ceron',37,'M','AV 699 A ','38','Narciso Bassols',07980,'GAM','Cerox12','C3R0x292')
go
select * from usuario




insert into sucursal values ('s000000001','Smart Fit Lindavista','Av. Las Torres','Torres', 450, 'GAM', 'Plaza Torres Lindavista', 5589562310)
insert into sucursal values ('s000000002','Smart Fit Ferreria','Av. Las Granjas','Ferreria', 120, 'Azcapotzalco', 'Plaza Ferreria', 5545127856)
insert into sucursal values ('s000000003','Smart Fit Claveria','Egipto','Claveria', 142, 'Azcapotzalco', 'Plaza Patio Claveria', 5596324175)
insert into sucursal values ('s000000004','Smart Fit Diagonal Cuitláhuac','Av Cuitláhuac','San Salvador Xochimanca', 239, 'Azcapotzalco', 'Diagonal Centro Comercial', 5573214096)
insert into sucursal values ('s000000005','Smart Fit Palmas Carso','Av. Paseo de las Palmas','Lomas de Chapultepec', 781, 'Miguel Hidalgo', 'Carso Palmas', 5530124795)
go
select * from sucursal
go


insert into Usuario_Sucursal values ('s000000001','u000000001','PS')
insert into Usuario_Sucursal values ('s000000001','u000000002','PS')
insert into Usuario_Sucursal values ('s000000002','u000000003','PB')
insert into Usuario_Sucursal values ('s000000004','u000000004','PS')
insert into Usuario_Sucursal values ('s000000004','u000000005','PB')
insert into Usuario_Sucursal values ('s000000002','u000000006','PS')
insert into Usuario_Sucursal values ('s000000002','u000000007','PS')
insert into Usuario_Sucursal values ('s000000003','u000000008','PB')
insert into Usuario_Sucursal values ('s000000002','u000000009','PS')
insert into Usuario_Sucursal values ('s000000005','u000000010','PB')



insert into relacionAsistencia values ('u000000001','s000000001',CURRENT_TIMESTAMP)
insert into relacionAsistencia values ('u000000002','s000000005',CURRENT_TIMESTAMP)



select * from usuario
go
select * from Usuario_Sucursal
go
select * from sucursal
go
select * from relacionAsistencia

