import create from 'zustand'
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

// persist take as sec param a object with the name of the key that will be used, and the AsyncStorage
const useCities = create(persist(
    set => ({
        cities: [],
        addCity: (city) => set(state => {
            return {
                ...state, // il faut reset le state pour MAJ le component
                cities: [
                    ...state.cities,
                    city
                ]
            }
        }),
        removeCity: (city) => set(state => {
            return {
                ...state,
                cities: [
                    ...state.cities.filter(c => c !== city)
                ]
            }
        })
    })
    ,{
        name: 'cities',
        getStorage: () => AsyncStorage
    }
))

export default useCities