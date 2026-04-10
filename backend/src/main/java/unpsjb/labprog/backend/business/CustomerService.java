package unpsjb.labprog.backend.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unpsjb.labprog.backend.model.Customer;

@Service
public class CustomerService {
    
    @Autowired
    CustomerRespository respository;

    public List<Customer> search(String term){
        return respository.search("%"+term+"%");
    }
}
