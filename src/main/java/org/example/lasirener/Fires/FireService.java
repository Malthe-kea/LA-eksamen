package org.example.lasirener.Fires;

import org.example.lasirener.Sirens.Siren;
import org.example.lasirener.Sirens.SirenService;
import org.springframework.stereotype.Service;

import java.util.List;

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
            boolean activated = sirenService.activateSirenIfInRangeOfFire(fire, siren);
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
            boolean activated = sirenService.activateSirenIfInRangeOfFire(fire, siren);
            if (!activated) {
                sirenService.addSiren(siren);
            } else {
                sirenService.removeSiren(siren.getId());
            }


        }
        return savedFire;

    }

}
