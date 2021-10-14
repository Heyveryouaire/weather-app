import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, Image, FlatList, Dimensions, Pressable } from "react-native"

import useWeather from '../hooks/useWeather'

import cloudImage from '../assets/cloudImage.jpg'
import rainImage from '../assets/rainImage.jpg'
import sunImage from '../assets/sunImage.jpg'

const formatDate = (d) => {
  let currentDate = new Date(d)

  // date object seem not to work on mobile ? 
  const [date, hours] = d.split(' ')
  const [year, month, day] = date.split('-')
  const [h] = hours.split(':')

  const months =
    ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

  const days =
    ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']


  let current = days[currentDate.getDay() - 1]

  let dDay = Number(day) < 10 ? `0${Number(day)}` : Number(day)

  return {
    day: dDay,
    month: months[Number(month)],
    year: year,
    hour: h,
    dayLetter: current,
  }
}


export default function Home({ navigation, city }) {
  const [index, setIndex] = useState(0);
  const { getForecast } = useWeather()

  const [list, setList] = useState()
  const [isNetworkOk, setIsNetworkOk] = useState(true)
  const [refresh, setRefresh] = useState(false)

  const viewConfigRef = {
    itemVisiblePercentThreshold: 80,
    waitForInteraction: false,
    minimumViewTime: 1000,
    initialNumToRender: 20
  }

  useEffect(() => {
    async function loadData() {
      const [c] = city.split(',')

      try {
        const meteo = await getForecast(c)

        const list = meteo.list.map(m => {
          const temp = {
            date: m.dt_txt,
            max: m.main.temp_max,
            min: m.main.temp_min,
            weather: m.weather[0].description,
            icon: m.weather[0].icon
          }


          const [date, hours] = m.dt_txt.split(' ')
          const [h] = hours.split(':').map(e => Number(e))

          if (h === 9 || h === 12 || h === 15 || h === 18) {
            return temp
          }
        })

        let filtered = list.filter(l => l !== undefined)

        let num = 1
        filtered.forEach(item => {
          item.id = num
          num += 1
        })

        setList(filtered)

        if (meteo.cod !== 200 && meteo.cod !== '200') {
          throw new Error("Un problème est survenu")
        }
        setIsNetworkOk(true)
      } catch (err) {
        setIsNetworkOk(false)
      }
    }
    loadData()
  }, [city, refresh])


  return (
    <View
      style={{ backgroundColor: "#1F1944" }}
    >
      <View style={styles.main, {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        display: 'flex',
      }}>
        
        {/* If no internet */}
        {!isNetworkOk && (
          <Pressable
            onPress={(e) => setRefresh(!refresh)}
          >
            <View
              style={{
                display: 'flex',
                backgroundColor: '#FD435A',
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  color: "white",
                  padding: 4,
                  fontWeight: "bold",
                  // fontFamily: "Montserrat,  sans-serif",
                }}
              >
                Impossible de récupérer les données, cliquez pour réessayer
              </Text>
            </View>
          </Pressable>
        )}

        <View
          style={{ flex: 1 }}
        >
          {list && list.length > 0 && (

            <FlatList
              // viewabilityConfig={viewConfigRef}
              contentContainerStyle={styles.listContainer}
              removeClippedSubviews={true}
              initialNumToRender={0}
              maxToRenderPerBatch={1}
              scrollEventThrottle={16}
              pagingEnabled
              horizontal={true}
              data={list}
              style={{ display: "flex" }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {

                const {
                  day, month, year, hour, dayLetter
                } = formatDate(item.date)

                let bg

                switch (item.weather) {
                  case 'couvert':
                    bg = cloudImage
                    break
                  case 'nuageux':
                    bg = cloudImage
                    break
                  case 'ciel dégagé':
                    bg = sunImage
                    break
                  case 'partiellement nuageux':
                    bg = cloudImage
                    break
                  default:
                    bg = sunImage
                    break
                }

                return (
                  <View
                    style={{ margin: 10, width: "100%", flex: 1 }}
                  >
                    {/* Image container */}
                    <View
                      style={{
                        borderRadius: 20,
                        overflow: 'hidden'
                      }}>
                      <Image
                        source={bg}
                        style={{
                          height: 200,
                          width: Dimensions.get('window').width - 20,
                          resizeMode: "cover",
                          borderRadius: 10,
                        }}
                      >
                      </Image>
                    </View>
                    {/* Image container end */}


                    {/* Text content */}
                    <View
                      style={{
                        display: 'flex',
                        justifyContent: "center",
                        width: "100%",
                        marginTop: 50,
                        backgroundColor: "rgba( 240, 240, 240, 0.5 )",
                        borderRadius: 10,
                        padding:10
                      }}>
                      <View>
                        <Text
                          style={{
                            fontSize: 18,
                            color: 'white',
                            textAlign: 'center'
                          }}
                        >
                          {dayLetter} {day} {month} {year}
                        </Text>
                        <Text
                          style={{
                            fontSize: 18,
                            color: 'white',
                            textAlign: 'center'
                          }}
                        >
                          {hour}:00
                        </Text>
                        <Text
                          style={{
                            fontSize: 92,
                            color: 'white',
                            textAlign: 'center'

                          }}
                        >
                          {item.min.toFixed(0) + '°' || 'Chargement en cours...'}
                        </Text>
                      </View>
                    </View>
                    {/* Text content end */}

                  </View>
                )
              }}
            />
          )}


        </View>


      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: '#CCC',
    // fontFamily: "Montserrat,  sans-serif",

  },
  meteo: {
    flex: 1,
    backgroundColor: "rgba( 240, 240, 240, 0.5 )",
    shadowColor: "rgba( 31, 38, 135, 0.37 )",
    // shadowOffset: {
    //   height: '8px',
    //   width: "18px"
    // },
    borderRadius: 10,
    borderColor: "rgba( 255, 255, 255, 0.18 )",
    borderWidth: 1,
    // blurRadius: 6,
    // backDropFilter: 6

    // justifyContent: 'center',
    // alignItems: 'center'
  },
  col: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  images: {
    flex: 1,
    resizeMode: 'cover'
  },
  text: {
    fontSize: 24,
    textAlign: 'center',

    // color: 'grey'
    color: 'white'
  },
  meteoIcon: {
    width: 100,
    height: 100
  },
})