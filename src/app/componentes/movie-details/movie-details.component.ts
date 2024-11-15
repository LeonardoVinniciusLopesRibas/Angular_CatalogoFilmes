  import {Component, ElementRef, inject} from '@angular/core';
  import {ActivatedRoute, RouterLink} from "@angular/router";
  import {CatalogsService} from "../../service/catalogs.service";
  import {SearchI} from "../../entity/searchI";
  import {CommonModule, NgIf} from "@angular/common";

  @Component({
    selector: 'app-movie-details',
    standalone: true,
    imports: [
      NgIf, CommonModule, RouterLink
    ],
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss']

  })
  export class MovieDetailsComponent {

    activatedRoute = inject(ActivatedRoute);
    catalogsService = inject(CatalogsService);
    imdbID!: string;
    movieDetails: SearchI = new SearchI();

    constructor(private eRef: ElementRef) {
      let imdbID = this.activatedRoute.snapshot.params['imdbID'];
      this.imdbID = imdbID;
      this.searchAnSpecificMovie();


    }

    searchAnSpecificMovie() {
      this.catalogsService.searchI(this.imdbID).subscribe({
        next: value => {
          this.movieDetails = value;
        },
        error: err => {
          console.error("Classe app" +
            "/componentes/catalogs/catalogs.component/.ts + searchAnSpecificMovie()" +
            " + ocorreu um erro: " + err);
        }
      })
    }

    isFavorite(): boolean {
      const favorites = this.getFavorites();
      return favorites.some(movie => movie.imdbID === this.movieDetails.imdbID);
    }

    toggleFavorite(): void {
      const favorites = this.getFavorites();

      if (this.isFavorite()) {
        const updatedFavorites = favorites.filter(movie => movie.imdbID !== this.movieDetails.imdbID);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      } else {
        favorites.push(this.movieDetails);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
    }

    getFavorites(): SearchI[] {
      const favorites = localStorage.getItem('favorites');
      return favorites ? JSON.parse(favorites) : [];
    }

  }
