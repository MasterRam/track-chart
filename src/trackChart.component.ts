import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { TrackChart, Node, NodeType, DisplayType, TrackChartConfig } from './trackChart';

const DefaultConfig = new TrackChartConfig();
DefaultConfig.FillColor = 'rgba(40, 59, 65, 0.71)';
DefaultConfig.TextColor = '#ffffff';
DefaultConfig.TitleColor = '#356066';
DefaultConfig.UnFillColor = '#dddddd';
DefaultConfig.UnFillNodeColor = '#ffffff';
DefaultConfig.Font = 'Times';


@Component({
  selector: 'track-chart',
  template: `
  <h1 style='text-align:center'>
  <canvas id='myCanvas' #canvas width='800' height='100' style='border:0px solid #d3d3d3;'>
    Your browser does not support the canvas element.
  </canvas>
</h1>
<div class='tooltip' id='tooltip' [ngStyle]="{ 'top': style.top,'left': style.left,'transform':style.transform,'display':style.display}">
  <p class='tooltip-title'>
    <img *ngIf='style.isImage' src='{{style.icon}}' style='width:20px;height: 20px;' />
    <b *ngIf='!style.isImage'>{{style.icon}}</b>
    <b>{{style.title}}</b>
  </p>
  <p class='tooltip-desc'>
    {{style.message}}
  </p>
</div>`,
  styles: [`
  .tooltip {
    position: absolute;
    width: auto;
    background-color: rgba(0, 0, 0, 0.37);
    padding: 5px;
    border-radius: 5px;
    color: white;
    display:none;
}

.tooltip-title {
    margin-top: 0px;
    border-bottom: solid 1px;
    margin-bottom: 5px;
}

.tooltip-desc {
    margin: 0px;
    font-style: italic;
    font-size: small;
}
  `]
})

export class TrackChartComponent implements OnInit {
  config: TrackChartConfig = DefaultConfig;
  @ViewChild('canvas')
  canvasEle: ElementRef;
  @Input()
  model: TrackChart = new TrackChart();
  Links: string[] = new Array();
  style: any = { top: 0, left: 0, transform: 'translateY(0px) translateX(0px)' };
  hoverLink: string;
  canvas: HTMLCanvasElement;
  titleColor = this.config.TitleColor;
  textColor = this.config.TextColor;
  toolTips: any[] = new Array();
  setConfig(configParam: TrackChartConfig) {
    this.config = configParam;
  }

  constructor() {

  }

  ngOnInit(): void {
    let completedPercentage = 50;
    this.config = this.model.Config;
    let color = this.config.UnFillColor;
    let borderColor = this.config.FillColor;
    this.drawChart('myCanvas', this.model, this.model.Nodes.length, completedPercentage, color, borderColor);

  }
  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {

    for (let index = 0; index < this.toolTips.length; index++) {
      let element = this.toolTips[index];

      if (event.clientX > element.x &&
        event.clientX < element.x + element.width &&
        event.clientY > element.y &&
        event.clientY < element.y + element.height) {

        this.style = {
          'top': event.clientY.toString(),
          'left': event.clientX.toString(),
          transform: 'translateY(' + (event.clientY) + 'px) translateX(' + event.clientX + 'px)',
          display: 'block',
          title: element.title,
          message: element.message
        };
        break;
      } else {
        this.style = {
          'top': '0',
          'left': '0',
          transform: 'translateY(0px) translateX(0px)',
          display: 'none'
        };
      }
    }

  }

