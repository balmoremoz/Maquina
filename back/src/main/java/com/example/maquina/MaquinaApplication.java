package com.example.maquina;

import java.util.Properties;
import java.util.ResourceBundle;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan(basePackages = { "com.example.maquina" })

public class MaquinaApplication extends SpringBootServletInitializer {
	static ResourceBundle rb = ResourceBundle.getBundle("maquina");
	static String pathApplicationProperties = rb.getString("PATH_APPLICATION_PROPERTIES");

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(MaquinaApplication.class).properties(getProperties());
	}

	public static void main(String[] args) {
		new SpringApplicationBuilder(MaquinaApplication.class).sources(MaquinaApplication.class).properties(getProperties())
				.run(args);
	}
	
	static Properties getProperties() {
		Properties props = new Properties();
		props.put("spring.config.location", "file:" + pathApplicationProperties);
		return props;
	}
}
