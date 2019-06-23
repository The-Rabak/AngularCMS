import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private ass: AuthService,
        private fm: FlashMessagesService,
        private router: Router
    ) {}

    email: string = '';
    password: string = '';

    ngOnInit() {
        this.ass.getAuth().subscribe(
            (auth) =>{
                if(auth) this.router.navigate(["/"]);
            });
    }

    onSubmit({value,valid}:{value:any, valid:boolean}) {
        if(valid){
            this.ass.login(value.ue, value.up)
                .then(res => {
                    this.fm.show("A'RIGHT!!!",{cssClass:'alert-success text-black text-center', timeout: 3000});
                    this.router.navigate(['/']);
                })
                .catch(err => {
                    this.fm.show(err.message,{cssClass:'alert-warning text-black text-center', timeout: 3000});
                });
        }
    }
}
