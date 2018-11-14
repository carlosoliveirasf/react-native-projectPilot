import React, {Component} from 'react'

import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
import {styles} from '../styles/mainStyle'
import api from '../services/api'

import realm, {insertFavoriteMaterial} from '../repository/allSchema'


export default class SearchTab extends Component {
    state = {
        resultData: [],
        userInput: ''
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
            <TouchableOpacity onPress={this.favoritarMaterial(item)} style={styles.materialButton}>
                <Text style={styles.materialButtonText}>Favoritar</Text>
            </TouchableOpacity>
        </View> 
    )

    favoritarMaterial = material => {
        const novoMaterial = {
            id: material.Id,
            title: material.Title.replace(/<[^>]*>/g, ''),
            subjectName: material.Subject.Name,
            universityShortName: material.universityShortName
        }

        insertFavoriteMaterial(novoMaterial).then().catch((error) => {
            alert(`Insert new Material error ${error}`)
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
                    onChangeText={this.alterarTexto}/>
                <TouchableOpacity onPress= { this.loadProducts }
                    style={styles.materialButton}>
                    <Text style={styles.materialButtonText}>Pesquisar</Text>
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