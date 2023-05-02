ALTER TABLE moneda
ADD cantidad number;

ALTER TABLE producto
ADD cantidad number;

alter table producto
modify nombre varchar2(100);

update PRODUCTO set POSICION='E4'
where ID=24;

ALTER TABLE PRODUCTO
ADD FOTO varchar2(100);

update PRODUCTO set FOTO='1.jpg' where ID=1;
update PRODUCTO set FOTO='2.jpg' where ID=2;
update PRODUCTO set FOTO='3.jpg' where ID=3;
update PRODUCTO set FOTO='4.jpg' where ID=4;
update PRODUCTO set FOTO='5.jpg' where ID=5;
update PRODUCTO set FOTO='6.jpg' where ID=6;
update PRODUCTO set FOTO='7.jpg' where ID=7;
update PRODUCTO set FOTO='8.jpg' where ID=8;
update PRODUCTO set FOTO='9.jpg' where ID=9;
update PRODUCTO set FOTO='10.jpg' where ID=10;
update PRODUCTO set FOTO='11.jpg' where ID=11;
update PRODUCTO set FOTO='12.jpg' where ID=12;
update PRODUCTO set FOTO='13.jpg' where ID=13;
update PRODUCTO set FOTO='14.jpg' where ID=14;
update PRODUCTO set FOTO='15.jpg' where ID=15;
update PRODUCTO set FOTO='16.jpg' where ID=16;
update PRODUCTO set FOTO='17.jpg' where ID=17;
update PRODUCTO set FOTO='18.jpg' where ID=18;
update PRODUCTO set FOTO='19.jpg' where ID=19;
update PRODUCTO set FOTO='20.jpg' where ID=20;
update PRODUCTO set FOTO='21.jpg' where ID=21;
update PRODUCTO set FOTO='22.jpg' where ID=22;
update PRODUCTO set FOTO='23.jpg' where ID=23;
update PRODUCTO set FOTO='24.jpg' where ID=24;
update PRODUCTO set FOTO='25.jpg' where ID=25;

ALTER TABLE MONEDA
ADD FOTO varchar2(100);

update MONEDA set FOTO='001e.png' where VALOR=0.01;
update MONEDA set FOTO='002e.png' where VALOR=0.02;
update MONEDA set FOTO='005e.png' where VALOR=0.05;
update MONEDA set FOTO='01e.png' where VALOR=0.1;
update MONEDA set FOTO='02e.png' where VALOR=0.2;
update MONEDA set FOTO='05e.png' where VALOR=0.5;
update MONEDA set FOTO='1e.png' where VALOR=1;
update MONEDA set FOTO='2e.png' where VALOR=2;

 ALTER TABLE VENTAS
  MODIFY FECHA DATE not null;