import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BookService } from './service/book.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operator/filter';



import 'rxjs/add/observable/of';

import { Library } from './model/Library';
import { Book } from './model/Book';

@Component({
  selector: 'app-server',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  providers: [BookService]
})

export class LibraryComponent {
  
   private libraryObservable: Observable<any>;
  private libraries = Array<Library>();
  private displayLibraries = Array<Library>();


  constructor(private bookService: BookService) {
   
    this.libraryObservable =  this.bookService.get_AllLibraries();
    this.libraryObservable.subscribe(data => {
      this.libraries = data;
       this.displayLibraries[0] =  this.libraries[0];
    });
   
    

  }
  /* */

  
  onLibrarySelect(name:any) {
    
    let lid =  this.libraries.filter((item) => item.name == name)[0].lid;

    this.bookService.get_libraryr(lid).subscribe(
      data => {
        this.displayLibraries = [];
          this.displayLibraries.push(data);
          console.log(JSON.stringify( this.displayLibraries ))
      },
      err => console.log(err)
    );
   
  
  }


  saveBook(book:Book) {
   
    this.bookService.saveBook(book).subscribe(
      response => {
        if(response){
          alert("Book updated Successfully");
        }
      },
      err => console.log(err)
    );
  }
}