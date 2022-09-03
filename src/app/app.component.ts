import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'wheather-angular';
  mapData = new Map<string, string>([
    ["x1-button", ""],
    ["x1Size", "sm"]
  ]);

  mapDataI = new Map<string, string>([
    ["x1-icon", ""],
    ["x1Type", "close"]
  ]);

  htmlComponent: HtmlComponent | undefined;

  result = '';

  constructor() {
    // localStorage.setItem('itemCheck', JSON.stringify(new TestComponent(1, 'Manh xinh')));
    // localStorage.removeItem('itemCheck')
    // console.log(localStorage.getItem('itemCheck'));
    this.htmlComponent = new HtmlComponent();
    let childCo: HtmlComponent[] = [
      new HtmlComponent("submit", false),
      new HtmlComponent("i", true, this.mapDataI),
    ];

    this.htmlComponent.tag = 'button';
    this.htmlComponent.isTag = true;
    this.htmlComponent.mapParam = this.mapData;
    this.htmlComponent.childComponentArr = childCo;
    this.genHtmlStr(this.htmlComponent);
    console.log(this.result);
  }

  ngOnInit(): void {
    // this.mapData.forEach((value: string, key: string) => {
    //   console.log(key, value);
    // });

    // htmlComponent.tag = 'button';

  }

  genHtmlStr(htmlComponent: HtmlComponent) {
    if (htmlComponent.childComponentArr && htmlComponent.childComponentArr.length > 0) {
      if (htmlComponent.isTag) {
        this.result += '<' + htmlComponent.tag;
        if (htmlComponent.mapParam && htmlComponent.mapParam.size > 0) {
          htmlComponent.mapParam.forEach((value: string, key: string) => {
            if (value) {
              this.result += ' ' + key + '="' + value + '"';
            } else {
              this.result += ' ' + key;
            }
          });
        }
        this.result += '>';
        for (let i = 0; i < htmlComponent.childComponentArr.length; i++) {
          this.genHtmlStr(htmlComponent.childComponentArr[i]);
        }
        this.result += '</' + htmlComponent.tag + '>';
      } else {
        this.result += htmlComponent.tag;
        for (let i = 0; i < htmlComponent.childComponentArr.length; i++) {
          this.genHtmlStr(htmlComponent.childComponentArr[i]);
        }
      }
    } else {
      if (htmlComponent.isTag) {
        this.result += '<' + htmlComponent.tag;
        if (htmlComponent.mapParam && htmlComponent.mapParam.size > 0) {
          htmlComponent.mapParam.forEach((value: string, key: string) => {
            if (value) {
              this.result += ' ' + key + '="' + value + '"';
            } else {
              this.result += ' ' + key;
            }
          });
        }
        this.result += '>' + '</' + htmlComponent.tag + '>';
      } else {
        this.result += htmlComponent.tag;
      }
    }
  }
}

class HtmlComponent {
  // tag name
  tag?: string;
  // tag or just title
  isTag?: boolean;
  // param of tag
  mapParam?: Map<string, string>;
  // chilld tag
  childComponentArr?: HtmlComponent[];

  constructor(tag?: string, isTag?: boolean, mapParam?: Map<string, string>) {
    this.tag = tag;
    this.isTag = isTag;
    this.mapParam = mapParam;
  }
}
