package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.CustomerService;



@RestController
@RequestMapping("customers")
public class CustomerPresenter {
    
    @Autowired
    CustomerService service;

    @RequestMapping(value = "/search/{term}",method = RequestMethod.GET)
    public ResponseEntity<Object> search (@PathVariable("term")String term){
            return Response.ok(service.search(term));
    }
    
}
