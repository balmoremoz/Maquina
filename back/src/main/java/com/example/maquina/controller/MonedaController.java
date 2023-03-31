package com.example.maquina.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.maquina.dto.MonedaDto;
import com.example.maquina.provider.impl.MonedaProviderImp;

@RestController
@RequestMapping("/moneda")
public class MonedaController {

	@Autowired
	MonedaProviderImp monedaProvider;
	
	@GetMapping("/all")
	public ResponseEntity<List<MonedaDto>>getAllMonedasDto(){
		List<MonedaDto> monedas = monedaProvider.findAllMonedasDto();
		return new ResponseEntity<>(monedas, HttpStatus.OK);
	}

	
	
}
