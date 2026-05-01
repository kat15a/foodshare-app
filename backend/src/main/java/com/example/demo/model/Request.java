package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    private String status;

    @ManyToOne
    @JoinColumn(name = "donation_id")
    private Donation donation;

    @ManyToOne
    @JoinColumn(name = "ngo_id")
    private User ngo;

    // Getters & Setters
    public Long getRequestId() { return requestId; }

    public void setRequestId(Long requestId) { this.requestId = requestId; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public Donation getDonation() { return donation; }

    public void setDonation(Donation donation) { this.donation = donation; }

    public User getNgo() { return ngo; }

    public void setNgo(User ngo) { this.ngo = ngo; }
}