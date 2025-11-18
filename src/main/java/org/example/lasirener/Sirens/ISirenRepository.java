package org.example.lasirener.Sirens;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISirenRepository extends JpaRepository<Siren, Integer> {}
