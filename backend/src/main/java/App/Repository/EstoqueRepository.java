package App.Repository;

import App.Entity.EstoqueEntity;
import App.Entity.PedidoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EstoqueRepository extends JpaRepository<EstoqueEntity, Long> {

    Optional<EstoqueEntity> findBycodigo(String codigo);
}
