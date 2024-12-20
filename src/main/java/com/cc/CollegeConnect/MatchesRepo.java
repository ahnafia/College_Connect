package com.cc.CollegeConnect;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MatchesRepo extends CrudRepository<Matches, Long> {
    @Override
    List<Matches> findAll();

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM Matches WHERE username = :username", nativeQuery = true)
    void deleteByUsername(@Param("username") String username);
}