  addtoolTip(x: number, y: number, width: number, height: number, title: string, message: string, display: DisplayType, content: string) {
    this.toolTips.push({
      x: x,
      y: y,
      width: width,
      height: height,
      title: title,
      message: message,
      isImage: display === DisplayType.Image,
      icon: content
    });
  }
  drawNode(ctx: CanvasRenderingContext2D, node: Node, x: number, y: number) {
    ctx.arc(x, y, 18, 0, 360, false);
    ctx.fill();
  }
  drawNodeBorder(ctx: CanvasRenderingContext2D, node: Node, x: number, y: number) {
    ctx.arc(x, y, 20, 0, 360, false);
    ctx.fill();
  }
  drawChildNode(ctx: CanvasRenderingContext2D, node: Node, x: number, y: number) {
    ctx.arc(x, y, 10, 0, 360, false);
    ctx.fill();
  }
  drawChildNodeBorder(ctx: CanvasRenderingContext2D, nodes: Node, x: number, y: number) {
    ctx.arc(x, y, 12, 0, 360, false);
    ctx.fill();
  }
  drawChildChart(ctx: CanvasRenderingContext2D,
    nodes: Node[],
    totalNode: number,
    x1: number,
    y: number,
    x2: number,
    isLastNode: boolean): number {
    let node = totalNode + 1;
    let width = x2 - x1;
    let index = node, templength = (width) / node, nodelength = x2 + templength;
    for (index = 0; index <= nodes.length; index++ , nodelength = nodelength + (templength)) {
      let element = nodes[index];
      if (element !== undefined) {
        this.drawChildNode(ctx, element, nodelength, 35);
      }
    }
    ctx.closePath();
    if (isLastNode) {
      return nodelength - templength / 2;
    } else {
      return nodelength - templength * 2;
    }
  }
  drawChildChartText(ctx: CanvasRenderingContext2D, nodes: Node[], totalNode: number, x1: number, y: number, x2: number) {
    let node = totalNode + 1;
    let width = x2 - x1;
    let index = node, templength = (width) / node, nodelength = x2 + templength;
    for (index = 0; index < nodes.length; index++ , nodelength = nodelength + (templength)) {
      let element = nodes[index];
      if (element.Display === DisplayType.Text) {
        this.drawChildNodeText(ctx, element.DisplayText, nodelength, 34);
      } else if (element.Display === DisplayType.Image) {
        this.drawChildImage(ctx, element.ImageURL, nodelength, 35);
      }
      this.drawChildNodeTitle(ctx, element.Title, nodelength, 62);
    }

    ctx.closePath();
  }
  drawChildChartBorder(ctx: CanvasRenderingContext2D, nodes: Node[], totalNode: number, x1: number, y: number, x2: number) {
    let node = totalNode + 1;
    let width = x2 - x1;
    let index = node, templength = (width) / node, nodelength = x2 + templength;
    for (index = 0;
      index <= nodes.length;
      index++ , nodelength = nodelength + (templength)) {
      let element = nodes[index];
      if (element !== undefined) {
        this.drawChildNodeBorder(ctx, element, nodelength, 35);
        let tempDisplayText = (element.Display === DisplayType.Image ? element.ImageURL : element.DisplayText);
        console.log(tempDisplayText);
        this.addtoolTip(nodelength - 12, 35 + (19 * 3), 12 * 2, 12 * 2,
          element.Title,
          element.Description,
          element.Display,
          tempDisplayText);
      }
    }
    ctx.closePath();
  }

