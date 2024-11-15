import {inject, Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {SearchS} from "../entity/searchS";
import {HttpClient} from "@angular/common/http";
import {SearchI} from "../entity/searchI";
import {ApiResponse} from "../entity/apiResponse";

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {

  http = inject(HttpClient);
  api_key:string = 'e12d9880';
  base_url:string = `http://www.omdbapi.com/?apikey=${this.api_key}&`;

  searchS(search:string):Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.base_url}&s=${search}`);
  }

  searchI(imdbID:string):Observable<SearchI>{
    return this.http.get<SearchI>(`${this.base_url}&i=${imdbID}`);
  }



}
