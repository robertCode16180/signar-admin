import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

class Person {
  id: number;
  NombreDocumento: string;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}




@Component({
  selector: 'app-agregar-documentos',
  templateUrl: 'agregar-documentos.component.html',
  styleUrls: ['agregar-documentos.component.css']
})
export class AgregarDocumentosComponent {

  dtOptions: DataTables.Settings = {};
  //dtTrigger: Subject = new Subject();

  constructor(private httpClient: HttpClient) { }


}
