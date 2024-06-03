package App.Repository;

import App.Entity.ClienteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteEntity,Long> {

    Optional<ClienteEntity> findBynome(String nome);


    boolean existsBynome(String nome);
}
