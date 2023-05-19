package com.example.maquina.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.maquina.dto.VentaDto;
import com.example.maquina.provider.VentaProvider;

import net.sf.jasperreports.engine.JRException;

@RestController
@RequestMapping("/venta")
public class VentaController {
	@Autowired
	VentaProvider ventaProvider;

	@GetMapping("/nueva")
	public void nuevaCompra(@RequestParam("productoId") Long productoId, @RequestParam("dinero") Double dinero) {
		ventaProvider.anadirVenta(productoId, dinero);
	}

	@GetMapping("/all")
	public ResponseEntity<List<VentaDto>> getAllVentas() {
		List<VentaDto> ventas = ventaProvider.findAllVentas();
		return new ResponseEntity<>(ventas, HttpStatus.OK);
	}

	@GetMapping("/filtrarGanancias")
	public ResponseEntity<Double> filtrarGanancias(@RequestParam("fechaInicio") String fechaInicio,
			@RequestParam("fechaFin") String fechaFin) {
		Double gananciasFiltradas = ventaProvider.filtrarGananciasPorFecha(fechaInicio, fechaFin);
		return new ResponseEntity<>(gananciasFiltradas, HttpStatus.OK);
	}

	@GetMapping("/filtrarVentas")
	public ResponseEntity<List<VentaDto>> filtrarVentas(
			@RequestParam(value = "fechaInicio", required = false) String fechaInicio,
			@RequestParam(value = "fechaFin", required = false) String fechaFin) {

		List<VentaDto> ventasFiltradas = ventaProvider.filtrarVentasPorFecha(fechaInicio, fechaFin);
		return new ResponseEntity<>(ventasFiltradas, HttpStatus.OK);
	}

	@GetMapping(value = "/descargar", produces = MediaType.APPLICATION_PDF_VALUE)
	public ResponseEntity<byte[]> descargarVentas(@RequestParam(value="fechaInicio", required=false) String fechaInicio,
			@RequestParam(value="fechaFin", required=false) String fechaFin) throws JRException {
		
		byte[] ventasFiltradasPdf = ventaProvider.generarPdf(fechaInicio, fechaFin);

		HttpHeaders responseHeaders = new HttpHeaders();

		responseHeaders.set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_PDF_VALUE);
		responseHeaders.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + "ventasFiltradas.pdf");

		return ResponseEntity.ok().headers(responseHeaders).body(ventasFiltradasPdf);
	}
}