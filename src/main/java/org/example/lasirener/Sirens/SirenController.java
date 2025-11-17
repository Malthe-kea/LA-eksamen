package org.example.lasirener.Sirens;

import org.example.lasirener.models.Siren;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/sirens")
public class SirenController {

    @Autowired
    private SirenService sirenService;

    public SirenController(SirenService sirenService) {
        this.sirenService = sirenService;
    }

    @GetMapping("")
    public ResponseEntity<List<Siren>> getAllSirens() {
        return new ResponseEntity<>(sirenService.findAllSirens(), HttpStatus.OK);
    }
}
