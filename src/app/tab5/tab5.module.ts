import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab5Page } from './tab5.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Info6Component } from '../info6/info6.component';
import { Info7Component } from '../info7/info7.component';
import { Info8Component } from '../info8/info8.component';
import { Info9Component } from '../info9/info9.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab5Page }])
  ],
  declarations: [Tab5Page, Info6Component, Info7Component, Info8Component, Info9Component],
  entryComponents: [Info6Component, Info7Component, Info8Component, Info9Component]
})
export class Tab5PageModule {}
