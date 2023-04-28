package com.example.maquina.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="MONEDA")
public class MonedaEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="VALOR")
	Double valor;
	
	@Column(name="CANTIDAD")
	Integer cantidad;
	
	@Column(name="FOTO")
	String foto;
	
}
