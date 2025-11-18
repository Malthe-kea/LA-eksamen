package org.example.lasirener.Sirens;

import org.example.lasirener.Fires.Fire;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("")
    public ResponseEntity<Siren> addSiren(@RequestBody Siren siren){

        Siren savedSiren = sirenService.addSiren(siren);
        return new ResponseEntity<>(savedSiren, HttpStatus.CREATED);

    }
    @DeleteMapping("/{id}")
        public ResponseEntity<String> deleteSiren(@PathVariable int id) {
            sirenService.removeSiren(id);
            return ResponseEntity.ok("Siren with id " + id + " has been removed.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Siren> updateSirenStatus(@PathVariable int id, @RequestBody Siren updatedSiren) {
        updatedSiren.setId(id); // Sikrer, at id matcher path
        Siren siren = sirenService.updateSirenStatus(updatedSiren);
        return ResponseEntity.ok(siren);
    }

}


