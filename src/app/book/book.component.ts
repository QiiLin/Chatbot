
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http'

import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { MenuItem, SelectItem } from 'primeng/api'; 
import { book_value} from '../book/book.value';
import { ResponseType } from '@angular/http/src/enums';
import { MultiSelectModule } from 'primeng/multiselect';




@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})


export class BookComponent implements OnInit {
  rangeDates: Date;
  books: any;
  selectedBooks: any;
  ifRight: SelectItem[];
  constructor(private http: HttpClient) {  }

  ngOnInit() {
    this.http.get<book_value>('/book').subscribe (
      data => this.books = data
    );

    this.ifRight = [];
    this.ifRight.push({label: 'Unable to Answer', value: 'I’m sorry. I don’t understand your question. Could you please rephrase?'});
    
  
  }
}
