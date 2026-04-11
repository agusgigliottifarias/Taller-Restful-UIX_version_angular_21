package unpsjb.labprog.backend.business;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import unpsjb.labprog.backend.model.Customer;;

public interface CustomerRepository extends Repository<Customer, Integer> {
    

    @Query("select e from Customer e where e.name like ?1")
    List<Customer> search(String term);
}
