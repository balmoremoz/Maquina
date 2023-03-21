package com.example.maquina.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MaquinaConfig {
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
}
