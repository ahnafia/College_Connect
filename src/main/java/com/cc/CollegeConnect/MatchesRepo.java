package com.cc.CollegeConnect;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MatchesRepo extends CrudRepository<Matches, Long> {
    @Override
    List<Matches> findAll();
}
