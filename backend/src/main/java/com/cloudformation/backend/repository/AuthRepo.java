package com.cloudformation.backend.repository;

import com.cloudformation.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepo extends JpaRepository<User, Long> {
    User findByUserName(String userName);
}