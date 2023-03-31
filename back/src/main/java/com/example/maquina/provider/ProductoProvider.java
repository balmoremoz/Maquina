package com.example.maquina.provider;

import java.util.List;

import com.example.maquina.dto.ProductoDto;

public interface ProductoProvider {
	 List<ProductoDto>findAllProductos();
}
