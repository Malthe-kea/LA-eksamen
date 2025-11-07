package org.example.lasirener.Fires;

import org.example.lasirener.models.Fire;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FireService {

    private IFireRepository fireRepository;

    public FireService(){

    }

    public List<Fire> getAllFires(){
        return fireRepository.findAll();
    }

}