  drawChart(id: string, model: TrackChart, totalNode: number, completedPercentage: number, color: string, borderColor: string) {
    let node = totalNode - 1;
    let index = node;
    let completed = completedPercentage / 100;
    this.canvas = this.canvasEle.nativeElement as HTMLCanvasElement;
    let width = this.canvas.parentElement.clientWidth;
    this.canvas.width = width;
    let ctx = this.canvas.getContext('2d');


    ctx.beginPath();

    /**Identitfy graph filling BG  */
    let templength = (width - 100) / node;
    let nodelength = 50;
    let InActiveFound = false;
    for (index = 0; index <= node; index++ , nodelength = nodelength + (templength)) {
      let element = model.Nodes[index];
      if (this.model.CurrentState === element.Name && !InActiveFound) {
        InActiveFound = true;
        // completed=index+1)
        completed = (index + 1) / model.Nodes.length;
        //   alert(index + 1 + ' / ' + model.Nodes.length + ' - ' + completed);
        break;
      }
    }

    ctx.fillStyle = color;
    ctx.rect(40, 30, (width - 100), 10);
    ctx.fill();
    index = node;
    templength = (width - 100) / node;
    nodelength = 50;
    InActiveFound = false;

    for (index = 0; index <= model.Nodes.length - 1; index++ , nodelength = nodelength + (templength)) {
      let element = model.Nodes[index];
      let tempDisplayText = (element.Display === DisplayType.Image ? element.ImageURL : element.DisplayText);
      this.addtoolTip(nodelength - 18, 35 -10, 18 * 2, 18 * 2, element.Title, element.Description, element.Display, tempDisplayText);
      this.drawNodeBorder(ctx, element, nodelength, 35);
      if (element.Childeren.length > 0) {
        this.drawChildChartBorder(ctx, element.Childeren, element.Childeren.length, nodelength - (templength), 35, nodelength);
      }
    }





    ctx.beginPath();
    ctx.fillStyle = borderColor;
    index = node;
    templength = (width - 100) / node;
    nodelength = 50;
    let childNodelength = 0;
    if (this.model.CurrentState != undefined && this.model.CurrentState != null && this.model.CurrentState != '') {
      for (index = 0; index <= node; index++ , nodelength = nodelength + (templength)) {
        let element = model.Nodes[index];
        if (!InActiveFound) {
          this.drawNode(ctx, element, nodelength, 35);

          let tempChilderen: Node[] = new Array();
          if (this.model.CurrentState === element.Name) {
            if (this.model.ChildState === '' || this.model.ChildState === null || this.model.ChildState === undefined) {
              childNodelength = nodelength;
              break;
            }
            if (element.Childeren.filter(t => t.Name === this.model.ChildState).length > 0) {
              for (let childIndex = 0; childIndex < element.Childeren.length; childIndex++) {
                let childElement = element.Childeren[childIndex];
                tempChilderen.push(childElement);
                if (childElement.Name === this.model.ChildState) {
                  break;
                }
              }
              //       alert(element.Name + ' ' + tempChilderen.length);
              childNodelength = this.drawChildChart(ctx, tempChilderen, element.Childeren.length, nodelength - (templength), 35, nodelength, element.Type === NodeType.End);
            }
          } else {
            childNodelength = this.drawChildChart(ctx, element.Childeren, element.Childeren.length, nodelength - (templength), 35, nodelength, element.Type === NodeType.End);
          }

        }


        if (this.model.CurrentState === element.Name) {
          if (element.Type === NodeType.End) {
            childNodelength = width - 50;
          }
          if (!InActiveFound) {
            InActiveFound = true;
            if (childNodelength === 0) {
              childNodelength = 0;
            }
            break;
          }

        }

      }
    
    console.log(childNodelength);
    ctx.beginPath();
    ctx.rect(50, 32, childNodelength - 50, 6);
    ctx.fillStyle = borderColor;
    ctx.fill();
    }
    ctx.beginPath();


    index = node;
    templength = (width - 100) / node;
    nodelength = 50;
    for (index = 0; index <= model.Nodes.length - 1; index++ , nodelength = nodelength + (templength)) {
      let element = model.Nodes[index];
      if (element.Display === DisplayType.Text) {
        this.drawNodeText(ctx, element.DisplayText, nodelength, 35);
      } else if (element.Display === DisplayType.Image) {
        this.drawImage(ctx, element.ImageURL, nodelength, 35);
      }
      this.drawNodeTitle(ctx, element.Title, nodelength, 70);

    }

    /**Draw Inactive Node BG  */
    //  ctx.beginPath();
    ctx.fillStyle = this.config.UnFillNodeColor;
    index = node;
    templength = (width - 100) / node;
    nodelength = 50;
    InActiveFound = false;
    for (index = 0; index <= node; index++ , nodelength = nodelength + (templength)) {
      let element = model.Nodes[index];
      if (element !== undefined) {
        if (this.model.CurrentState === element.Name && !InActiveFound) {
          InActiveFound = true;
          continue;
        }

        if (InActiveFound) {
          ctx.beginPath();
          ctx.fillStyle = this.config.UnFillNodeColor;
          this.drawNode(ctx, element, nodelength, 35);
          this.drawNodeText(ctx, element.DisplayText, nodelength, 35, color);
        }
      }
      //  this.drawChildChart(ctx, element.Childeren, element.Childeren.length, nodelength - (templength), 35, nodelength);

    }


    index = node;
    templength = (width - 100) / node;
    nodelength = 50;
    for (index = 0; index <= model.Nodes.length - 1; index++ , nodelength = nodelength + (templength)) {
      let element = model.Nodes[index];
      this.drawChildChartText(ctx, element.Childeren, element.Childeren.length, nodelength - (templength), 35, nodelength);
    }

    ctx.closePath();
  }

