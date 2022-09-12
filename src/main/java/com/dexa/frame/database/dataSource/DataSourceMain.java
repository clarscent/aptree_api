package com.dexa.frame.database.dataSource;

import com.atomikos.jdbc.AtomikosDataSourceBean;
import com.dexa.frame.database.custom.CustomSqlSessionFactoryBean;
import com.dexa.frame.database.custom.CustomSqlSessionTemplate;
import com.dexa.frame.util.Global;
import lombok.extern.slf4j.Slf4j;
import net.sf.log4jdbc.Log4jdbcProxyDataSource;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Component;

import java.util.Properties;

@Slf4j
@Configuration
@Component
@PropertySource("classpath:/prop/${env}/api.properties")
public class DataSourceMain {
	@Value("${db.user}")
	private String DB_USER;

	@Value("${db.password}")
	private String DB_PASSWORD;

	@Value("${db.url}")
	private String DB_URL;

	@Bean(value = "dsMain", initMethod = "init", destroyMethod = "close")
	public AtomikosDataSourceBean getDataSource() {
		AtomikosDataSourceBean dataSource = new AtomikosDataSourceBean();

		log.error("URL:" + Global.dec(DB_URL));

		Properties properties = new Properties();
		properties.setProperty("user", Global.dec(DB_USER));
		properties.setProperty("password", Global.dec(DB_PASSWORD));
		properties.setProperty("url", Global.dec(DB_URL));

		dataSource.setXaDataSourceClassName("org.postgresql.xa.PGXADataSource");
		dataSource.setUniqueResourceName("main");
		dataSource.setXaProperties(properties);
		dataSource.setPoolSize(100);

		return dataSource;
	}

	@Bean("sqlSessionMain")
	public SqlSessionFactory getSqlSession() throws Exception {
		CustomSqlSessionFactoryBean sqlSession = new CustomSqlSessionFactoryBean();
		sqlSession.setDataSource(new Log4jdbcProxyDataSource(getDataSource()));
		sqlSession.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:/sqlmap/**/*.xml"));

		return sqlSession.getObject();
	}

	@Bean("sqlSessionTmplMain")
	public SqlSessionTemplate getSqlSessionTemplate() throws Exception {
		return new CustomSqlSessionTemplate(getSqlSession(), ExecutorType.BATCH);
	}
}
