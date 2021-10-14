import React from 'react'

import { createDrawerNavigator} from '@react-navigation/drawer'
import Home from '../screens/Home'
import Search from '../screens/Search'

export default function DrawerNavigator({...props}){
    const Drawer = createDrawerNavigator()
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="home">
                { props => <Home {...props} city={'pau'}></Home>}
                </Drawer.Screen>
            <Drawer.Screen name="search" component={Search}/>
        </Drawer.Navigator>
    )
}