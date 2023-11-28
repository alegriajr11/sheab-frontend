import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/SpIps/item.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemipsService {


  itemipsURL = environment.itemipsURL

  constructor(private httpClient: HttpClient) { }

  public listaOne(id: string): Observable<Item>{
    return this.httpClient.get<Item>(this.itemipsURL + id)
  }

  public lista(): Observable<Item[]>{
    return this.httpClient.get<Item[]>(this.itemipsURL)
  }
}
