package org.example.lasirener.Sirens;

import jakarta.persistence.*;
import org.example.lasirener.Fires.Fire;
import org.example.lasirener.models.enums.SirenStatus;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Siren {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column()
    String name;

    @Column
    double latitude;

    @Column
    double longitude;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    SirenStatus status;

    @Column
    boolean disabled;

    @Column
    Date lastUpdated;

    @ManyToMany(mappedBy = "")
    private Set<Fire> fireSet = new HashSet<>();

    public Siren(int id, String name, double latitude, double longitude, SirenStatus status, boolean disabled, Date lastUpdated) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = status;
        this.disabled = disabled;
        this.lastUpdated = lastUpdated;
    }

    public Siren(){
    }

    public void setStatus(SirenStatus status) {
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public SirenStatus getStatus() {
        return status;
    }

    public boolean isDisabled() {
        return disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
