import {Routes} from '@angular/router';
import {CatalogsComponent} from "./componentes/catalogs/catalogs.component";
import {MovieDetailsComponent} from "./componentes/movie-details/movie-details.component";
import {DetailsSearchMovieComponent} from "./componentes/details-search-movie/details-search-movie.component";
import {PrincipalComponent} from "./componentes/principal/principal.component";
import {FavoritesComponent} from "./componentes/favorites/favorites.component";

export const routes: Routes = [
  {path: '', redirectTo: 'principal/catalogs', pathMatch: 'full'},
  {path: 'principal', redirectTo: 'principal/catalogs', pathMatch: 'full'},
  {
    path: 'principal', component: PrincipalComponent,
    children:[
      {path: 'catalogs', component: CatalogsComponent},
      {path: 'moviedetails/:imdbID', component: MovieDetailsComponent},
      {path: 'detailssearchmovie/search/:search', component: DetailsSearchMovieComponent},
      {path: 'favorites', component: FavoritesComponent},
    ]
  }
];
