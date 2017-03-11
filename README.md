# track-chart

A Trackchart is a visual representation of the sequence of stages and decisions needed to perform a process. Each step in the sequence may contains child stages and each step is noted within a circle shape. Steps are linked by connecting lines.

![Alt text](/image/simpleTracking.png?raw=true "Track Chart Sample")
## Installation

To install this library, run:

```bash
$ npm install track-chart --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install track-chart
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { TrackChartModule } from 'track-chart';

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
    }),
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<trackChartComponent [model]="chartModel"></trackChartComponent>
```
chartModel is a public variable of AppComponent of type "TrackChart" with property as below.

```typescript

import { TrackChart, DisplayType, Node, NodeType } from '../../../../index';

export const SimpleModel = {
    StartNode: true,
    EndNode: true,
    CurrentState: "End",
    ChildState: "",
    Nodes: [
        {
            Name: "One",
            Title: "One",
            Type: NodeType.Start,
            Childeren: [
                {
                    Title: "Child",
                    Name: "Child",
                    Type: NodeType.Child,
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
            Type: NodeType.End,
            Childeren: [],
            Display: DisplayType.Text,
            ImageURL: "",
            DisplayText: "2",
        } as Node
    ] as Node[],
    Title: "#30012313 - Loan Process",
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
