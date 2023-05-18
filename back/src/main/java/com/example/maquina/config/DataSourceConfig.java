package com.example.maquina.config;

import lombok.extern.slf4j.Slf4j;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class DataSourceConfig {
	@Value("${spring.datasource.driverClassName}")
	String driverName;

	@Value("${spring.datasource.url}")
	String urlDatasource;

	@Value("${spring.datasource.data-username}")
	String userConnection;

	@Value("${spring.datasource.data-password}")
	String passConnection;

	@Bean(destroyMethod = "", name = "datasource")
	public DataSource dataSource() {
		DataSource datasource = null;
		try {

			datasource = DataSourceBuilder.create().username(userConnection).password(passConnection).url(urlDatasource)
					.driverClassName(driverName).build();
		} catch (Exception e) {

		}
		return datasource;
	}
}