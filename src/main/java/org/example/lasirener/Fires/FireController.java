package org.example.lasirener.Fires;

import org.example.lasirener.Sirens.SirenService;
import org.example.lasirener.models.Location;
import org.example.lasirener.models.enums.FireStatus;
import org.example.lasirener.utils.GeoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1/fires")
@CrossOrigin("*")
public class FireController {

    @Autowired
    private SirenService sirenService;

    private final FireService fireService;

    public FireController(FireService fireService){
        this.fireService = fireService;
    }

    @GetMapping("")
    public ResponseEntity<List<Fire>> getAllFires() {
            return new ResponseEntity<>(fireService.getAllFires(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Fire> addFire(@RequestBody Fire fire){

        Fire savedFire = fireService.addFire(fire);

        return new ResponseEntity<>(savedFire, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fire> updateFireStatus(@PathVariable int id, @RequestBody Fire updatedFire) {
        fireService.updateFireStatus(id, updatedFire);

        return ResponseEntity.ok(updatedFire);
    }
}
