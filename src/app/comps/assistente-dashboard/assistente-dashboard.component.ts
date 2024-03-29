import { Component, effect, inject, signal } from '@angular/core';
import { BaseStudentDocItem, getDataJoao } from '../../data/joao';

import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { TilesSideBarComponent } from '../tiles-side-bar/tiles-side-bar.component';
import { TileStore } from '../../store/tiles';
import base64 from 'base64-encode-file'
import { saveFilesToStorage } from '../../store/base64';
import { RulesSideBarComponent } from '../rules-side-bar/rules-side-bar.component';



@Component({
  selector: 'app-assistente-dashboard',
  standalone: true,
  imports: [ DividerModule, SplitterModule, TilesSideBarComponent, RulesSideBarComponent ],
  providers: [TileStore],
  templateUrl: './assistente-dashboard.component.html',
  styleUrl: './assistente-dashboard.component.scss',
})
export class AssistenteDashboardComponent {

  readonly store = inject(TileStore);

  saveAllTilesToStorage = effect( () => {
    saveFilesToStorage(this.store.tiles().map(f => f.file))
    console.log('storage atualizado!')

  })

}
