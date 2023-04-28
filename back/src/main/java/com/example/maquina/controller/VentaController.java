package com.example.maquina.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.maquina.dto.VentaDto;
import com.example.maquina.provider.VentaProvider;



@RestController
@RequestMapping("/venta")
public class VentaController {
	@Autowired
	VentaProvider ventaProvider;
	
    @GetMapping("/nueva")
    public void nuevaCompra(@RequestParam("productoId") Long productoId, @RequestParam("dinero") Double dinero ) {
    	ventaProvider.anadirVenta(productoId, dinero);
    }
	
    @GetMapping("/all")
    public ResponseEntity<List<VentaDto>> getAllVentas(){
    	List<VentaDto> ventas=ventaProvider.findAllVentas();
    	return new ResponseEntity<>(ventas, HttpStatus.OK);	
    }
	
}