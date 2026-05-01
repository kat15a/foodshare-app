package com.example.demo.repository;

import com.example.demo.model.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// ✅ IMPORTANT IMPORTS
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DonationRepository extends JpaRepository<Donation, Long> {

    // 🔥 NEARBY DONATIONS QUERY (HAVERSINE FORMULA)
    @Query(value = """
    SELECT * FROM donation d
    WHERE (
      6371 * acos(
        cos(radians(:lat)) *
        cos(radians(d.latitude)) *
        cos(radians(d.longitude) - radians(:lon)) +
        sin(radians(:lat)) *
        sin(radians(d.latitude))
      )
    ) < :distance
    """, nativeQuery = true)
    List<Donation> findNearbyDonations(
            @Param("lat") double lat,
            @Param("lon") double lon,
            @Param("distance") double distance
    );
}