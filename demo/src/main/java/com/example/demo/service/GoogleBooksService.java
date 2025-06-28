package com.example.demo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class GoogleBooksService {
    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://www.googleapis.com/books/v1")
            .build();

    public Mono<String> fetchByIsbn(String isbn) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/volumes")
                        .queryParam("q", "isbn:" + isbn)
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }
}
