package com.cloudformation.backend.service;

import com.cloudformation.backend.model.User;
import com.cloudformation.backend.repository.AuthRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthRepo authRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String signUp(User user) {
        if (authRepo.findByUserName(user.getUserName()) != null) {
            return "User already exists";
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        authRepo.save(user);
        return "User registered successfully";
    }
}