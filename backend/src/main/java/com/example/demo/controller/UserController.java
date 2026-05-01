package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    // ✅ REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepo.save(user);
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User loginData) {

        User user = userRepo.findByEmail(loginData.getEmail());

        if (user != null && user.getPassword().equals(loginData.getPassword())) {
            return user;
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}