import { computed, effect } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState, withHooks } from '@ngrx/signals';
import { retrieveFilesFromStorage, saveFilesToStorage } from './base64';


export type TileModel = {
    file: File | Blob,
    size: number,
    url: string
}

export type TileStoreState = {
    tiles: TileModel[],
    selectedIndex: number | null 
}

const initialState: TileStoreState = {
  tiles:  [],
  selectedIndex: null
};

export const TileStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    selected: computed( () => {
        if (store.selectedIndex() == null) {
            return null
        }
        return store.tiles()[store.selectedIndex()!]
    })
  })),
  withMethods( (store ) => ({
    addTile(toAdd: TileModel) {
        patchState(store , state => ({
            ...state,
            tiles: [
                ...state.tiles,
                toAdd
            ]
        }))
        saveFilesToStorage(store.tiles().map(f => f.file))
    },
    selectTile(tile: number) {
        patchState(store , {
            selectedIndex: tile
        })
    }
  })),
  withHooks(({
    async onInit(store) {

        console.log('inti')
        const result = await retrieveFilesFromStorage()
        if (result == null) {
            return
        }

        patchState(store , {
            tiles : result.map( f => {
                const url = URL.createObjectURL(f)
                return {
                    file: f,
                    size: f.size,
                    url
                }
            })
        })

    },
  }))
);

