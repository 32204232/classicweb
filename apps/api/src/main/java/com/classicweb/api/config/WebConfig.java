package com.classicweb.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



@Configuration
public class WebConfig implements WebMvcConfigurer {

    @SuppressWarnings("null")
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 주소에 대해
                .allowedOrigins("http://localhost:3000") // 리액트 서버(3000) 허용
// ★ "PATCH" 추가!
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS") // 모든 방식 허용
                .allowedHeaders("*") // 모든 헤더 허용
                .allowCredentials(true); // 쿠키/인증정보 허용
    }
}