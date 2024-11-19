import {Component, inject} from '@angular/core';
import {SearchI} from "../../entity/searchI";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

  moviesFavorite: SearchI[] = [];


  constructor() {
    this.moviesFavorite = this.getFavorites();
  }

  getFavorites(): SearchI[] {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }
}
