import {Component, OnInit} from '@angular/core';
import {NewCustomer} from '../../models/new-customer';
import {CustomersService as CrudService} from '../../services/crud-customer.service';
import {Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-customer-details',
    templateUrl: './customer-details.component.html',
    styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
    customers: NewCustomer;
    id: string;

    constructor(private crudService: CrudService, private router: Router, private activeRoute: ActivatedRoute) {
        document.title = "Customer Details";
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
            console.log(typeof customers);
        }
    );
    }

}
