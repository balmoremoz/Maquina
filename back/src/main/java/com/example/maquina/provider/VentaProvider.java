package com.example.maquina.provider;
import java.util.List;
import com.example.maquina.dto.VentaDto;

import net.sf.jasperreports.engine.JRException;
public interface VentaProvider {
	
	void anadirVenta(Long idProducto, Double dineroIngresado);

	List<VentaDto>findAllVentas();
	
	Double filtrarGananciasPorFecha(String fechaInicio,String fechaFin);
	
	List<VentaDto>filtrarVentasPorFecha(String fechaInicio, String fechaFin);
	
	public byte[] generarPdf(String fechaInicio, String fechaFin)throws JRException;
}
