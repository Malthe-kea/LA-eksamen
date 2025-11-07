package org.example.lasirener.models;

import jakarta.persistence.*;
import org.example.lasirener.models.enums.FireStatus;

import java.util.Date;
import java.util.List;
@Entity
@Table(name = "fires")
public class Fire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(nullable = true)
    double latitude;

    @Column(nullable = true)
    double longitude;

    @Column(nullable = false)
    Date detectedAt;

    @Column(nullable = false)
    FireStatus status;

    @Column(nullable = true)
    Date closedAt;

    List<Fire>



    public Fire(int id, double latitude, double longitude, Date detectedAt, FireStatus status, Date closedAt) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.detectedAt = detectedAt;
        this.status = status;
        this.closedAt = closedAt;
    }

    public Fire(){

    }

    public void closeFire(){

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public Date getDetectedAt() {
        return detectedAt;
    }

    public void setDetectedAt(Date detectedAt) {
        this.detectedAt = detectedAt;
    }

    public FireStatus getStatus() {
        return status;
    }

    public void setStatus(FireStatus status) {
        this.status = status;
    }

    public Date getClosedAt() {
        return closedAt;
    }

    public void setClosedAt(Date closedAt) {
        this.closedAt = closedAt;
    }

}
