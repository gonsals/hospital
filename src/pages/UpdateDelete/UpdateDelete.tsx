//import { Test } from './UpdateDelete.styles';

import { useParams } from "react-router-dom";
import {
    deletePatient,
    getPatientById,
    updatePatient,
} from "../../app/services/patients";
import { useEffect, useState } from "react";
import { Patient } from "../../common/Patient";
import { Form } from "./UpdateDelete.styles";
import { Timestamp } from "firebase/firestore";

enum PatientStatus {
    Unchanged,
    Updated,
    Deleted,
}

const UpdateDelete = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient>();
    const [showPatient, setShowPatient] = useState(false);
    const [updatedPatient, setUpdatedPatient] = useState<Patient>();
    const [patientStatus, setPatientStatus] = useState<PatientStatus>(
        PatientStatus.Unchanged
    );

    useEffect(() => {
        if (id) {
            getPatientById(id)
                .then((data) => {
                    data && setPatient(data);
                    data && setUpdatedPatient(data);
                })
                .catch((error) =>
                    console.error("Error fetching patient:", error)
                );
        }
    }, [id]);

    const handleDelete = async () => {
        try {
            id && (await deletePatient(id));
            setPatientStatus(PatientStatus.Deleted);
            setShowPatient(true);
            setTimeout(() => {
                setPatient(undefined);
                setShowPatient(false);
                window.location.href = "/";
            }, 1200);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (id && updatePatient && patient) {
                await updatePatient(id, updatedPatient || patient);
                setShowPatient(true);
                setTimeout(() => {
                    setPatient(undefined);
                    setShowPatient(false);
                    window.location.href = "/";
                }, 1200);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {patient ? (
                <h5>
                    Name: {patient.userName} - Surname: {patient.surName} -
                    Date:
                    {new Date(
                        patient.atendedAt.seconds * 1000
                    ).toLocaleDateString()}
                </h5>
            ) : (
                <p>Loading...</p>
            )}
            <Form onSubmit={handleUpdate}>
                <div>
                    <input
                        type="text"
                        placeholder={patient?.userName}
                        onChange={(e) =>
                            setUpdatedPatient({
                                ...updatedPatient,
                                userName: e.target.value,
                            } as Patient)
                        }
                    />
                    <input
                        type="text"
                        placeholder={patient?.surName}
                        onChange={(e) =>
                            setUpdatedPatient({
                                ...updatedPatient,
                                surName: e.target.value,
                            } as Patient)
                        }
                    />
                    <input
                        type="date"
                        value={
                            patient?.atendedAt
                                ? new Date(patient.atendedAt.seconds * 1000)
                                      .toISOString()
                                      .split("T")[0]
                                : ""
                        }
                        onChange={(e) =>
                            setUpdatedPatient({
                                ...updatedPatient,
                                atendedAt: Timestamp.fromDate(
                                    new Date(e.target.value)
                                ),
                            } as Patient)
                        }
                    />
                </div>
                <div>
                    <button type="submit">UPDATE</button>
                </div>
            </Form>
            <button onClick={() => handleDelete()}>DELETE</button>

            {showPatient && (
                <div>
                    <p>
                        {patientStatus === PatientStatus.Deleted ? (
                            <span>Deleted patient: </span>
                        ) : (
                            <span>Updated patient: </span>
                        )}
                        Name: {patient?.userName} - Surname : {patient?.surName}
                    </p>
                </div>
            )}
        </div>
    );
};

export default UpdateDelete;
