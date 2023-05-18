package com.example.maquina.provider.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.maquina.dto.VentaDto;
import com.example.maquina.entity.VentaEntity;
import com.example.maquina.provider.JasperProvider;
import com.example.maquina.provider.ProductoProvider;
import com.example.maquina.provider.VentaProvider;
import com.example.maquina.repository.VentaRepository;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanArrayDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Component
public class VentaProviderImpl implements VentaProvider {
	@Autowired
	VentaRepository ventaRepository;

	@Autowired
	ModelMapper modelMapper;

	@Autowired
	ProductoProvider productoProvider;
	
	@Autowired
	JasperProvider jasperProvider;

	@Override
	public void anadirVenta(Long productoId, Double dineroIngresado) {
		VentaEntity venta = new VentaEntity();

		venta.setProductoId(productoId);
		venta.setDineroIngresado(dineroIngresado);
		venta.setFecha(new Date());

		ventaRepository.save(venta);

	}

	@Override
	public List<VentaDto> findAllVentas() {
		List<VentaEntity> ventas = ventaRepository.findAll();
		List<VentaDto> ventasDto = new ArrayList<VentaDto>();

		for (VentaEntity venta : ventas) {

			ventasDto.add(modelMapper.map(venta, VentaDto.class));
		}
		return ventasDto;
	}

	@Override
	public Double filtrarGananciasPorFecha(String fechaInicio, String fechaFin) {

		List<VentaEntity> ventasFiltradas = ventaRepository.findVentasByFechaInicioyFin(fechaInicio, fechaFin);

		List<VentaDto> ventasFiltradasDto = new ArrayList<VentaDto>();

		for (VentaEntity venta : ventasFiltradas) {

			ventasFiltradasDto.add(modelMapper.map(venta, VentaDto.class));
		}

		Double sum = ventasFiltradas.stream().mapToDouble(VentaEntity::getDineroIngresado).sum();

		for (VentaEntity venta : ventasFiltradas) {

			sum = sum - (productoProvider.findProductoById(venta.getProductoId()).getPrecioCompra());

		}

		return sum;

	}

	@Override
	public List<VentaDto> filtrarVentasPorFecha(String fechaInicio, String fechaFin) {
		
		List<VentaEntity> ventasFiltradas = ventaRepository.findVentasByFechaInicioyFin(fechaInicio, fechaFin);

		List<VentaDto> ventasFiltradasDto = new ArrayList<VentaDto>();

		for (VentaEntity venta : ventasFiltradas) {

			ventasFiltradasDto.add(modelMapper.map(venta, VentaDto.class));
		}

		return ventasFiltradasDto;

	}

	@Override
	public byte[] generarPdf(String fechaInicio, String fechaFin) throws JRException {
		try {
			Map<String, Object> param = new HashMap<String, Object>();

			List<VentaDto> ventas=filtrarVentasPorFecha(fechaInicio, fechaFin);
			
			param.put("ds", new JRBeanCollectionDataSource(ventas));
			param.put("ganancias",Math.round( filtrarGananciasPorFecha(fechaInicio,fechaFin)* 100d) / 100d);
			
			String nombreArchivo = "prueba3.jasper";
			
			JasperPrint jasper = jasperProvider.crearJasperNoFields(param, nombreArchivo);
			byte[] bytes = jasperProvider.getBytesJasper(jasper);
			jasperProvider.saveDocToFile(bytes, "C:\\compartido\\ventas.pdf");
			return bytes;

		} catch (Exception e) {		
			return null;
		}
	}
}
