CREATE TABLE producto(
    id number NOT NULL,
    nombre varchar2(20),
    precioCompra number,
    precioVenta number,
    posicion CHAR(2),
    precio number,
    peso number,
	
    CONSTRAINT Pk_producto PRIMARY KEY (id)

);

CREATE TABLE moneda (

    valor number,
    CONSTRAINT Pk_moneda PRIMARY KEY (valor)

);

CREATE TABLE VENTAS 
(
  ID NUMBER NOT NULL 
, FECHA VARCHAR2(20) NOT NULL 
, ID_PRODUCTO NUMBER NOT NULL 
, DINERO NUMBER NOT NULL 
, CONSTRAINT VENTAS_PK PRIMARY KEY 
  (
    ID 
  )
  ENABLE 
);