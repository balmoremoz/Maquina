ALTER TABLE moneda
ADD cantidad number;

ALTER TABLE producto
ADD cantidad number;

alter table producto
modify nombre varchar2(100);