import { Injectable } from '@angular/core';
import { NewCustomer } from '../models/new-customer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  customersCollection: AngularFirestoreCollection<NewCustomer>;
  customerDoc: AngularFirestoreDocument<NewCustomer>;
  customers: Observable<NewCustomer[]>;
  customer: Observable<NewCustomer>;

  constructor(private afs: AngularFirestore) {
    this.customersCollection = this.afs.collection('customers', ref => ref.orderBy('lastName', 'asc'));
  }

  getCustomers(): Observable<NewCustomer[]> {
    this.customers = this.customersCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            console.log(a);
            const data = a.payload.doc.data() as NewCustomer;
            data.id = a.payload.doc.id;
            return data;
          });
        })
    );
    return this.customers;
  }

  addCustomer(customer: NewCustomer) {
    this.customersCollection.add(customer);
  }

  getCustomer(id: string): Observable<NewCustomer> {
    this.customerDoc = this.afs.doc<NewCustomer>(`customers/${id}`);
    this.customer = this.customerDoc.snapshotChanges().pipe(
        map(action => {
          if (action.payload.exists === false) {
            return null;
          } else {
            const data = action.payload.data() as NewCustomer;
            data.id = action.payload.id;
            return data;
          }
        })
    );
    return this.customer;
  }

  updateCustomer(customer: NewCustomer) {
    this.customerDoc = this.afs.doc(`customers/${customer.id}`);
    this.customerDoc.update(customer);
  }

  deleteCustomer(customerId) {
    this.customerDoc = this.afs.doc(`customers/${customerId}`);
    this.customerDoc.delete();
  }

}
