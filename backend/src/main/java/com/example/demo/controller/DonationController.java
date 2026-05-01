package com.example.demo.controller;

import com.example.demo.model.Donation;
import com.example.demo.model.User;
import com.example.demo.repository.DonationRepository;
import com.example.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.io.File;
import java.io.IOException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/donations")
public class DonationController {

    @Autowired
    private DonationRepository donationRepo;

    @Autowired
    private UserRepository userRepo;

    // ✅ ADD DONATION
    @PostMapping(consumes = "multipart/form-data")
    public Donation addDonation(
            @RequestParam("file") MultipartFile file,
            @RequestParam("foodName") String foodName,
            @RequestParam("quantity") int quantity,
            @RequestParam("userId") Long userId,
            @RequestParam("lat") double lat,
            @RequestParam("lng") double lng
    ) throws IOException {

        String uploadDir = System.getProperty("user.dir") + "/uploads/";
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        String filePath = uploadDir + fileName;

        file.transferTo(new File(filePath));

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Donation d = new Donation();
        d.setFoodName(foodName);
        d.setQuantity(quantity);
        d.setImageUrl(fileName);
        d.setLatitude(lat);
        d.setLongitude(lng);
        d.setStatus("AVAILABLE");
        d.setDonor(user);

        return donationRepo.save(d);
    }

    // ✅ GET ALL
    @GetMapping
    public List<Donation> getAllDonations() {
        return donationRepo.findAll();
    }

    // 🔥 NEARBY
    @GetMapping("/nearby")
    public List<Donation> getNearbyDonations(
            @RequestParam double lat,
            @RequestParam double lon,
            @RequestParam double distance
    ) {
        return donationRepo.findNearbyDonations(lat, lon, distance);
    }

    // ✅ CLAIM WITH USER
    @PutMapping("/{id}/claim/{userId}")
    public Donation claimDonation(@PathVariable Long id, @PathVariable Long userId) {

        Donation donation = donationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Donation not found"));

        User receiver = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        donation.setStatus("CLAIMED");
        donation.setReceiver(receiver);

        return donationRepo.save(donation);
    }

    // ✅ SIMPLE CLAIM (used by your frontend)
    @PutMapping("/{id}/claim")
    public Donation claimFood(@PathVariable Long id) {

        Donation donation = donationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Donation not found"));

        donation.setStatus("CLAIMED");

        return donationRepo.save(donation);
    }

    // ✅ ✅ ✅ CANCEL API (THIS FIXES YOUR ISSUE)
    @PutMapping("/{id}/cancel")
    public Donation cancelDonation(@PathVariable Long id) {

        Donation donation = donationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Donation not found"));

        donation.setStatus("AVAILABLE"); // ⭐ IMPORTANT
        donation.setReceiver(null);      // ⭐ OPTIONAL (clean reset)

        return donationRepo.save(donation);
    }
}