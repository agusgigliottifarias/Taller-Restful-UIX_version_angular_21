import { Injectable } from '@angular/core';
import { BORDEROS } from './mock-bordero';
import { DataPackage } from '../data-package';
import { Bordero } from './bordero';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorderoService {
  private borderos = BORDEROS;

  constructor() { }

  get(id: number): Observable<DataPackage> {
    let dataPackage: DataPackage = {
      status: 200,
      message: 'OK',
      data: <Bordero>this.borderos.find(bordero => bordero.id === id)
    };
    return of(dataPackage);
  }

  save(bordero: Bordero): Observable<DataPackage> {
    let dataPackage: DataPackage = {
      status: 200,
      message: 'OK',
      data: {}
    };

    if (bordero.id) {
      let formerBordero: Bordero = <Bordero>this.borderos.find(aBordero => aBordero.id === bordero.id);
      Object.assign(formerBordero, bordero);
      dataPackage.data = formerBordero;
    } else {
      bordero.id = this.borderos.length + 1;
      this.borderos.push(bordero);
      dataPackage.data = bordero;
    }

    return of(dataPackage);
  }
}