package com.example.maquina.provider.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.maquina.dto.MonedaDto;
import com.example.maquina.entity.MonedaEntity;
import com.example.maquina.provider.MonedaProvider;
import com.example.maquina.repository.MonedaRepository;


@Component
public class MonedaProviderImp implements MonedaProvider{
	@Autowired
	MonedaRepository monedaRepository;

	@Autowired
	 ModelMapper modelMapper;
	
	@Override
	public List<MonedaDto>findAllMonedasDto(){
		List<MonedaEntity> monedas = monedaRepository.findAll();
		List<MonedaDto> monedasDto=new ArrayList<>();
		for (MonedaEntity moneda:monedas ) {
			monedasDto.add(modelMapper.map(moneda, MonedaDto.class));
		}
		return monedasDto;
	}
		

}
