import base64 from 'base64-encode-file'
import { blobToBase64String , base64StringToBlob } from 'blob-util'

export const to64 = (file: File | Blob) => {
    return blobToBase64String(file) as Promise<string>
}

export const from64 =  async (base64: string) => {
    return await base64StringToBlob(base64)
}

export const saveFilesToStorage = async (files: (File | Blob)[]) => {
    const files64 = await Promise.all(
        files.map(to64)
    )

    const filesString = JSON.stringify(files64)

    localStorage.setItem('tiles' , filesString)

}


export const retrieveFilesFromStorage = async () => {
    const storageS = localStorage.getItem('tiles')
    if (storageS == null) {
        return null
    }

    const items = JSON.parse(storageS) as string[]
    const files = await Promise.all(items.map(from64))
    return files
}