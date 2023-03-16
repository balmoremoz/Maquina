package com.example.maquina.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
@Table(name="moneda")
public class MonedaEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name="valor")
	Double valor;
	@Column(name="cantidad")
	Long cantidad;
	
}
