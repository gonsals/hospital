import { FieldValue, Timestamp } from "firebase/firestore";

export type Patient = {
    id: string;
    userName: string;
    surName: string;
    atendedAt: Timestamp;
};

export type NewPatient = {
    userName: string;
    surName: string;
    atendedAt: Timestamp | FieldValue | undefined;
};
