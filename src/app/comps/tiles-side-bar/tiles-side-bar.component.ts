import { Component, contentChild, effect, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FileUpload, FileUploadEvent, FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { TileComponent } from '../tile/tile.component';
import { TileModel, TileStore } from '../../store/tiles';

import { blobToBase64String  } from 'blob-util'



import base64 from 'base64-encode-file'
function blobToBase64(blob: File) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

@Component({
  selector: 'app-tiles-side-bar',
  standalone: true,
  imports: [ButtonModule, FileUploadModule, TileComponent],
  templateUrl: './tiles-side-bar.component.html',
  styleUrl: './tiles-side-bar.component.scss'
})
export class TilesSideBarComponent {


  log(event: TileModel) {
    throw new Error('Method not implemented.');
  }

  // fileBtn = contentChild<FileUpload>(FileUpload)

  // e = effect( () => {
  //   console.log(this.fileBtn())
  // })

  readonly store = inject(TileStore);


  async onUpload(event: FileUploadHandlerEvent , ele: FileUpload) {
    const file = event.files[0] 
    const url = URL.createObjectURL(file)

    console.log(file)



    const re =await blobToBase64(file);
    const base64 = await blobToBase64String(file)
    console.log(base64)


    this.store.addTile({
      url, 
      file,
      size: file.size
    })
    ele.clear()
    return
  }



}
