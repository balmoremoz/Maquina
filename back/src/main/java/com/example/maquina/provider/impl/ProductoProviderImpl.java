package com.example.maquina.provider.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.maquina.dto.ProductoDto;
import com.example.maquina.entity.ProductoEntity;
import com.example.maquina.provider.ProductoProvider;
import com.example.maquina.repository.ProductoRepository;

@Component
public class ProductoProviderImpl implements ProductoProvider {

	@Autowired
	ProductoRepository productoRepository;

	@Autowired
	 ModelMapper modelMapper;

	@Override
	public List<ProductoDto> findAllProductos() {
		List<ProductoEntity> productos = productoRepository.findAll();
		List<ProductoDto> productosDto = new ArrayList<ProductoDto>();
	
		for (ProductoEntity producto : productos) {
			
			productosDto.add(modelMapper.map(producto,ProductoDto.class));
		}
		return productosDto;
	}
	
    public ProductoEntity findProductoByPosicion(String posicion) {
        return productoRepository.findProductoByPosicion(posicion);
    }


}
