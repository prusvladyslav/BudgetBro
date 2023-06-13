import React, { Dispatch, SetStateAction, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Platform } from 'react-native';

export const Dropdown = ({ items, dropdownValue, setDropdownValue, placeholderLabel = 'Select a date' }: {
    items: { value: null | undefined | string, label: string }[],
    dropdownValue: null | undefined | string,
    setDropdownValue: Dispatch<SetStateAction<string | undefined>>,
    placeholderLabel: string
}) => {
    const placeholder = {
        label: placeholderLabel,
        value: undefined,
    };
    const pickerStyle = {
        inputIOS: {
            color: 'white',
            fontSize: 22,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 4,
            paddingRight: 30,
        },
        inputAndroid: {
            color: 'white',
            fontSize: 22,
            paddingHorizontal: 10,
            minWidth: 200,
            paddingVertical: Platform.OS === 'android' ? 0 : 12,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 4,
            paddingRight: 30,
        },
        iconContainer: {
            top: 12,
            right: 10,
        },
    };

    return (
        <RNPickerSelect
            value={dropdownValue}
            onValueChange={(value) => setDropdownValue(value)}
            placeholder={placeholder}
            items={items}
            style={pickerStyle}
            useNativeAndroidPickerStyle={false}
        />
    )
}