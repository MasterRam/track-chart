import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackChartComponent } from './src/trackChart.component';
import { TrackChart } from './src/trackChart';


export * from './src/trackChart.component';
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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TrackChartModule
      
    };
  }
}
