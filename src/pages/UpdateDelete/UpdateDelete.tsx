//import { Test } from './UpdateDelete.styles';

import { useNavigate, useParams } from "react-router-dom";
import {
    deletePatient,
    getPatientById,
    updatePatient,
} from "../../app/services/patients";
import { useEffect, useState } from "react";
import { Patient } from "../../common/Patient";
import { Form, SpanPatient } from './UpdateDelete.styles';
import { Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";

const UpdateDelete = () => {
    const { id } = useParams<string>();
    const [patient, setPatient] = useState<Patient>();
    const [updatedPatient, setUpdatedPatient] = useState<Patient>();
    const navigate = useNavigate();

    useEffect(() => {

        id && getPatientById(id)
            .then((data) => {
                data && setPatient(data);
                data && setUpdatedPatient(data);
            })
            .catch((error) =>
                console.error("Error fetching patient:", error)
            );
    }, [id]);

    const handleDelete = async () => {
        try {
            id && (await deletePatient(id));
            toast(`Deleted patient : ${patient?.userName}`, {
                icon: "🗑️",
            });
            setTimeout(() => {
                setPatient(undefined);
                navigate("/");
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (id && updatePatient && patient) {
                await toast.promise(
                    updatePatient(id, updatedPatient || patient),
                    {
                        loading: "Updating...",
                        success: (
                            <b>
                                Updated patient : {patient?.userName}{" "}
                                {patient?.surName} ➡ {updatedPatient?.userName}{" "}
                                {updatedPatient?.surName}
                            </b>
                        ),
                        error: <b>Could not save.</b>,
                    }
                );

                setTimeout(() => {
                    setPatient(undefined);
                    navigate("/");
                }, 1200);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {patient ? (
                <SpanPatient>
                    <p>name : <strong>{patient.userName}</strong></p>
                    <p>surname : <strong>{patient.surName}</strong></p>
                    <p>atended : <strong>
                        {new Date(
                            patient.atendedAt.seconds * 1000
                        ).toLocaleDateString()}
                    </strong>
                    </p>
                </SpanPatient>
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
        </div>
    );
};

export default UpdateDelete;
