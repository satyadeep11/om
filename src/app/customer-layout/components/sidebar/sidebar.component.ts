import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProductDetailService } from '../../product-detail.service'; 
import {GenieComponent} from "../../home/genie/genie.component";
import {MatDialog} from "@angular/material";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive: boolean = false;
    collapsed: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';
    fname:String;
    lname:String;
    myData:any;
    searchText='';

    @Output() collapsedEvent = new EventEmitter<boolean>();
    
    constructor(private translate: TranslateService, public router: Router,private productDetailService: ProductDetailService,public dialog : MatDialog) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
        this.fname= localStorage.getItem("fname").toString();
       this.lname= localStorage.getItem("lname").toString();
       this.productDetailService.category_all().subscribe(user => {
        this.myData = user;  
        console.log(this.myData);
      },
      error => console.log(error)
      );
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    LoadGenie(){
        this.dialog.open(GenieComponent, {
          width: '500px',
          data: {}
        });
      }
      Search(searchText){
        if(searchText)
        this.router.navigate(['/products/search/',searchText]);
      }
}
