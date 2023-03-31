package com.example.maquina.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;

import lombok.Data;
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
@Data
public class MonedaDto {
	Double valor;
	Long cantidad;
	String foto;
}
