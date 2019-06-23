import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

    @Input()
    isLogin: boolean;
    article: string = '';
    age: number = 27;
    data: any = null;
    numbers: string[] = ['10', '20', '30'];

    public getBig() {
        return 'yo yo ';
    }

    constructor(private ass: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.article = 'banim yaani';
    }

    logout(event){
        this.isLogin = false;
        this.ass.logout();
        this.router.navigate(['/']);
    }


}
