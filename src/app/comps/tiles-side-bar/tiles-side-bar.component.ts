import { Component, contentChild, effect, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FileUpload, FileUploadEvent, FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-tiles-side-bar',
  standalone: true,
  imports: [ButtonModule, FileUploadModule, ImageModule],
  templateUrl: './tiles-side-bar.component.html',
  styleUrl: './tiles-side-bar.component.scss'
})
export class TilesSideBarComponent {

  // fileBtn = contentChild<FileUpload>(FileUpload)

  // e = effect( () => {
  //   console.log(this.fileBtn())
  // })

  files = signal<{
    file: File,
    size: number,
    url: string
  }[]>([])

  onUpload(event: FileUploadHandlerEvent , ele: FileUpload) {
    const file = event.files[0] 
    const url = URL.createObjectURL(file)
    console.log({img: file, url})
    this.files.update( (prev) => ([...prev , {
      url, 
      file,
      size: file.size
    }]) )
    ele.clear()
    return
  }



}
