package App.Financeiro.Repository;



import App.Financeiro.Entity.RelatorioMensalEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RelatorioMensalRepository extends JpaRepository<RelatorioMensalEntity,Long> {

    boolean existsByanoReferencia(int anoReferencia);
    boolean existsBymesReferencia(int mesReferencia);

    Optional<RelatorioMensalEntity> findByanoReferencia(int anoReferencia);
    Optional<RelatorioMensalEntity> findBymesReferencia(int mesReferencia);
}
