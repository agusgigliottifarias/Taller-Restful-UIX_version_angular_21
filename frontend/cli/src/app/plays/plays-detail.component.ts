import { CommonModule, Location,UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Play } from './play';
import { ActivatedRoute } from '@angular/router';
import { PlayService } from './play.services';

@Component({
  selector: 'app-plays-detail',
  imports: [UpperCasePipe, FormsModule,CommonModule],
  template: ` 
    <div *ngIf="play">
      <h2>{{ play.name | uppercase }}</h2>
      <form #form = 'ngForm'>
        <div class="form-group">
          <label form="name">Nombre:</label>
          <input name="name" placeholder="Nombre" class="form-control" [(ngModel)]="play.name" required #name="ngModel">
          <div *ngIf= "name.invalid && (name.dirty || name.touched)" class="alert">
            <div *ngIf= "name.errors?.['required']">
              El nombre de la obra es requerido
            </div>
          </div>
        </div>
        <div class="form-group">
          <label form="code">Codigo:</label>
          <input name="code" placeholder="Codigo" class="form-control" [(ngModel)]="play.code">
        </div>
        <div class="form-group">
          <label form="type">Tipo:</label>
          <select name="type" placeholder="Tipo" class="form-control" [(ngModel)]="play.type">
            <option value="comdey">Comedia</option>
            <option value="tragedy">Tregedia</option>
            <option value="musical">Musical</option>
            <option value="drama">Drama</option>
            <option value="space">Espacial</option>
            <option value="horror">Horror</option>
            <option value="futuristic">Futurista</option>
          </select>
        </div>
        <button (click)="goBack()" class="btn btn-danger">Atras</button>
        <button (click) ="save()" class="btn btn-success" [disabled]="form.invalid" >Guardar</button>
      </form>
    </div>   
  `,
  styles: ``,
})
export class PlaysDetailComponent {
  play! : Play;
  
 constructor(
  private route:ActivatedRoute,
  private playservice:PlayService,
  private location: Location
 ){}

  goBack(): void{
      this.location.back()
  } 

  save(): void{
      this.playservice.save(this.play).subscribe(play => { this.play = play; this.goBack();});
  }

  get() : void{
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.playservice.get(id).subscribe(play => this.play = play);
  }

  ngOnInit(){
    this.get();
  }
}

/* Videos 
Introducción a Angular - Taller RESTful UIX  (Visto)
Frontend - Lista y formulario de Obras - Taller RESTful UIX (Visto)
CRUD de Play - Taller Restful UIX
Frontend - Conectando con el backend - Taller RESTful UIX
Frontend - Guardar Obra, Modal, Paginación - Taller Restful UIX
CRUD de Customer - Taller Restful UIX
CRUD de Borderó - Taller Restful UIX
*/
