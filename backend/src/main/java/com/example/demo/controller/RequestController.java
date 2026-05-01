package com.example.demo.controller;

import com.example.demo.model.Request;
import com.example.demo.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    @Autowired
    private RequestRepository requestRepo;

    // Create Request
    @PostMapping
    public Request createRequest(@RequestBody Request request) {
        request.setStatus("PENDING");
        return requestRepo.save(request);
    }

    // Get All Requests
    @GetMapping
    public List<Request> getAllRequests() {
        return requestRepo.findAll();
    }
}