package Sirens;

import jakarta.persistence.EntityNotFoundException;
import models.Siren;

import java.util.List;
import java.util.Optional;

public class SirenService {
    ISirenRepository sirenRepository;

    public SirenService(ISirenRepository sirenRepository) {
        this.sirenRepository = sirenRepository;
    }
    public SirenService(){}

    public Siren findSirenById(int id){
        return sirenRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Siren not found with id:" + id));
    }

    public List<Siren> findAllSirens(){
        return sirenRepository.findAll();
    }


}
