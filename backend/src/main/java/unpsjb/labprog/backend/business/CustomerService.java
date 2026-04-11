package unpsjb.labprog.backend.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unpsjb.labprog.backend.model.Customer;

@Service
public class CustomerService {
    
    @Autowired
    CustomerRepository repository;

    public List<Customer> search(String term){
        return repository.search("%"+term+"%");
    }
}
