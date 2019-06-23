import { Component, OnInit } from '@angular/core';
import {NewCustomer} from '../../models/new-customer';
import {CustomersService as CrudService} from '../../services/crud-customer.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  customers: NewCustomer;
  id: string;

  constructor(private crudService: CrudService, private router: Router, private activeRoute: ActivatedRoute, private fm:FlashMessagesService) {
    document.title = "Customer Editor";
    const url = router.url;
    console.log(url);

  }

  ngOnInit() {
    this.activeRoute.params.forEach((params: Params) => {
          this.id = params['id'];
        }
    );
    this.crudService.getCustomer(this.id).subscribe((customers: NewCustomer) => {
          this.customers = customers;
          console.log(customers);
        }
    );
  }
  onFormSubmit({value, valid}: { value: NewCustomer, valid: boolean }) {
    if(valid){
      console.log(value);
      value.id = this.id;
      this.crudService.updateCustomer(value);
      this.fm.show("Customer updated yaani!!",{cssClass:'alert-success text-black text-center', timeout: 3000});
      this.router.navigate(['/users']);
    }
  }

}
