
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
import { Data } from '@angular/router/src/config';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})


export class BookComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
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
      if ((filter[0] === undefined || filter[0] === null) && (filter[1] === undefined || filter[1] === null)) {
        return true;
      }
      var minDate = null;
      var maxDate = null;
      var currDate = new Date(value).getTime();
      if (filter[0] != null) {
        minDate = new Date(filter[0]).getTime();
      }
      if (filter[1] != null) {
        maxDate = new Date(filter[1]).getTime();
      }

      if (maxDate != null && minDate != null) {
          if (currDate < (maxDate) && currDate >= minDate ) {
              return true;
          } else {
              return false;
          }
      } else if (minDate != null) {
          if (currDate >= minDate) {
              return true;
          } else {
              return false;
          }
      } else {
        if (currDate <= maxDate) {
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
    var rangeDates: Date[] = [this.minDate, this.maxDate];;
    dt.filter(rangeDates ,col.field, col.filterMatchMode);

}

}
