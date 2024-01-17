import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'B2BFrontEnd';
  styleName: string;

  constructor(@Inject(DOCUMENT) private document: Document,private router: Router) {}
  ngOnInit(): void {
    console.log(this.router);
    
    if(this.router.url.startsWith('/'))
      this.loadStyle("./admin.css")
    else
      this.loadStyle("./ui.css")
      

  }
  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;
      console.log(style);
      head.appendChild(style);
    }
  }
}
