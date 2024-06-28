package App.Repository;

import App.Entity.ClienteEmpresaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteEmpresaRepository extends JpaRepository<ClienteEmpresaEntity, Long> {
}
