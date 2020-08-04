import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Book} from '../model/Book';
import { Observable } from 'rxjs';
import { Library } from '../model/Library';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable()
export class BookService {

    baseUrl:string = "http://localhost:8080";
    constructor(private httpClient : HttpClient) { }

      get_Allbooks(){
        return this.httpClient.get(this.baseUrl + '/library/books/books');
    }

    get_books(title:string,author:string,isbnNumber:string){
        this.resetURL();
        this.baseUrl+="/library/books?name="+title+"&author="+author+"&isbnNo="+isbnNumber;
        return this.httpClient.get(this.baseUrl);
    }

    findBookHistory(id:string){
        let bookHistoryUrl =this.baseUrl+'/library/books/'+id+'/issue-history';
        return this.httpClient.get(bookHistoryUrl);
    }

    resetURL(){
        this.baseUrl = "http://localhost:8080";
    }
   
    
    get_AllLibraries(){
        return this.httpClient.get(this.baseUrl + '/libraries');
    }

    get_libraryr (libraryId:any): Observable<Library>{
        return this.httpClient.get<Library>(this.baseUrl + '/libraries/'+libraryId);
    }

    saveBook(book:Book){
        let saveBookUrl =this.baseUrl+'/books/'+book.bid;
        const body = JSON.stringify(book);
        return this.httpClient.put(saveBookUrl, body, httpOptions);

    }

}