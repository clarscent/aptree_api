package com.dexa.frame.database;

import com.atomikos.icatch.config.UserTransactionServiceImp;
import com.atomikos.icatch.jta.UserTransactionImp;
import com.atomikos.icatch.jta.UserTransactionManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.jta.JtaTransactionManager;

import javax.transaction.SystemException;
import java.util.Properties;

@Slf4j
@Configuration
@Component
@EnableTransactionManagement
public class TransactionConfig {
	@Autowired
	PlatformTransactionManager txSub;

	@Autowired
	PlatformTransactionManager txMain;

	@Bean
	public UserTransactionManager atomikosTransactionManager() {
		UserTransactionManager utm = new UserTransactionManager();
		utm.setForceShutdown(true);
		return utm;
	}

	@Bean
	public UserTransactionImp atomikosUserTransaction() throws SystemException {
		UserTransactionImp userTransaction = new UserTransactionImp();
		userTransaction.setTransactionTimeout(300);

		return userTransaction;
	}

	@Bean(initMethod = "init", destroyMethod = "shutdownForce")
	UserTransactionServiceImp userTransactionServiceImp() {
		Properties prop = new Properties();
		prop.setProperty("com.atomikos.icatch.service", "com.atomikos.icatch.standalone.UserTransactionServiceFactory");
		prop.setProperty("com.atomikos.icatch.log_base_name", "webdeafult");
		prop.setProperty("com.atomikos.icatch.output_dir", "../standalone/log/");
		prop.setProperty("com.atomikos.icatch.log_base_dir", "../standalone/log/");
		UserTransactionServiceImp u = new UserTransactionServiceImp(prop);

		return u;
	}

	@Bean("transactionManager")
	public PlatformTransactionManager transactionManager() throws SystemException {
		JtaTransactionManager transactionManager = new JtaTransactionManager();

		transactionManager.setAllowCustomIsolationLevels(true);
		transactionManager.setTransactionManager(atomikosTransactionManager());
		transactionManager.setUserTransaction(atomikosUserTransaction());

		return transactionManager;
	}
}
