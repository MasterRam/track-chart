# track-chart

A Trackchart is a visual representation of the sequence of stages and decisions needed to perform a process. Each step in the sequence may contains child stages and each step is noted within a circle shape. Steps are linked by connecting lines.

![Alt text](/images/simpleTracking.png?raw=true "Sample Track-chart")
## Installation

To install this library, run:

```bash
$ npm install track-chart --save
```

## Consuming your library

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
    TrackChartModule,
    LibraryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<trackChartComponent [model]="chartModel"></trackChartComponent>
```
chartModel is a public variable of AppComponent of type "TrackChart" with property as below.

```typescript

import { TrackChart, DisplayType, Node, NodeType } from 'track-project';

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
