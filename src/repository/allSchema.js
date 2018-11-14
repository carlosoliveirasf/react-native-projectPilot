import Realm from 'realm'

export const MATERIAL_SCHEMA = 'material'
export const MaterialSchema = {
    name: MATERIAL_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        title: { type: 'string', indexed: true},
        subjectName: {type: 'string'},
        universityShortName: {type: 'string'} 
    }
}

const databaseOptions = {
    path: 'rocketseat.realm',
    schema: [MATERIAL_SCHEMA],
    schemaVersion: 0
}

export const insertFavoriteMaterial = newFavorite => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(MATERIAL_SCHEMA, newFavorite)
            resolve(newFavorite)
        })
    }).catch((error) => reject(error))
})

export const removeFavoriteMaterial = favoriteId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingMaterial = realm.objectForPrimaryKey(MATERIAL_SCHEMA, favoriteId)
            realm.delete(deletingMaterial)
            resolve()
        })
    }).catch((error) => reject(error))
}) 

export const getAllMaterials = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allMaterials = realm.objects(MATERIAL_SCHEMA)
        resolve(allMaterials)
    }).catch((error) => {
        reject(error)
    })
})  

export default new Realm(databaseOptions)