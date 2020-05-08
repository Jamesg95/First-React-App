import { creatStore } from 'redux'
import { Reducer, initialState } from './reducer'

export const ConfigureStore = () => {
    const store = creatStore(
        Reducer,
        initialState
    )
    return store;
}