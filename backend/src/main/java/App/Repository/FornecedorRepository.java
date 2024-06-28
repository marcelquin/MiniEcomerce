package App.Repository;

import App.Entity.FornecedorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FornecedorRepository extends JpaRepository<FornecedorEntity,Long> {

    Optional<FornecedorEntity> findBycnpj(String cnpj);
}
