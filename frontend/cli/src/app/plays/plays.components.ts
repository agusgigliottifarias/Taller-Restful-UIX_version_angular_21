import { Component } from '@angular/core';
import { PLAYS } from './mock-plays';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-plays',
  imports: [CommonModule, RouterLink],
  template: `
    <h2>Plays</h2>
    <div class="table.responsive">
      <table class="table table .striped table.sm">
        <tr>
          <th>#</th>
          <th>Código</th>
          <th>Nombre</th>
          <th>Tipo</th>
          <th></th>
        </tr>
        <tbody>  
          <tr *ngFor="let play of plays; index as i ">
            <td>{{ i +1 }}</td>
            <td>{{play.code}}</td>
            <td>{{play.name}}</td>
            <td>{{play.type}}</td>
            <td>
              <a routerLink="/plays/{{play.id}}"><i class="fa fa-pencil"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

   `,
  styles: ``,
})
export class PlaysComponent {
  plays = PLAYS;
}
