import { Component, input, output } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { TileModel } from '../../store/tiles';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [ImageModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileComponent {


  item = input.required<TileModel>()

  selected = output<TileModel>()

}
