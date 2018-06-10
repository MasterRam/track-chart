# track-chart

A Trackchart is a visual representation of the sequence of stages and decisions needed to perform a process. Each step in the sequence may contains child stages and each step is noted within a circle shape. Steps are linked by connecting lines.

![Alt text](/images/simpleTracking.png?raw=true "Sample Track-chart")
## Installation

To install this library, run:

```bash
$ npm install track-chart --save
```

## Consuming the library

Once you have installed the library, you can import Track-Chart library in your application 
through your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { TrackChartModule,TrackChartConfig } from 'track-chart';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    TrackChartModule.forRoot({
      FillColor: "rgb(68, 64, 60)",
      TextColor: "#ffffff",
      TitleColor: "#356066",
      UnFillColor: '#dddddd',
      UnFillNodeColor: "#ffffff",
      Font: "Times"
    } as TrackChartConfig),
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once library is imported, you can use its components, directives and pipes in your Angular application:

```typescript
import { Component, OnInit } from '@angular/core';
import { TrackChart, TrackChartConfig } from 'track-chart';
import { SimpleModel } from './trackchart.simple.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  chartModel: TrackChart = SimpleModel;
  title = 'Simple Tracking!';

  ngOnInit() {
    const config: TrackChartConfig = new TrackChartConfig();
    config.FillColor = 'rgba(40, 59, 65, 0.71)';
    config.TextColor = '#ffffff';
    config.TitleColor = '#356066';
    config.UnFillColor = '#dddddd';
    config.UnFillNodeColor = '#ffffff';
    config.Font = 'Times';
    this.chartModel.Config = config;
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
}




```

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<track-chart [model]="chartModel"></track-chart>
```
chartModel is a public variable of AppComponent of type "TrackChart" with property as below.

```typescript

import { TrackChart, DisplayType, Node, NodeType } from 'track-project';

export const SimpleModel = {
    StartNode: true,
    EndNode: true,
    CurrentState: "",
    ChildState: "",
    Nodes: [
        {
            Name: "One",
            Title: "One",
            Type: NodeType.Start,
            Description:"Start Node of the graph",
            Childeren: [
                {
                    Title: "Child",
                    Name: "Child",
                    Type: NodeType.Child,
                    Description:"Child Node of the First Node",
                    Childeren: [],
                    Display: DisplayType.Text,
                    ImageURL: "",
                    DisplayText: "(a)",
                } as Node
            ],
            Display: DisplayType.Text,
            ImageURL: "",
            DisplayText: "1",
        } as Node,
        {
            Name: "End",
            Title: "End",
            Description:"End Node of the graph.",
            Type: NodeType.End,
            Childeren: [],
            Display: DisplayType.Text,
            ImageURL: "",
            DisplayText: "2",
        } as Node
    ] as Node[],
    Title: "Simple - Tracking",
    ShowTitle: true
} as TrackChart;

```


## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Ramkumar Murugarasan](mailto:ramkumar.murugarasan@hotmail.com)
