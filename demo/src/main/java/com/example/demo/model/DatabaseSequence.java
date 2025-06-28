package com.example.demo.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="database_sequences")
@Data @NoArgsConstructor @AllArgsConstructor
public class DatabaseSequence {
    @Id  private String id;   // "book_seq"
    private long   seq;
}
