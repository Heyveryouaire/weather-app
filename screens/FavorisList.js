import React from "react"
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native"

export default function FavorisList({ navigation, cities, setCity }) {


    const press = (city) => {
        const [c] = city.split(',')
        setCity(c)
        navigation.goBack()
    }

    return (
        <>
            <View style={styles.main}>
                <FlatList
                    contentContainerStyle={styles.listContainer}
                    data={cities.map(c => {
                        return { key: c }
                    })}
                    renderItem={({ item }) =>
                        <View >
                            <TouchableOpacity
                                onPress={() => press(item.key)}>
                                <Text
                                    style={styles.text}
                                >{item.key}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    text: {
        color: 'white',
        fontSize: 18,
        padding: 10
    },
    listContainer: {
        flex: 1,
        // justifyContent: 'space-around',
        backgroundColor: '#1F1944'
    },
    top: {
        height: 63,
        backgroundColor: '#1F1944'
    },
    searchInput: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
})