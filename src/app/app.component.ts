import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'zera';

    constructor(private ass: AuthService) {

    }

    userEmail: string;
    isLogin: boolean;

    ngOnInit() {
        this.ass.getAuth().subscribe(
            auth => {
                if (auth) {
                    this.isLogin = true;
                }
                console.log(auth);
                this.userEmail = auth.email;
            });
    }

}
