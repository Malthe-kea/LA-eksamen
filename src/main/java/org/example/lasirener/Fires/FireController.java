package org.example.lasirener.Fires;

import org.example.lasirener.models.Fire;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/fires")
public class FireController {

    private final FireService fireService;

    private FireController(FireService fireService){
        this.fireService = fireService;
    }

    @GetMapping("")
    public ResponseEntity<List<Fire>> getAllFires(){
        return new ResponseEntity<>(fireService.getAllFires(), HttpStatus.OK);
    }
}
