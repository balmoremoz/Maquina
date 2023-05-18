package com.example.maquina.provider.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.maquina.dto.MonedaDto;
import com.example.maquina.entity.MonedaEntity;
import com.example.maquina.entity.ProductoEntity;
import com.example.maquina.provider.MonedaProvider;
import com.example.maquina.provider.ProductoProvider;
import com.example.maquina.repository.MonedaRepository;
import com.example.maquina.repository.ProductoRepository;

@Component
public class MonedaProviderImp implements MonedaProvider {
	@Autowired
	MonedaRepository monedaRepository;
	@Autowired
	ProductoProvider productoProvider;

	@Autowired
	ProductoRepository productoRepository;

	@Autowired
	ModelMapper modelMapper;

	@Override
	public List<MonedaDto> findAllMonedasDto() {
		List<MonedaEntity> monedas = monedaRepository.findAll();
		List<MonedaDto> monedasDto = new ArrayList<>();
		for (MonedaEntity moneda : monedas) {
			monedasDto.add(modelMapper.map(moneda, MonedaDto.class));
		}
		return monedasDto;
	}

	@Override
	public MonedaDto findMonedaByValor(Double id) {
		MonedaEntity moneda = monedaRepository.findMonedaByValor(id);
		MonedaDto monedaDto = modelMapper.map(moneda, MonedaDto.class);
		return monedaDto;
	}

	@Override
	public List<MonedaDto> getCambio(List<String> monedas, String posicion) {
		ProductoEntity producto = productoProvider.findProductoByPosicion(posicion);
		Double cambio = 0.0, cantidad = 0.0;
		List<MonedaEntity> monedasBD = monedaRepository.findAll();
		List<MonedaDto> monedasCambio = new ArrayList<MonedaDto>();

		if (producto.getCantidad() > 0) {
			producto.setCantidad(producto.getCantidad() - 1);

			for (String monedaIngresada : monedas) {
				for (MonedaEntity moneda : monedasBD) {
					if (moneda.getValor() == Double.parseDouble(monedaIngresada)) {
						moneda.setCantidad(moneda.getCantidad() + 1);
					}
				}
				cantidad = cantidad + Double.parseDouble(monedaIngresada);
			}

			Collections.reverse(monedasBD);
			cambio = cantidad - producto.getPrecioVenta();
			cambio = Math.round(cambio * 100d) / 100d;

			for (MonedaEntity moneda : monedasBD) {
				while (cambio >= moneda.getValor() && moneda.getCantidad() > 0) {
					cambio = Math.round((cambio - moneda.getValor()) * 100d) / 100d;
					monedasCambio.add(modelMapper.map(moneda, MonedaDto.class));
					moneda.setCantidad(moneda.getCantidad() - 1);
				}
			}
		}

		productoRepository.save(producto);
		monedaRepository.saveAll(monedasBD);
		return monedasCambio;
	}

	@Override
	public void anadirMoneda(double valor, Integer cantidad) {
		MonedaEntity moneda = monedaRepository.findMonedaByValor(valor);

		moneda.setCantidad(moneda.getCantidad() + cantidad);
		monedaRepository.save(moneda);
	}
	

}
