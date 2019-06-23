import {Component, OnInit} from '@angular/core';
import {CustomersService} from '../../services/crud-customer.service';
import {NewCustomer} from '../../models/new-customer';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    selector: 'app-new-customer',
    templateUrl: './new-customer.component.html',
    styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
    address: string = '';
    customers: NewCustomer;
    firstName: string;
    lastName: string;
    userEmail: string;
    userBirthday: string;
    userAddress: string;
    ngForm: any;
    userPhone: any;
    userNotes: string;

    constructor(private cs: CustomersService, private router: Router, private fm: FlashMessagesService) {
    }

    ngOnInit() {
        document.title = 'Rabak Inc. | Add new customer';

    }


    onFormSubmit({value, valid}: { value: NewCustomer, valid: boolean }) {
        if(valid){
            this.cs.addCustomer(value);
            this.fm.show("Customer Added!",{cssClass:'alert-success text-black text-center', timeout: 3000});
            this.router.navigate(['/users']);
        }
    }

}
