package App.Financeiro.repository;




import App.Financeiro.Entity.VendasEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendasRepository extends JpaRepository<VendasEntity,Long> {
}
