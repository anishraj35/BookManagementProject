package com.example.demo.model;

import lombok.*;
import jakarta.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;   // ← add this import
import java.time.LocalDate;

@Document(collection = "books")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Book {

    @Id
    private String id;                      // e.g. B‑001

    @NotBlank @Size(max = 100)
    private String title;

    @NotBlank @Size(max = 50)
    private String author;

    @NotNull
    private LocalDate publicationDate;

    // ↓↓↓ add the unique index annotation here
    @Indexed(unique = true)
    @Pattern(regexp = "\\d{13}")
    private String isbn;

    @NotBlank
    private String genre;

    @Min(1) @Max(5)
    private int rating;
}
