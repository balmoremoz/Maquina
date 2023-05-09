package com.example.maquina.entity;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.FetchType;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "VENTAS")
public class VentaEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name = "MAQUINA_SQ_VENTAS", sequenceName = "MAQUINA_SQ_VENTAS", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MAQUINA_SQ_VENTAS")
	@Column(name = "ID")
	Long id;

	@Column(name = "FECHA")
	Date fecha;

	@Column(name = "DINERO")
	Double dineroIngresado;
	
	@Column(name = "ID_PRODUCTO")
	Long productoId;

	@JoinColumn(name = "ID_PRODUCTO", referencedColumnName = "ID",insertable=false, updatable=false)
	@ManyToOne(optional = false, fetch = FetchType.EAGER)
	ProductoEntity productoEntity;
}
