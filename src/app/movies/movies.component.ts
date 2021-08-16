import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { MessageService } from '../message.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  title = 'Movie List';
  queryString = '';
  movies: Movie[] = [];
  lis: any[] = [];
  page: number = 1;

  constructor(private movieService: MovieService, private messageService: MessageService) { }

  ngOnInit(): void {
    //test change
    //test change 2
  }

  getMovies(): void {
    this.messageService.clear();
    this.clearMovieList();
    if (this.queryString == "")
    {
      this.messageService.add("Try typing a title!");
      return;
    }
    if (this.queryString.length > 200)
    {
      this.messageService.add("That is far too long to be a movie's name!")
      return;
    }
    this.movieService.getMovies(this.queryString, this.page)
    .subscribe(
      Response =>
      {
        if(Response.Error)
        {
          this.messageService.add(Response.Error);
        }
        else
        {
          for(var item of Response.Search)
          {
            this.movies.push(<Movie>item);
          }
        }
      });
  }

  refreshMovies() {
    this.page = 1;
    this.getMovies();
  }
  decrementPage() {
    if (this.page > 1)
    {
      this.page--;
      this.getMovies();
    }
  }
  incrementPage() {
    this.page++;
    this.getMovies();
  }

  clearMovieList(): void {
    this.movies = [];
  }

}