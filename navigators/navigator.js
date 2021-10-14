import React, { useState, useEffect, useRef } from 'react'
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'
import FavorisList from '../screens/FavorisList'
import Search from '../screens/Search'
import ListFavoris from '../assets/svg/listFavoris'
import CheckStar from '../assets/svg/checkStar'
import UnCheckStar from '../assets/svg/uncheckStar'
import SearchSVG from "../assets/svg/search"

import useCities from '../state/cities'
import useWeather from '../hooks/useWeather'

import { View, Pressable, TextInput } from "react-native"

export default function Navigator() {
    const Stack = createStackNavigator()

    const [city, setCity] = useState('Pau')
    const [cities, setCities] = useState([])
    const [searchCity, setSearchCity] = useState()

    const [searchCities, setSearchCities] = useState([])

    const timeout = useRef()

    const addCity = useCities(state => state.addCity)
    const citiesList = useCities(state => state.cities)
    const removeCity = useCities(state => state.removeCity)

    const { getCities } = useWeather()

    const toggleFavoris = () => {
        if (cities.includes(city)) {
            setCities(cities.filter(c => c !== city))
            removeCity(city)
        } else {
            setCities([...cities, city])
            addCity(city)
        }
    }

    useEffect(() => {
        setCities(citiesList)
    }, [citiesList])

    useEffect(() => {
        clearTimeout(timeout.current)
        if (searchCity && searchCity.length > 2) {
            let delayRequest = setTimeout(async () => {
                try{

                    const c = await getCities(searchCity)
                    if (c.length > 0) {
                        setSearchCities(c.map(city => {
                            return {    
                                name: city.name
                            }
                        }))
                    } else {
                        setSearchCities([{}])
                    }
                }catch(err){
                    setSearchCities([{error: 'cancel'}])
                }
            }, 800)
            timeout.current = delayRequest
        } else if (searchCity && searchCity.length < 2) {
            setSearchCities([])
        }
    }, [searchCity])


    return (
        <NavigationContainer theme={DarkTheme} >
            <Stack.Navigator>
                <Stack.Screen name="Home"
                    options={(props) => ({
                        // cardOverlay: () => <View style={{ backgroundColor: "#1F1944", flex: 1 }} />,
                        headerShown: true,
                        title: city,
                        headerStyle: {
                            backgroundColor: "#1F1944",
                        },
                        headerTitleStyle: {
                            color: "white",
                        },
                        headerTitleAlign: "center",
                        headerRight: () => {
                            return (
                                <View
                                    style={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}
                                >
                                    <View
                                        style={{
                                            paddingRight: 10
                                        }}>
                                        <Pressable
                                            onPress={() => toggleFavoris()} // Should be a toggle click to favoris / unfavorisu
                                        >
                                            {cities.includes(city) ? (
                                                <CheckStar fill={'white'} height={46}></CheckStar>

                                            ) : (
                                                <UnCheckStar fill={'white'} height={46}></UnCheckStar>

                                            )}
                                            {/* <CheckStar fill={'white'} height={46}></CheckStar> */}
                                        </Pressable>
                                    </View>
                                    <View
                                        style={{
                                            paddingLeft: 10,
                                            paddingRight: 10
                                        }}
                                    >
                                        <Pressable
                                            onPress={() => props.navigation.navigate('Favoris')}
                                        >
                                            <ListFavoris height={46} fill={'white'} />
                                        </Pressable>
                                    </View>
                                </View>
                            )
                        },
                        headerLeft: () => {
                            return (
                                <View
                                    style={{ paddingLeft: 10 }}
                                >
                                    <Pressable
                                        onPress={() => props.navigation.navigate('Search')}
                                    >
                                        <SearchSVG height={26} fill={'white'} />

                                    </Pressable>

                                </View>

                            )
                        }
                    })}
                >
                    {props => (
                        <Home {...props} city={city}></Home>

                    )}
                </Stack.Screen>

                <Stack.Screen name="Search" options={{
                    // cardOverlay: () => <View style={{ backgroundColor: "#1F1944", flex: 1 }} />,
                    headerStyle: {
                        backgroundColor: "#1F1944",
                    },
                    headerTitleStyle: {
                        color: "white",
                    },
                    headerTitle: () => {
                        return (
                            <TextInput
                                style={{
                                    fontSize: 20,
                                    color: 'white',
                                    paddingLeft: 20,
                                    paddingRight: 80,
                                    height: '100%',
                                    color: 'white'
                                }}
                                placeholderTextColor="white"
                                placeholder="Chercher une ville"
                                onChangeText={text => setSearchCity(text || ' ')}
                                autoFocus={true}
                            />
                        )
                    },
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#1F1944"
                    },
                    headerTitleStyle: {
                        color: "white"
                    }

                }}>
                    {props => (
                        <Search
                            {...props}
                            setCity={setCity}
                            searchCity={searchCity}
                            searchCities={searchCities}
                        ></Search>
                    )}
                </Stack.Screen>

                <Stack.Screen name="Favoris" options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: "#1F1944",
                    },
                    headerTitleStyle: {
                        color: "white",
                    },
                    title: "Liste des favoris",

                    // cardOverlay: () => <View style={{ backgroundColor: "#1F1944", flex: 1 }} />,
                }}>
                    {props => <FavorisList {...props} cities={cities} setCity={setCity} />}
                </Stack.Screen>

            </Stack.Navigator >
        </NavigationContainer >

    )
}