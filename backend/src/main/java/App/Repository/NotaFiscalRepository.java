package App.Repository;

import App.Entity.NotaFiscalEntity;
import App.Entity.ScoreEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotaFiscalRepository extends JpaRepository<NotaFiscalEntity,Long> {


    Optional<NotaFiscalEntity> findByxml(String xml);
}
