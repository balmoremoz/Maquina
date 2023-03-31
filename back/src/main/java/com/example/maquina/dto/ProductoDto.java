package com.example.maquina.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;

import lombok.Data;

@JsonAutoDetect(fieldVisibility = Visibility.ANY)
@Data
public class ProductoDto {

	Long id;
	String nombre;
	Double precioCompra;
	Double precioVenta;
	String posicion;
	Double peso;
	Integer cantidad;
	String foto;
	
}
