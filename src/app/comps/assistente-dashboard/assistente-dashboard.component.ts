import { Component, effect, signal } from '@angular/core';
import { BaseStudentDocItem, getDataJoao } from '../../data/joao';

import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { TilesSideBarComponent } from '../tiles-side-bar/tiles-side-bar.component';
import { TileStore } from '../../store/tiles';

@Component({
  selector: 'app-assistente-dashboard',
  standalone: true,
  imports: [ DividerModule, SplitterModule, TilesSideBarComponent ],
  providers: [TileStore],
  templateUrl: './assistente-dashboard.component.html',
  styleUrl: './assistente-dashboard.component.scss',
})
export class AssistenteDashboardComponent {


}
