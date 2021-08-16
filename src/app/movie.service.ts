import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from './movie';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesUrl = 'http://www.omdbapi.com/?s=';
  private apiKey = "&apikey=3f66eca5";
  private pageQuery = "&page=";
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getMovies(queryString: string, pageNumber: number): Observable<any> {
    let url = this.moviesUrl + queryString + this.apiKey + this.pageQuery + pageNumber;
    return this.http.get<any>(url)
    .pipe(
      catchError(this.handleError<any>('getMovies', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`MovieService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}
