package Sirens;

import models.Siren;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ISirenRepository extends JpaRepository<Siren, Integer> {}
