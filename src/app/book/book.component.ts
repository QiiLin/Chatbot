
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http'

import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { MenuItem, SelectItem } from 'primeng/api'; 
import { book_value} from '../book/book.value';
import { ResponseType } from '@angular/http/src/enums';
import { MultiSelectModule } from 'primeng/multiselect';
import {DataTable} from 'primeng/datatable';
import { Calendar } from 'primeng/calendar';


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

  @ViewChild('dt') dt: DataTable;
  @ViewChild('p-calendar') calendar: Calendar;
  public clearbutt(dt) {
    this.calendar.value = null;
   // this.calendar.updateInputField();
    
  }
  constructor(private http: HttpClient) {  }

  ngOnInit() {
    this.http.get<book_value>('/book').subscribe (
      data => this.books = data
    );
    this.ifRight = [];
    this.ifRight.push({label: 'Unable to Answer', value: 'I’m sorry. I don’t understand your question. Could you please rephrase?'});
    this.dt.filterConstraints["Rangefilter"] = function Rangefilter(value, filter) {
      var currDate = new Date(value).getTime();
      var minDate = new Date(filter[0]).getTime();
      var currDay = new Date(value).getDate();
      var minDay = new Date(filter[0]).getDate();

      if (filter[1]!= null) {
          var maxDate = new Date(filter[1]).getTime();
      }
      
      if (filter === undefined || filter === null){
          return true;
      }

      if (filter[1]!== null) {
          if (currDate < (maxDate+86400000) && currDate >= minDate ) {
              return true;
          } else {
              return false;
          }
      } else {
          if (currDay===minDay) {
              return true;
          } else {
              return false;
          }
      }               

  }
  }

  public end(value, dt, col) {
    // value = array of data from the current row
    // filter = value from the filter that will be searched in the value-array
    dt.filter(this.rangeDates ,col.field, col.filterMatchMode);

}

}
