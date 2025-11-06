package org.example.lasirener.models;

import org.example.lasirener.models.enums.SirenStatus;

import java.util.Date;

public class Siren {

    int id;
    String name;
    double latitude;
    double longitude;
    SirenStatus status;
    boolean disabled;

    Date lastUpdated;

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
}
