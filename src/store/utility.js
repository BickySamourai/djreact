//replace the oldObject with the new set of keys and values from updatedProperties
export const updateObject = (oldObject, updatedProperties) =>{
    return {
        ...oldObject, // create a clone with the oldObject
        ...updatedProperties
    }
}