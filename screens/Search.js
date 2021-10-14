import React, { useState, useEffect } from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native"

export default function Search({
    navigation,
    setCity,
    searchCity,
    searchCities,
}) {

    const [localCity] = useState(searchCity)
    const [error, setError] = useState({ code: 'first' })


    const press = (city) => {
        const [c] = city.split(',')
        setCity(c)
        navigation.goBack()
    }

    useEffect(() => {
        if (error.code === 'first') {
            setError({ code: '' })

        }
        else if (searchCity && searchCity.length < 3) {
            setError({ code: 'missing', message: "Il faut au moins 3 caractères" })
        } else if (
            searchCity && searchCity.length > 2 &&
            searchCities.length === 0 &&
            localCity !== searchCity
        ) {
            setError({ code: 'loading', message: "" })
        } else if (
            searchCities.length === 1 &&
            searchCities[0].hasOwnProperty('error')
        ) {
            setError({ code: "connection", message: "Impossible d'établir la connexion avec le serveur" })
        } else if (
            searchCity &&
            searchCity.length > 2 &&
            searchCities.length === 1 &&
            !searchCities[0].hasOwnProperty('name')
        ) {
            setError({ code: 'notfound', message: "Impossible de trouver cette ville" })
        } else {
            setError({ code: '' })
        }

    }, [searchCity, searchCities])

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#1F1944',
            padding: 10
        }}>

            {
                error.code === 'missing' &&
                (
                    <View
                        style={{
                            backgroundColor: "#FFFAF0",
                            padding: 4,
                        }}
                    >

                        <Text style={{
                            color: '#F7B24E',
                            textAlign: 'center',
                            fontSize: 18,
                        }}>
                            {error.message}
                        </Text>
                    </View>
                )}
            {
                error.code === 'loading' &&
                (
                    <ActivityIndicator
                        size="large"
                        color="#4630EB"
                    />
                )
            }

            {
                error.code === 'notfound' && (
                    <View
                        style={{
                            backgroundColor: "#F56565",
                            padding: 4
                        }}>
                        <Text
                            style={{
                                color: "#FFF5F5",
                                fontSize: 18,
                                textAlign: 'center'
                            }}
                        >
                            {error.message}
                        </Text>
                    </View>
                )
            }
    
            {
                error.code === 'connection' && (
                    <View
                        style={{
                            backgroundColor: "#F56565",
                            padding: 4
                        }}>
                        <Text
                            style={{
                                color: "#FFF5F5",
                                fontSize: 18,
                                textAlign: 'center'
                            }}
                        >
                            {error.message}
                        </Text>
                    </View>
                )
            }

            {searchCities && searchCities.length > 0 && (
                <FlatList
                    contentContainerStyle={styles.listContainer}
                    data={searchCities.map(c => {
                        return { key: c.name || 'null', name: c.name }
                    })}
                    renderItem={({ item }) =>
                        <View
                            style={{
                                padding: 10
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => press(item.key)}>
                                <Text
                                    style={styles.text}
                                >{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 18,
        padding: 10
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#1F1944'
    }
})