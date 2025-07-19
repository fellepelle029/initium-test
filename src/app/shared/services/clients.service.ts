import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClientsResponseType} from '../../../types/client.type';
import {environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) {
  }


  public getClients(): Observable< ClientsResponseType> {
    return this.http.get<ClientsResponseType>(`${environment.apiUrl}/task1`);
  }

}
