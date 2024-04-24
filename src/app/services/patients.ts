import { Patient } from "../../common/Patient";
import {
    db,
    collection,
    addDoc,
    getDocs,
    query,
    deleteDoc,
    doc,
} from "./firebase";

const collectionName = "patients";

// CREATE
export const createPerson = async (obj: object): Promise<string> => {
    const colRef = collection(db, collectionName);
    const data = await addDoc(colRef, obj);
    return data.id;
};

// READ
export const getPersons = async (): Promise<Patient[]> => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
};

const getArrayFromCollection = (collection) => {
    return collection.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    });
};

// DELETE
export const deletePerson = async (id: string) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
};
