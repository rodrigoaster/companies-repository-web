import { DialogComponent } from './../../shared/components/dialog/dialog.component';
import { CompaniesService } from './../services/companies.service';
import { Component } from '@angular/core';

import { Company } from '../entities/company';

import { MatDialog } from '@angular/material/dialog';

import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})


export class CompaniesComponent {
  companies$: Observable<Company[]>
  displayedColumns = [
    '_id',
    'name',
    'cnpj',
    'patrimony_value',
    'micro_enterprise',
    'social_registration',
    'name_partner',
    'cpf_partner'
  ]

  constructor(
    private companiesService: CompaniesService,
    public dialog: MatDialog
  ) {
    this.companies$ = this.companiesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar as empresas, tente novamente mais tarde.')
        return of([])
      })
    )
  }

  onError(errorMessage: string) {
    this.dialog.open(DialogComponent, {
      data: errorMessage
    })
  }
}
