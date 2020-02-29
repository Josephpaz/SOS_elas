import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Info1Component } from '../info1/info1.component';
import { Info2Component } from '../info2/info2.component';
import { Info3Component } from '../info3/info3.component';
import { Info4Component } from '../info4/info4.component';
import { Info5Component } from '../info5/info5.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page, Info1Component, Info2Component, Info3Component, Info4Component, Info5Component],
  entryComponents: [Info1Component, Info2Component, Info3Component, Info4Component, Info5Component]
})
export class Tab3PageModule {}
