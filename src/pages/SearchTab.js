import React, { Component } from 'react'

import { View, Text, FlatList, TouchableOpacity, TextInput, Alert, ToastAndroid } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { styles } from '../styles/mainStyle'
import api from '../services/api'
import * as Progress from 'react-native-progress';

import realm, { insertFavoriteMaterial } from '../repository/allSchema'


export default class SearchTab extends Component {
    state = {
        resultData: [],
        userInput: '',
        progressBarVisibility: false
    }

    componentDidMount() {
        //this.loadProducts()
    }

    loadProducts = async () => {

        const response = await api.get(this.state.userInput)
        console.log(resultData)
        const resultData = response.data.Results
        console.log(resultData)

        this.setState({ resultData })
    }

    renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.materialName}>{item.Title.replace(/<[^>]*>/g, '')}</Text>
            <Text style={styles.materialUniversityName}>{item.Subject.Name}</Text>
            <Text style={styles.materialUniversityName}>{item.UniversityShortName}</Text>
            <TouchableOpacity style={styles.materialButton}
                onPress={() =>
                    this.favoritarMaterial(item)
                }>
                <Text style={styles.materialButtonText}>Favoritar</Text>
            </TouchableOpacity>
        </View>
    )

    favoritarMaterial = item => {
        const novoMaterial = {
            id: item.Id,
            title: item.Title.replace(/<[^>]*>/g, ''),
            subjectName: item.Subject.Name,
            universityShortName: item.UniversityShortName
        }
        insertFavoriteMaterial(novoMaterial).then().catch((error) => {
            Alert.alert(
                'Ops...',
                'Você já favoritou esse material.',
                [
                    {
                        text: 'Ok', onPress: () => { },
                        style: 'cancel'
                    },
                    { cancelable: true }
                ]
            )
        })
    }

    alterarTexto = userInput => {
        this.setState({ userInput })
    }

    render() {
        return (
           <View style={styles.container}>
                    <TextInput value={this.state.userInput}
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Digite aqui..."
                    placeholderTextColor="#D3D3D3"
                    onChangeText={this.alterarTexto} />
                <TouchableOpacity onPress={this.loadProducts}>
                    <LinearGradient
                        start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                        locations={[0, 0.5, 0.6]}
                        colors={['#4c669f', '#3b5998', '#192f6a']}
                        style={styles.materialButton}>
                        <Text style={styles.materialSearchButtonText}>Pesquisar</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.resultData}
                    keyExtractor={item => item.Id.toString()}
                    renderItem={this.renderItem} />
            </View>
        )
    }
}