package com.example.maquina.dto;

import java.util.Date;

import com.example.maquina.entity.ProductoEntity;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;

import lombok.Data;
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
@Data
public class VentaDto {	
	Long id;
	
	Date fecha;
	
	Integer idProducto;
	
	Double dineroIngresado;	
	
	ProductoEntity producto;
	
}