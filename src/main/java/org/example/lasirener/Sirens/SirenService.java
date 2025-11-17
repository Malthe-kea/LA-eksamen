package org.example.lasirener.Sirens;

import jakarta.persistence.EntityNotFoundException;
import org.example.lasirener.models.Siren;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SirenService {

    @Autowired
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
