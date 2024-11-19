import {Component, ElementRef, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {SearchS} from "../../entity/searchS";
import {CatalogsService} from "../../service/catalogs.service";
import {CommonModule} from "@angular/common";
import {ApiResponse} from "../../entity/apiResponse";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-details-search-movie',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './details-search-movie.component.html',
  styleUrl: './details-search-movie.component.scss'
})
export class DetailsSearchMovieComponent {

  activatedRoute = inject(ActivatedRoute);
  search!: string;
  searchS: SearchS[]=[];
  catalogsService = inject(CatalogsService);
  apiResponse: ApiResponse = new ApiResponse();

  constructor(private eRef: ElementRef) {
    let search = this.activatedRoute.snapshot.params['search'];
    this.search = search;
    this.searchMovies();
  }

  searchMovies() {
    this.catalogsService.searchS(this.search).subscribe({
      next: value => {
        this.apiResponse = value;
        if(this.apiResponse.Response === "False" && this.apiResponse.Error === "Too many results.") {
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 10000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "info",
            title: "Too many results. Please refine your query!"
          });
        } else if(this.apiResponse.Response === "False" && this.apiResponse.Error === "Movie not found!") {
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 10000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "info",
            title: "Movie not found! Revise your query!"
          });
        } else {
          // Handle normal response
        }
      },
      error: err => {
        console.error("Classe app" +
          "/componentes/details-search-movie/details-search-movie.component/.ts + searchMovies()" +
          " + ocorreu um erro: " + err);
      }
    })
  }




}
