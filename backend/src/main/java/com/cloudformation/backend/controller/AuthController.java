package com.cloudformation.backend.controller;

import com.cloudformation.backend.model.User;
import com.cloudformation.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from the frontend
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/signUp")
    public String signUp(@RequestBody User user) {
        if (user.getUserName() == null || user.getMail() == null || user.getPassword() == null) {
            return "Error: Missing required fields.";
        }
        return authService.signUp(user);
    }

    @PostMapping("/logIn")
    public String logIn(@RequestBody Map<String, String> credentials) {
        String userName = credentials.get("userName");
        String password = credentials.get("password");
        if (userName == null || password == null) {
            return "Error: Missing required fields.";
        }
        return authService.logIn(userName, password);
    }

}
