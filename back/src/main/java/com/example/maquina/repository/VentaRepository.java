package com.example.maquina.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.maquina.entity.VentaEntity;

public interface VentaRepository extends JpaRepository<VentaEntity, Long> {

//	@Query(value = "SELECT v FROM VentaEntity v WHERE v.fecha BETWEEN TO_DATE(:fechaInicio, 'YYYY/MM/DD') "
//			+ "AND COALESCE(TO_DATE(:fechaFin, 'YYYY/MM/DD'), CURRENT_DATE)")
	 @Query("SELECT v FROM VentaEntity v WHERE v.fecha BETWEEN COALESCE(TO_DATE(:fechaInicio, 'YYYY-MM-DD'), "
	 		+ "(SELECT MIN(v2.fecha) FROM VentaEntity v2)) "
	 		+ "AND COALESCE(TO_DATE(:fechaFin, 'YYYY-MM-DD')+1, (SELECT MAX(v3.fecha) FROM VentaEntity v3)+1)")
	List<VentaEntity> findVentasByFechaInicioyFin(
	  @Param("fechaInicio") String fechaInicio, 
	  @Param("fechaFin") String fechaFin);
}
