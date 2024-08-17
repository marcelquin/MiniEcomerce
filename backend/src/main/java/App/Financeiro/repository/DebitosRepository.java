package App.Financeiro.repository;





import App.Financeiro.Entity.DebitosEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DebitosRepository extends JpaRepository<DebitosEntity,Long> {
}
