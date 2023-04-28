package com.example.maquina.provider;

import java.util.List;

import com.example.maquina.dto.MonedaDto;

public interface MonedaProvider {

	 List<MonedaDto>findAllMonedasDto();
	 
	 MonedaDto findMonedaByValor(Double id);
	  
	 List<MonedaDto> getCambio(List<String> monedas, String productoPosicion);
	 
	 void anadirMoneda(double valor, Integer cantidad);
}
