import { Component, Inject, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  appTitle = "SIGNAR";
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: '' });
  }

  confirm(): void {
    console.log('Confirmed!');
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

  
}
