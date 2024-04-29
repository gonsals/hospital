import { serverTimestamp, updateDoc } from 'firebase/firestore';
import { NewPatient, Patient } from "../../common/Patient";
import {
    db,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    getDoc,
} from "./firebase";

const collectionName = "patients";

// CREATE
export const createPatient = async (obj: NewPatient): Promise<string> => {
    try {
        if (!obj.userName && !obj.surName) {
            throw new Error("El objeto NewPatient está vacío");
        }

        const colRef = collection(db, collectionName);

        const patientData = { ...obj };

        const patients = await getPatients()
        console.log("Data", patients)

        const patientExists = patients.some(patient => patient.userName === patientData.userName && patient.surName === patientData.surName)

        if (patientExists) {
            throw new Error("El paciente ya existe en la base de datos");
        }
        // Verificar si atendedAt es undefined y asignarle serverTimestamp si es así
        if (patientData.atendedAt === undefined) {
            patientData.atendedAt = serverTimestamp();
        }

        const data = await addDoc(colRef, patientData);
        console.log(patientData);
        return data.id;
    } catch (error) {
        console.error("Error al crear el paciente:", error);
        throw error;
    }
};

// READ
export const getPatients = async (): Promise<Patient[]> => {
    try {
        const colRef = collection(db, collectionName);
        const querySnapshot = await getDocs(colRef);
        return querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id } as Patient;
        });
    } catch (error) {
        console.error("Error al obtener los pacientes:", error);
        throw error;
    }
};

export const getPatientById = async (id: string): Promise<Patient | null> => {
    try {
        const docRef = doc(db, collectionName, id);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            return { ...docSnapshot.data(), id: docSnapshot.id } as Patient;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al obtener el paciente:", error);
        throw error;
    }
};

// DELETE
export const deletePatient = async (id: string) => {
    try {
        const docRef = doc(db, collectionName, id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error al eliminar el paciente:", error);
        throw error;
    }
};

// UPDATE
export const updatePatient = async (
    id: string,
    updatedData: Patient
): Promise<Patient | null> => {
    try {
        const docRef = doc(db, collectionName, id);
        const patientDataWithUpdatedTimestamp = {
            ...updatedData,
            updatedAt: serverTimestamp(),
        };
        await updateDoc(docRef, patientDataWithUpdatedTimestamp);
        // Después de actualizar, obtenemos el paciente actualizado
        const updatedDocSnapshot = await getDoc(docRef);
        if (updatedDocSnapshot.exists()) {
            return {
                ...updatedDocSnapshot.data(),
                id: updatedDocSnapshot.id,
            } as Patient;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al actualizar el paciente:", error);
        throw error;
    }
};