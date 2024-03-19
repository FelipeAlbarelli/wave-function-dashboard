import { Component, input } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { TileModel } from '../tiles-side-bar/tiles-side-bar.component';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [ImageModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileComponent {


  item = input.required<TileModel>()

}