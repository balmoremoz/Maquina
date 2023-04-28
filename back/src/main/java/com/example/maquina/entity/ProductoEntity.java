package com.example.maquina.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "PRODUCTO")
public class ProductoEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "ID")
	Long id;

	@Column(name = "NOMBRE")
	String nombre;

	@Column(name = "PRECIOCOMPRA")
	Double precioCompra;

	@Column(name = "PRECIOVENTA")
	Double precioVenta;

	@Column(name = "POSICION")
	String posicion;

	@Column(name = "PESO")
	Double peso;

	@Column(name = "CANTIDAD")
	Integer cantidad;

	@Column(name = "FOTO")
	String foto;
}
