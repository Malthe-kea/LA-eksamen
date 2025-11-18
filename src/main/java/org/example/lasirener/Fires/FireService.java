package org.example.lasirener.Fires;

import jakarta.persistence.EntityNotFoundException;
import org.example.lasirener.Sirens.Siren;
import org.example.lasirener.Sirens.SirenService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FireService {

    private IFireRepository fireRepository;

    private SirenService sirenService;

    public FireService(IFireRepository fireRepository, SirenService sirenService) {
        this.fireRepository = fireRepository;
        this.sirenService = sirenService;
    }

    public List<Fire> getAllFires(){
        return fireRepository.findAll();
    }

    public Fire addFire(Fire fire) {
        Fire savedFire = fireRepository.save(fire);

        // Tjek alle sirener, og aktiver dem hvis de er inden for rækkevidde
        List<Siren> allSirens = sirenService.findAllSirens();
        for (Siren siren : allSirens) {
            boolean activated = sirenService.sirenStatusSwitch(fire, siren);
            if (activated) {
                sirenService.addSiren(siren); // Gem den opdaterede siren
            }
        }

        return savedFire;
    }

    public Fire changeFireStatus(Fire fire){

        Fire savedFire = fireRepository.save(fire);

        List<Siren> allSirens = sirenService.findAllSirens();
        for (Siren siren : allSirens){
            boolean activated = sirenService.sirenStatusSwitch(fire, siren);
            if (!activated) {
                sirenService.addSiren(siren);
            } else {
                sirenService.removeSiren(siren.getId());
            }


        }
        return savedFire;
    }

    public Optional<Fire> findFireById(int id){
        return fireRepository.findById(id);
    }

    public void updateFireStatus(int id, Fire updatedFire) {
        // Find eksisterende brand
        Fire existingFire = fireRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Fire not found: " + id));

        // Opdater status
        existingFire.setStatus(updatedFire.getStatus());

        // Hent alle sirener
        List<Siren> allSirens = sirenService.findAllSirens();

        // Kør sirenStatusSwitch på alle sirener
        for (Siren siren : allSirens) {
            sirenService.sirenStatusSwitch(existingFire, siren);
            // Gem sirenen, hvis det er nødvendigt
            sirenService.addSiren(siren); // Bedre end addSiren, hvis den allerede eksisterer
        }

        // Gem den opdaterede brand
        fireRepository.save(existingFire);
    }

}
