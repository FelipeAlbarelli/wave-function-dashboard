import { Component, input, output } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { TileModel } from '../../store/tiles';

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


  item = input.required<TileModel>()

  selected = output<TileModel>()

  delete = output<TileModel>()

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
