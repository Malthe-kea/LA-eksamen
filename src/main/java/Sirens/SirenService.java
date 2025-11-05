package Sirens;

import jakarta.persistence.EntityNotFoundException;
import models.Siren;

public class SirenService {
    ISirenRepository sirenRepository;

    public SirenService(ISirenRepository sirenRepository) {
        this.sirenRepository = sirenRepository;
    }

    public Siren findSirenById(int id){
        return sirenRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Siren not found with id:" + id));
    }

    public SirenService(){

    }
}
