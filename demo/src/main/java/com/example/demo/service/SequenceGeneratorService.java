package com.example.demo.service;

import com.example.demo.model.DatabaseSequence;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.*;
import org.springframework.data.mongodb.core.query.*;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class SequenceGeneratorService {

    private final MongoOperations mongoOps;

    public String nextBookId() {
        Query  q = new Query(Criteria.where("_id").is("book_seq"));
        Update u = new Update().inc("seq",1);
        DatabaseSequence counter = mongoOps.findAndModify(
                q, u,
                FindAndModifyOptions.options().returnNew(true).upsert(true),
                DatabaseSequence.class);
        long seq = (counter != null) ? counter.getSeq() : 1L;
        return String.format("B-%03d", seq);
    }
}
