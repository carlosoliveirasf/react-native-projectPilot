import React from 'react'

import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    list: {
        padding: 20
    },
    itemContainer: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },
    materialName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    materialUniversityName: {
        fontSize: 16,
        color: '#999',
        marginTop: 5,
        lineHeight: 24,
    },
    materialButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#DA552F',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 20
    },
    materialButtonText: {
        fontSize: 16,
        color: '#DA552F',
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#FFF',
        marginTop: 20, 
        height: 50,
        fontSize: 15,
        marginHorizontal: 20
    }
})


