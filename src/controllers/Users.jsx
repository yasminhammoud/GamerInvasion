import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";
const colletionUsers = "Usuarios"

export const getUserByID = async (id) => {

    const docRef = doc(db, colletionUsers, id);
    const docSnap = await getDoc(docRef);
    const user = docSnap.data();
    return user

}

export const updateUserDiscount = async (userID, value) => {

    const docRef = doc(db, colletionUsers, userID)
    await updateDoc(docRef, {
        Descuento: value
    });
}

export const updateUserAttempt = async (userID, date) => {

    const docRef = doc(db, colletionUsers, userID)
    await updateDoc(docRef, {
        UltimoIntentoDescuento: date
    });
}

export const updateUser = async (userID, updates) => {

    const docRef = doc(db, colletionUsers, userID)
    await updateDoc(docRef, {
        Nombre: updates.name,
        Direccion: updates.address,
        Telefono: updates.phone
    });
}
