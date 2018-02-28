
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpParams} from '@angular/common/http'

import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api'; 
import { book_value} from '../book/book.value';
import { ResponseType } from '@angular/http/src/enums';





@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})


export class BookComponent implements OnInit {
  rangeDates: Date[];
  books: any;
  selectedBooks: any;
  constructor(private http: HttpClient) {  }

  ngOnInit() {
    this.http.get<book_value>('/book').subscribe (
      data => this.books = data
    );
  
  }
}
