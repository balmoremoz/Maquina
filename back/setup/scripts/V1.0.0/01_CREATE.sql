CREATE TABLE producto(
    id number NOT NULL,
    nombre varchar2(20),
    precioCompra number,
    precioVenta number,
    posicion CHAR(2),
    precio number,
    
    CONSTRAINT Pk_producto PRIMARY KEY (id)

);

CREATE TABLE moneda (

    valor number,
    CONSTRAINT Pk_moneda PRIMARY KEY (valor)

);
