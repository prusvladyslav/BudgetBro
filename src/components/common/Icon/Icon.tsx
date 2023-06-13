import React from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { StyleProp, TextStyle } from "react-native";
import { CategoriesEnum } from "@constants/index";
import { MaterialCommunityIcons } from '@expo/vector-icons';
export const Icon = ({ name, size = 24, color = 'white', styleProp = {} }: { name: CategoriesEnum, size?: number, color?: string, styleProp?: StyleProp<TextStyle> }) => {
    const commonProps = {
        size,
        color,
        ...styleProp as object
    }
    switch (name) {
        case 'rent':
            return <MaterialIcons name="house" {...commonProps} />
        case 'delivery':
            return <MaterialIcons name="delivery-dining" {...commonProps} />
        case 'clothes':
            return <FontAwesome5  name="tshirt" {...commonProps} />
        case 'utilities':
            return <Ionicons name="md-water" {...commonProps} />
        case 'transport':
            return <FontAwesome5 name="car" {...commonProps} />
        case 'medicine':
            return <AntDesign name="medicinebox" {...commonProps} />
        case 'others':
            return <Entypo name="dots-three-horizontal" {...commonProps} />
        case 'groceries':
            return <MaterialCommunityIcons name="food-apple"{...commonProps} />
        case 'eating out':
            return <Ionicons name="restaurant-outline" {...commonProps}/>
        default:
            return <AntDesign name="question" {...commonProps} />
    }

}