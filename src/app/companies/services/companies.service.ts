import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Company } from './../entities/company';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CompaniesService {

  private readonly API = '/assets/companies.json';

  constructor(
    private httpCliente: HttpClient
  ) { }

  list() {
    return this.httpCliente.get<Company[]>(this.API)
    .pipe(
      first(),
      delay(5000),
      tap(companies => console.log(companies))
    );
  }
}
