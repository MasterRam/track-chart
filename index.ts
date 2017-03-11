import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackChartComponent } from './src/trackChart.component';
import { TrackChartConfig } from './src/trackChart.config';
import { TrackChart } from './src/trackChart';


export * from './src/trackChart.component';
export * from './src/TrackChart.Config';
export * from './src/trackChart';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TrackChartComponent,
  ],
  exports: [
    TrackChartComponent,
  ]
})

export class TrackChartModule {
  static forRoot(config: TrackChartConfig = DefaultConfig): ModuleWithProviders {
    TrackChartComponent.setConfig(config);
    return {
      ngModule: TrackChartModule

    };
  }
}

const DefaultConfig = {
  FillColor: "lightblue",
  TextColor: "#ffffff",
  TitleColor: "#356066",
  UnFillColor: "gray",
  UnFillNodeColor: "red",//"#ffffff",
  Font: "Arial"
} as TrackChartConfig;
