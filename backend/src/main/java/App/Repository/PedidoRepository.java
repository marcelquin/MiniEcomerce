package App.Repository;

import App.Entity.PedidoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PedidoRepository extends JpaRepository<PedidoEntity,Long> {

    Optional<PedidoEntity> findBycodigo(String codigo);


}
