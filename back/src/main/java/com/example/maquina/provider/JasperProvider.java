package com.example.maquina.provider;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Map;
import java.util.ResourceBundle;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;

@Component
public class JasperProvider {

	static ResourceBundle rb = ResourceBundle.getBundle("maquina");
	static String jasperSrc = rb.getString("PATH_JASPER");

	private String alternateJasperSource() {
		return Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "xls").toString();
	}

	public JasperPrint crearJasperNoFields(Map<String, Object> params, String fileName) throws JRException {
		String sourceFileName = jasperSrc + File.separator + fileName;

		if (!(new File(sourceFileName).exists())) {
			String localJasperDir = alternateJasperSource() + File.separator + fileName;

			if (new File(localJasperDir).exists()) {
				sourceFileName = localJasperDir;
			}
		}

		return JasperFillManager.fillReport(sourceFileName, params, new JREmptyDataSource());
	}

	public void saveDocToFile(byte[] content, String path) throws FileNotFoundException, IOException {
		try (FileOutputStream fos = new FileOutputStream(path)) {
			fos.write(content);
		}
	}

	public byte[] getBytesJasper(JasperPrint jasperPrint) {

		byte[] archivo = null;
		try {
			archivo = JasperExportManager.exportReportToPdf(jasperPrint);
		} catch (JRException e1) {

		}

		return archivo;

	}

}
