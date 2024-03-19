import { Component, contentChild, effect, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FileUpload, FileUploadEvent, FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { TileComponent } from '../tile/tile.component';
import { TileModel, TileStore } from '../../store/tiles';



@Component({
  selector: 'app-tiles-side-bar',
  standalone: true,
  imports: [ButtonModule, FileUploadModule, TileComponent],
  templateUrl: './tiles-side-bar.component.html',
  styleUrl: './tiles-side-bar.component.scss'
})
export class TilesSideBarComponent {

  // fileBtn = contentChild<FileUpload>(FileUpload)

  // e = effect( () => {
  //   console.log(this.fileBtn())
  // })

  readonly store = inject(TileStore);

  files = signal<TileModel[]>([])

  onUpload(event: FileUploadHandlerEvent , ele: FileUpload) {
    const file = event.files[0] 
    const url = URL.createObjectURL(file)
    console.log({img: file, url})
    this.files.update( (prev) => ([...prev , {
      url, 
      file,
      size: file.size
    }]) )
    this.store.addTile({
      url, 
      file,
      size: file.size
    })
    ele.clear()
    return
  }



}
