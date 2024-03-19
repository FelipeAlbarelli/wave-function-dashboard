import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';


export type TileModel = {
    file: File,
    size: number,
    url: string
}

export type TileStoreState = {
    tiles: TileModel[],
}

const initialState: TileStoreState = {
  tiles:  []
};

export const TileStore = signalStore(
  withState(initialState),
  withMethods( (store ) => ({
    addTile(toAdd: TileModel) {
        patchState(store , state => ({
            ...state,
            tiles: [
                ...state.tiles,
                toAdd
            ]
        }))
    }
  }))
);