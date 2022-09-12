package com.dexa.frame.database;


import com.dexa.frame.helper.SpringContextHolder;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.jta.JtaTransactionManager;
import org.springframework.transaction.support.DefaultTransactionDefinition;

@Aspect
@Slf4j
@Component
public class TransAdvisor {
	public TransAdvisor() {
		System.out.println("TransAdvisor!!!!!!!!!!!!!!!!!!!");
	}

	@Around("@annotation(Trans)")
	public void processCustomAnnotation(ProceedingJoinPoint proceedingJoinPoint) throws RuntimeException {
		MethodSignature methodSignature = (MethodSignature) proceedingJoinPoint.getSignature();
		Trans trans = methodSignature.getMethod().getAnnotation(Trans.class);

		JtaTransactionManager jtaTransactionManager = (JtaTransactionManager) SpringContextHolder.applicationContext.getBean("transactionManager");

		TransactionStatus status = jtaTransactionManager.getTransaction(new DefaultTransactionDefinition());

		log.info("Trans start");

		Object proceedReturnValue = null;

		try {
			proceedReturnValue = proceedingJoinPoint.proceed();

			log.info("커밋시작합니다.");
			jtaTransactionManager.commit(status);
			log.info("Trans 종료");

			//return proceedReturnValue;
		} catch (Exception e) {
			log.error("Trans 에러", e);
			throw new RuntimeException("SQL에러발생");
			//jtaTransactionManager.rollback(status);
		} catch (Throwable throwable) {
			throwable.printStackTrace();
		}
	}
}
