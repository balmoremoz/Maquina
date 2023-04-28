package com.example.maquina.provider;
import java.util.List;
import com.example.maquina.dto.VentaDto;
public interface VentaProvider {
	void anadirVenta(Long idProducto, Double dineroIngresado);

	List<VentaDto>findAllVentas();
}
