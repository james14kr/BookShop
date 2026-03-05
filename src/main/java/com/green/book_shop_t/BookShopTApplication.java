package com.green.book_shop_t;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Book Shop 프로젝트의 메인 애플리케이션 클래스
 *
 * @SpringBootApplication : 아래 3가지 어노테이션을 합친 것
 *  - @Configuration     : 이 클래스가 Spring 설정 클래스임을 명시
 *  - @EnableAutoConfiguration : Spring Boot 자동 설정 활성화
 *    (application.properties 기반으로 필요한 Bean 자동 등록)
 *  - @ComponentScan     : 현재 패키지(com.green.book_shop_t) 하위의
 *    @Component, @Service, @Repository, @Controller 등을 자동 스캔하여 Bean 등록
 */
@SpringBootApplication
public class BookShopTApplication {

	/**
	 * 애플리케이션의 시작점 (Entry Point)
	 * SpringApplication.run() 호출로 내장 Tomcat 서버가 시작되고
	 * Spring IoC 컨테이너가 초기화됨
	 */
	public static void main(String[] args) {
		SpringApplication.run(BookShopTApplication.class, args);
	}

}
