import {Component, inject} from '@angular/core';
import {MdbFormsModule} from 'mdb-angular-ui-kit/forms';
import {CatalogsService} from "../../service/catalogs.service";
import {FormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {SearchS} from "../../entity/searchS";
import {SearchI} from "../../entity/searchI";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-catalogs',
  standalone: true,
  imports: [MdbFormsModule, FormsModule,
    MatAutocompleteModule, MatInputModule,
    CommonModule, NgOptimizedImage,
    RouterLink],
  templateUrl: './catalogs.component.html',
  styleUrl: './catalogs.component.scss'
})
export class CatalogsComponent {

  router = inject(Router);
  catalogsService = inject(CatalogsService);
  searchControl: string = '';
  searchS: SearchS[] = [];
  searchI: SearchI = new SearchI();
  fixedMovieOne: SearchI = new SearchI();
  fixedMovieTwo: SearchI = new SearchI();
  imdbIDmovieOne: string = 'tt13622970';
  imdbIDmovieTwo: string = 'tt27911000';

  constructor() {
    this.searchAnSpecificMovie();
  }

  searchAnSpecificMovie() {
    this.catalogsService.searchI(this.imdbIDmovieOne).subscribe({
      next: value => {
        this.fixedMovieOne = value;
      },
      error: err => {
        console.error("Classe app" +
          "/componentes/catalogs/catalogs.component/.ts + searchAnSpecificMovie()" +
          " + ocorreu um erro: " + err);
      }
    })
    this.catalogsService.searchI(this.imdbIDmovieTwo).subscribe({
      next: value => {
        this.fixedMovieTwo = value;
      },
      error: err => {
        console.error("Classe app" +
          "/componentes/catalogs/catalogs.component/.ts + searchAnSpecificMovie()" +
          " + ocorreu um erro: " + err);
      }
    })
  }


  searchMovieAndSeries() {
    this.router.navigate(['/principal/detailssearchmovie/search/'+this.searchControl]);
  }

}
/*
* this.catalogsService.searchS(this.searchControl).subscribe({
      next: results => {
        this.searchS = results;
        console.log(results);
      },
      error: err => {
        console.error("Classe app" +
          "/componentes/catalogs/catalogs.component/.ts + searchMovieAndSeries()" +
          " + ocorreu um erro: " + err);
      }
    })
*
* */
