package com.example.maquina.provider;

import java.util.List;

import com.example.maquina.dto.ProductoDto;
import com.example.maquina.entity.ProductoEntity;

public interface ProductoProvider {
	 List<ProductoDto>findAllProductos();
	 
	 ProductoEntity findProductoByPosicion(String posicion);
	 
}
