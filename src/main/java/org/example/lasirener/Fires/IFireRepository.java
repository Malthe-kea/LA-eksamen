package org.example.lasirener.Fires;

import org.example.lasirener.models.Fire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFireRepository extends JpaRepository<Fire, Integer> {
}
