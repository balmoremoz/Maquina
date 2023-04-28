package com.example.maquina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.maquina.entity.VentaEntity;

public interface VentaRepository extends JpaRepository<VentaEntity, Long> {
	
}	
