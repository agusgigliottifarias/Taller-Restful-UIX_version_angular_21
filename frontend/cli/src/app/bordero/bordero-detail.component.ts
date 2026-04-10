import { Component } from '@angular/core';
import { Bordero } from './bordero';
import { NgbCalendar, NgbDateStruct, NgbDatepicker, NgbDatepickerModule, NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { BorderoService } from './bordero.service';
import { CustomerService } from '../customer/customer.service';
import { PlayService } from '../plays/play.services';
import { ModalService } from '../modal/modal.service';
import { Customer } from '../customer/customer';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, switchMap, tap } from 'rxjs';
import { Play } from '../plays/play';
import { CommonModule, Location } from "@angular/common";
import { Performance } from "./performance";
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-bordero-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbTypeaheadModule, NgbDatepickerModule],
  templateUrl:'bordero-detail.component.html',
  styles: ``
})
export class BorderoDetailComponent {
  bordero!: Bordero;
  borderoDate!: NgbDateStruct;
  searching: boolean = false;
  searchFailed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private borderoService: BorderoService,
    private customerService: CustomerService,
    private playService: PlayService,
    private location: Location,
    private calendar: NgbCalendar,
    private modalService: ModalService
  ){}

  ngOnInit(){
    this.get();
  }

  get(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id === 'new'){
      this.bordero = <Bordero>{
        customer: <Customer>{},
        performances: <Performance[]>[]
      }
      this.borderoDate = this.calendar.getToday();
    }else {
      this.borderoService.get(parseInt(id!))
        .subscribe((dataPackage) => this.bordero = <Bordero>dataPackage.data);
    }
  }

  goBack(){
    this.location.back();
  }

  save(){
    this.bordero.date = new Date(
      this.borderoDate.year,
      this.borderoDate.month - 1,
      this.borderoDate.day
    );

    this.borderoService.save(this.bordero).subscribe((datePackage) => {
      this.router.navigateByUrl("/", {
        skipLocationChange: true
      }).then(() => this.router.navigate(["/borderos/" + (<Bordero>datePackage.data).id]));
    });
  }

  searchCustomer = (text$: Observable<string>): Observable<any[]> =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => (this.searching = true)),
    switchMap((term) =>
      this.customerService
        .search(term)
        .pipe(
          map((response) => {
            let plays = <Customer[]> response.data;
            return plays;
          })
        )
        .pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
    ),
    tap(() => (this.searching = false))
  );

  searchPlay = (text$: Observable<string>): Observable<any[]> =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => (this.searching = true)),
    switchMap((term) =>
      this.playService
        .search(term)
        .pipe(
          map((response) => {
            let plays = <Play[]> response.data;
            return plays;
          })
        )
        .pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
    ),
    tap(() => (this.searching = false))
  );

  resultFormat(value: any){
    return value.name;
  }

  inputFormat(value: any){
    return value ? value.name : null;
  }
  
  addPerformance(){
    this.bordero.performances.push({play: <Play>{},audience: 0})
  }

  removePerformance(performance: Performance){
    this.modalService.confirm("Eliminar Performance", "¿Estas seguro de borrar esta performance?", "El cmabio no se confrimara hasta que no guarde el bordero")
    .then(
      () => {
        let performances = this.bordero.performances;
        performances.splice(performances.indexOf(performance), 1);
      }
    )
  }
}

