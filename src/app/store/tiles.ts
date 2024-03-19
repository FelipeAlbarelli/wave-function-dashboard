import { computed, effect } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState, withHooks } from '@ngrx/signals';
import { addEntity, withEntities } from '@ngrx/signals/entities';
import { retrieveFilesFromStorage, saveFilesToStorage } from './base64';
import { v4 as uuidv4 } from 'uuid';

export type TileModel = {
    file: File | Blob,
    size: number,
    url: string,
    id: string
}

export type NewTileModel = Omit<TileModel, 'id'>

export type TileStoreState = {
    tiles: TileModel[],
    selectedUuid: string | null 
}

const initialState: TileStoreState = {
  tiles:  [],
  selectedUuid: null
};


export const TileStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    selected: computed( () => {
        if (store.selectedUuid() == null) {
            return null
        }
        return store.tiles().find( ({id}) => store.selectedUuid() == id )
    })
  })),
  withMethods( (store ) => ({
    addNewTile(toAdd: NewTileModel) {
        patchState(store , state => ({
            ...state,
            tiles: [
                ...state.tiles,
                {
                    ...toAdd,
                    id: uuidv4()
                }
            ]
        }))
    },
    selectTile(selected: string | TileModel) {
        if (typeof selected == 'string'){
            patchState(store , {
                selectedUuid: selected
            })
        } else {
            patchState(store , {
                selectedUuid: selected.id
            })
        }
    },
    deleteTile(tile: TileModel) {
        patchState(store , (state) => ({
            ...state,
            tiles: state.tiles.filter( ({id}) => id !== tile.id )
        }))
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
                    url,
                    id: uuidv4()
                }
            })
        })

    },
  }))
);


