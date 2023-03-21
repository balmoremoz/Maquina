package com.example.maquina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.maquina.entity.ProductoEntity;

public interface ProductoRepository extends JpaRepository<ProductoEntity, Long> {
	
}
