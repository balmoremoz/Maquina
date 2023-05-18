package com.example.maquina.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.maquina.entity.VentaEntity;

public interface VentaRepository extends JpaRepository<VentaEntity, Long> {

	@Query(nativeQuery=true, value="SELECT * FROM VENTAS  WHERE FECHA BETWEEN TO_DATE (:fechaInicio, 'YYYY/MM/DD') AND TO_DATE (:fechaFin,'YYYY/MM/DD')+1")
	List<VentaEntity> findVentasByFechaInicioyFin(
	  @Param("fechaInicio") String fechaInicio, 
	  @Param("fechaFin") String fechaFin);
}
