package org.example.lasirener.Fires;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FireService {

    private IFireRepository fireRepository;

    public FireService(IFireRepository fireRepository) {
        this.fireRepository = fireRepository;
    }

    public List<Fire> getAllFires(){
        return fireRepository.findAll();
    }

    public Fire addFire(Fire fire){
        return fireRepository.save(fire);
    }

}
