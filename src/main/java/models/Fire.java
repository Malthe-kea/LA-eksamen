package models;

import models.enums.FireStatus;

import java.util.Date;
import java.util.List;

public class Fire {

    int id;
    double latitude;
    double longitude;
    Date detectedAt;
    FireStatus status;
    Date closedAt;
    List<Siren> activatedSirens;



    public Fire(int id, double latitude, double longitude, Date detectedAt, FireStatus status, Date closedAt, List<Siren> activatedSirens) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.detectedAt = detectedAt;
        this.status = status;
        this.closedAt = closedAt;
        this.activatedSirens = activatedSirens;
    }

    public Fire(){

    }

    public void closeFire(){

    }

}
