package com.example.maquina.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Data
@ToString
@Table(name="producto")
@Getter
@Setter
public class ProductoEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name="id")
	Long Id;
	@Column(name="nombre")
	String nombre;
	@Column(name="precioCompra")
	Double precioCompra;
	@Column(name="precioVenta")
	Double precioVenta;
	@Column(name="posicion")
	String Posicion;
	@Column(name="peso")
	Double peso;
	@Column(name="cantidad")
	Integer cantidad;
	
}
