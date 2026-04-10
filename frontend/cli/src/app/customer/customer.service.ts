import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DataPackage } from "../data-package";

@Injectable ({
    providedIn: 'root'
})
export class CustomerService{

    private customerdUrl = "rest/Customers";
    constructor (private htpClient: HttpClient){ }

    search (searchTerm: string): Observable<DataPackage>{
        return this.htpClient.get<DataPackage>('$this.customersUrl}/search/${searchTerm}');
    }
}