  drawNodeText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string = null): void {
    color = color === null ? this.textColor : color;
    this.drawTextAS(ctx, text, '16px ' + this.config.Font, color, x, y);
  }
  drawChildNodeText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number): void {
    this.drawTextAS(ctx, text, '13px ' + this.config.Font, this.textColor, x, y);
  }

  drawNodeTitle(ctx: CanvasRenderingContext2D, text: string, x: number, y: number): void {
    this.drawTitleAS(ctx, text, '13px ' + this.config.Font, this.titleColor, x, y);
  }
  drawChildNodeTitle(ctx: CanvasRenderingContext2D, text: string, x: number, y: number): void {
    this.drawChildTitleAS(ctx, text, '10px ' + this.config.Font, this.titleColor, x, y);
  }

  drawTextAS(ctx: CanvasRenderingContext2D, text: string, font: string, color: string, x: number, y: number): void {
    ctx.font = font;
    ctx.fillStyle = color;
    let metrics = ctx.measureText(text);
    ctx.fillText(text, (x - metrics.width / 2), y + 5);
  }

  drawTitleAS(ctx: CanvasRenderingContext2D, text: string, font: string, color: string, x: number, y: number): void {
    ctx.font = font;
    ctx.fillStyle = color;
    let metrics = ctx.measureText(text);
    let maxWidth = 70;
    let lineHeight = 13;
    if (metrics.width > maxWidth) {
      this.wrapText(ctx, text, (x - maxWidth / 2), y, maxWidth, lineHeight);
    } else {
      ctx.fillText(text, (x - metrics.width / 2), y + 5);
    }
  }
  drawChildTitleAS(ctx: CanvasRenderingContext2D, text: string, font: string, color: string, x: number, y: number): void {
    ctx.font = font;
    ctx.fillStyle = color;
    let metrics = ctx.measureText(text);
    let maxWidth = 30;
    let lineHeight = 10;
    if (metrics.width > maxWidth) {
      this.wrapText(ctx, text, (x - maxWidth / 2), y, maxWidth, lineHeight);
    } else {
      ctx.fillText(text, (x - metrics.width / 2), y + 5);
    }
  }

  drawImage(ctx: CanvasRenderingContext2D, url: string, x: number, y: number) {
    let img = new Image();
    img.onload = function () {
      ctx.drawImage(img, x - 15, y - 15, 30, 30);
    };
    img.src = url; //  transparent png

  }
  drawChildImage(ctx: CanvasRenderingContext2D, url: string, x: number, y: number) {
    let img = new Image();
    img.onload = function () {
      ctx.drawImage(img, x - 8, y - 8, 16, 16);
    };
    img.src = url; //  transparent png

  }
  wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    let words = text.split(' ');
    let line = '';

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  }
}


