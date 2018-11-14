import React, {Component} from 'react'

import { View, Text, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native'
import {styles} from '../styles/mainStyle'
import { queryAllMaterials, removeFavoriteMaterial } from '../repository/allSchema'
import Swipeout from 'react-native-swipeout'
import realm from '../repository/allSchema';

let FlatListItem = props =>  {
    const {itemIndex, id, title, subjectName, universityName, popupDialogComponent, onPressItem } = props
    showEditModal = () => {

    }
    showDeleteConfirmation = () => {
        
    }

    return (
        <Swipeout right={[
            {
                text: 'Remover',
                backgroundColor: 'rgb[81, 134, 237]',
                onPress: showDeleteConfirmation
            }
        ]} autoClose= {true}>
        
        </Swipeout>
    )
}

export default class FavoriteTab extends Component {
    constructor(props){
        super(props)
        this.state = {
            materialList: []
        }
        this.reloadData();
        realm.addListener('change', () => {
            this.reloadData();
        });
    }

    deleteMaterial = item => {
        Alert.alert (
            'Atenção!', 
            'Deseja remover o material da lista de favoritos?',
            [
                {
                    text: 'Não', onPress: () => {},
                    style: 'cancel'
                },
                {
                    text: 'Sim', onPress: () => {
                        removeFavoriteMaterial(item.id).then().catch((error) => {
                            alert(`Insert new Material error ${error}`)
                        })
                    }
                },
                { cancelable: true }
            ]
        )
    }

    reloadData = () => {
        queryAllMaterials().then((materialList) => {
            this.setState({ materialList });
        }).catch((error) => {
            this.setState({ materialList: [] });
        });
    }

    renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.materialName}>{item.title.replace(/<[^>]*>/g, '')}</Text>
            <Text style={styles.materialUniversityName}>{item.subjectName}</Text>
            <Text style={styles.materialUniversityName}>{item.universityShortName}</Text>
            <TouchableOpacity 
            onPress={ () => {this.deleteMaterial(item)} } 
            style={styles.materialFavoriteButton}>
                <Text style={styles.materialFavoriteButtonText}>Remover</Text>
            </TouchableOpacity>
        </View> 
    )

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.materialList}
                    keyExtractor={item => item.id.toString()}
                    renderItem={this.renderItem} />
            </View>
        )
    }
}