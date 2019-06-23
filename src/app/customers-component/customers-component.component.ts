import {Component, OnInit} from '@angular/core';
import {CustomersControl} from '../models/customers-control';
import {CustomersService} from '../services/customers.service';
import {NewCustomer} from '../models/new-customer';
import {CustomersService as CrudService} from '../services/crud-customer.service';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
    selector: 'app-customers-component',
    templateUrl: './customers-component.component.html',
    styleUrls: ['./customers-component.component.css']
})
export class CustomersComponentComponent implements OnInit {

    constructor(private CS: CustomersService, private crudService: CrudService, private router:Router, private fm: FlashMessagesService) {
    }

    users: CustomersControl[];
    customers: NewCustomer[];
    customerCache: NewCustomer[];
    usersLength: number;
    usersCache: CustomersControl[];
    searchName: string;

    ngOnInit() {
        document.title = 'Rabak Inc | Users';
        this.CS.getCustomers().subscribe((customers: CustomersControl[]) => {
            this.users = this.usersCache = _.sortBy(customers, ['name']);
            this.usersLength = customers.length;
        });
        this.crudService.getCustomers().subscribe((customers: NewCustomer[]) => {
                this.customers = this.customerCache = customers;
            }
        );
        console.log(this.customers);
    }

    onKeyUpSearch() {
        const searchText = this.searchName.toLocaleLowerCase().trim();
        if (searchText.length > 0) {
            this.customers = this.customers.filter((user) => {
                return _.includes(user.firstName.toLocaleLowerCase().trim(), searchText);
            });
        } else {
            this.customers = this.customerCache;
        }
    }

    showHover(i) {
        let element = document.getElementById(i);
        element.classList.toggle('invisible');
    }

    hideHover(i) {
        let element = document.getElementById(i);
        element.classList.toggle('invisible');
    }

    deleteCustomer(id, event) {
        if(confirm('are you sure you want to delete this user?')){
            this.crudService.deleteCustomer(id);
            this.fm.show("Customer Deleted!",{cssClass:'alert-warning text-black text-center mt-5', timeout: 3000});
            this.router.navigate(['/users']);
        }
    }
}
