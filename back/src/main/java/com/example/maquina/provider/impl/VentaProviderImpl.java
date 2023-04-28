package com.example.maquina.provider.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.maquina.dto.ProductoDto;
import com.example.maquina.dto.VentaDto;
import com.example.maquina.entity.ProductoEntity;
import com.example.maquina.entity.VentaEntity;
import com.example.maquina.provider.ProductoProvider;
import com.example.maquina.provider.VentaProvider;
import com.example.maquina.repository.VentaRepository;
@Component
public class VentaProviderImpl implements VentaProvider {
	@Autowired 
	VentaRepository ventaRepository;
	@Autowired
	ModelMapper modelMapper;
	@Autowired
	ProductoProvider productoProvider;
	
	public void anadirVenta(Long productoId, Double dineroIngresado) {
		VentaEntity venta=new VentaEntity();
		
		//venta.setProductoEntity(productoProvider.findProductoById(productoId));
		venta.setProductoId(productoId);
		venta.setDineroIngresado(dineroIngresado);
		venta.setFecha(new Date());
		
		ventaRepository.save(venta);
		
	}
	
	public List<VentaDto> findAllVentas() {
		List<VentaEntity> ventas = ventaRepository.findAll();
		List<VentaDto> ventasDto = new ArrayList<VentaDto>();
	
		for (VentaEntity venta : ventas) {
			
			ventasDto.add(modelMapper.map(venta,VentaDto.class));
		}
		return ventasDto;
	}
	
}
