import { Component, computed, inject, input, output } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { TileModel, TileStore } from '../../store/tiles';

import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [ImageModule, ContextMenuModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileComponent {
  readonly store = inject(TileStore);


  item = input.required<TileModel>()

  selected = output<TileModel>()

  delete = output<TileModel>()

  isSelected = computed( () => {
    const selectedId = this.store.selectedUuid()
    return this.item().id == selectedId
  })

  items: MenuItem[] = [
    // { 
    //   label: 'View', 
    //   icon: 'pi pi-fw pi-search' ,
    //   command: ({item}) => {
    //     console.log(item)
    //   }
    // },
    { 
      label: 'Delete', 
      icon: 'pi pi-fw pi-trash',
      command: ({item}) => {
        this.delete.emit(this.item())
      }
    }
];

}
