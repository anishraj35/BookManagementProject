package com.example.demo.controller;

import com.example.demo.model.Book;
import com.example.demo.repository.BookRepository;
import com.example.demo.service.SequenceGeneratorService;
import com.example.demo.service.GoogleBooksService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class BookController {

    private final BookRepository repo;
    private final SequenceGeneratorService seqGen;
    private final GoogleBooksService google;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Book create(@Valid @RequestBody Book book) {
        book.setId(seqGen.nextBookId());
        try {
            return repo.save(book);
        } catch (DuplicateKeyException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "ISBN already exists", ex);
        }
    }

    @GetMapping
    public Page<Book> all(Pageable pageable) {
        return repo.findAll(pageable);
    }

    @GetMapping("/{id}")
    public Book one(@PathVariable String id) {
        return repo.findById(id)
                   .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book " + id + " not found"));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) {
        repo.deleteById(id);
    }

    @GetMapping("/details/{isbn}")
    public Mono<String> details(@PathVariable String isbn) {
        return google.fetchByIsbn(isbn);
    }
}
