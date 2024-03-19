import { computed, effect } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState, withHooks } from '@ngrx/signals';
import { addEntity, withEntities } from '@ngrx/signals/entities';
import { retrieveFilesFromStorage, saveFilesToStorage } from './base64';
import { v4 as uuidv4 } from 'uuid';
import { ModelToAdd, SetOptional } from './types-helpers.model';

import { maxBy } from 'lodash' 
import { produce } from 'immer';

export type RuleModel = {
    representation: RuleRepresent,
    l: string[],
    r: string[],
    top: string[],
    bot: string[],
    id: string //uuid
}


export type RuleRepresent = {
    label: string,
    color: string,
    tileForLabel?: string,
    index: number | '_savong-on-store'
}

export type NewRuleModel =  SetOptional< ModelToAdd<RuleModel> , 'representation' >

export type RuleModelState = {
    rules: RuleModel[],
    selectedUuid: string | null 
}

const initialState: RuleModelState = {
    rules:  [],
  selectedUuid: null
};

const createRepre = (toAdd?: Partial<RuleRepresent> ) => {
    return {
        index: '_savong-on-store' as const,
        color: '#000',
        label: 'none',
        ...toAdd
    }
}

const createEmptyRule = (toAdd: Partial<NewRuleModel>) => {
    const id = uuidv4()
    const rule: RuleModel = {
        bot: [],
        top: [],
        l: [],
        r: [],
        id,
        representation: createRepre(),
        ...toAdd
    }
    return rule
}


export const TileStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    selected: computed( () => {
        if (store.selectedUuid() == null) {
            return null
        }
        return store.rules().find( ({id}) => store.selectedUuid() == id )
    })
  })),
  withMethods( (store ) => ({
    addRule(toAdd: NewRuleModel) {
        patchState(store , state => {
            const rule = createEmptyRule(toAdd)
            const nextState = produce( state , (mut) => {
                mut.rules.push(rule)
            })
            patchState(store , {rules: nextState.rules})
            return state
        })
    },
    selectRule(selected: string | RuleModel) {
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
    deleteRule(tile: RuleModel) {
        patchState(store , (state) => ({
            ...state,
            tiles: state.rules.filter( ({id}) => id !== tile.id )
        }))
    }
  })),
  withHooks(({
    async onInit(store) {

        // console.log('inti')
        // const result = await retrieveFilesFromStorage()
        // if (result == null) {
        //     return
        // }

        // patchState(store , {
        //     tiles : result.map( f => {
        //         const url = URL.createObjectURL(f)
        //         return {
        //             file: f,
        //             size: f.size,
        //             url,
        //             id: uuidv4()
        //         }
        //     })
        // })

    },
  }))
);


