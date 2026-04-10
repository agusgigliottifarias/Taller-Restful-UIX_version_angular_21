import { CommonModule, Location, UpperCasePipe } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { Play } from './play';
import { ActivatedRoute } from '@angular/router';
import { PlayService } from './play.services';

@Component({
  selector: 'app-plays-detail',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, CommonModule],
  template: ` 
    <div *ngIf="play">
      <h2>{{ play.name | uppercase }}</h2>
      <form #form='ngForm'>
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input name="name" placeholder="Nombre" class="form-control" [(ngModel)]="play.name" required #name="ngModel">
        </div>
        <div class="form-group">
          <label for="code">Codigo:</label>
          <input name="code" placeholder="Codigo" class="form-control" [(ngModel)]="play.code">
        </div>
        <div class="form-group">
          <label for="type">Tipo:</label>
          <select name="type" class="form-control" [(ngModel)]="play.type">
            <option *ngFor = "let type of TYPES" [ngValue]="">{{type}}</option>
          </select>
        </div>
        <br>
        <button type="button" (click)="goBack()" class="btn btn-danger me-2">Atras</button>
        <button type="button" (click)="save()" class="btn btn-success" [disabled]="form.invalid">Guardar</button>
      </form>
    </div>   
  `,
})
export class PlaysDetailComponent {
  play!: Play;

  TYPES = [
    "Tragedia",
    "Comedia",
    "Futurista",
    "Drama",
  ]

  constructor(
    private route: ActivatedRoute,
    private playservice: PlayService,
    private location: Location,
    private cdr: ChangeDetectorRef // para que cargun las obras
  ){}

  ngOnInit(): void { 
    this.get(); 
  }
  
  save(): void { 
    this.playservice.save(this.play).subscribe((dataPackage) => {
        this.play = <Play>dataPackage.data; 
        this.goBack(); 
    }); 
  }

  get(): void {
    const code = this.route.snapshot.paramMap.get('code')!;
    if(code === 'new'){
      this.play = <Play>{type:''};
    }else{
      this.playservice.get(code).subscribe(dataPackage => {
        this.play = <Play>dataPackage.data; 
        this.cdr.detectChanges(); 
      });
    }
  }


  goBack(): void { 
    this.location.back(); 
  }
}