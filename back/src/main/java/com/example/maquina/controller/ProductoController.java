package com.example.maquina.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.maquina.dto.ProductoDto;
import com.example.maquina.entity.ProductoEntity;
import com.example.maquina.provider.ProductoProvider;
import com.example.maquina.provider.impl.ProductoProviderImpl;

@RestController
@RequestMapping("/producto")
public class ProductoController {

	@Autowired
	ProductoProviderImpl productoProvider;
	
	@GetMapping("/all")
	public ResponseEntity<List<ProductoDto>>getAllProductos() {
		List<ProductoDto> productos = productoProvider.findAllProductos();
		return new ResponseEntity<List<ProductoDto>>(productos, HttpStatus.OK);
	}
	
	/*@GetMapping("/{idProducto}")
	public ResponseEntity<ProductoDto> getProducto(@PathVariable("idProducto") Long idProducto) {
		ProductoDto producto = productoProvider.getById(idProducto);
		return ResponseEntity.ok(producto);
	}*/
	
}
