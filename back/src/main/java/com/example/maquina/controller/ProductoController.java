package com.example.maquina.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.maquina.provider.ProductoProvider;

@RestController
public class ProductoController {

	@Autowired
	ProductoProvider productoProvider;
}
