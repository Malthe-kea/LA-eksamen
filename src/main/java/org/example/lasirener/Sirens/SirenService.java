package org.example.lasirener.Sirens;

import jakarta.persistence.EntityNotFoundException;
import org.example.lasirener.Fires.Fire;
import org.example.lasirener.models.Location;
import org.example.lasirener.models.enums.FireStatus;
import org.example.lasirener.models.enums.SirenStatus;
import org.example.lasirener.utils.GeoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SirenService {

    @Autowired
    ISirenRepository sirenRepository;

    @Autowired
    private GeoUtils geoUtils;

    public SirenService(ISirenRepository sirenRepository) {
        this.sirenRepository = sirenRepository;
    }

    public SirenService() {
    }

    public Siren findSirenById(int id) {
        return sirenRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Siren not found with id:" + id));
    }

    public List<Siren> findAllSirens() {
        return sirenRepository.findAll();
    }

    public Siren addSiren(Siren siren) {
        return sirenRepository.save(siren);
    }

    public boolean sirenStatusSwitch(Fire fire, Siren siren) {

        Location fireLocation = new Location(fire.getLatitude(), fire.getLongitude());
        Location sirenLocation = new Location(siren.getLatitude(), siren.getLongitude());

        double rangeBetweenLocations = geoUtils.calculateDistanceKM(fireLocation, sirenLocation);

        if (rangeBetweenLocations <= 10 && fire.getStatus() == FireStatus.ACTIVE) {
            siren.setStatus(SirenStatus.ALERT);
            return true;
        } else if (rangeBetweenLocations >= 10 || fire.getStatus() == FireStatus.CLOSED) {
            siren.setStatus(SirenStatus.SAFE);
            return true;
        }
        return false;
    }


    public void removeSiren(int id) {
        Siren siren = sirenRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Siren not found with id: " + id));
        sirenRepository.delete(siren);
    }

    public Siren updateSirenStatus(Siren siren) {
        // Tjek om sirenen findes
        Siren existingSiren = sirenRepository.findById(siren.getId())
                .orElseThrow(() -> new EntityNotFoundException("Siren not found: " + siren.getId()));

        // Opdater felter (her status, position osv.)
        existingSiren.setStatus(siren.getStatus());

        // Gem ændringer
        return sirenRepository.save(existingSiren);
    }

     }

