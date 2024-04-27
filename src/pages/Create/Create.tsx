//import { Test } from './Create.styles';

import { useState } from "react";
import { createPatient } from "../../app/services/patients";
import { NewPatient } from "../../common/Patient";
import { Timestamp } from "firebase/firestore";
import { Test } from "./Create.styles";

const Create = () => {
    const [patient, setPatient] = useState<NewPatient>({
        userName: "",
        surName: "",
        atendedAt: undefined,
    });
    const [showPatient, setShowPatient] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createPatient(patient);
            setShowPatient(true);
            setTimeout(() => {
                setPatient({ userName: "", surName: "", atendedAt: undefined });
                setShowPatient(false);
            }, 1200);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Test onSubmit={handleSubmit}>
                <div>
                    <input
                        value={patient.userName}
                        type="text"
                        placeholder="Patient Name"
                        onChange={(e) =>
                            setPatient({ ...patient, userName: e.target.value })
                        }
                    />
                    <input
                        value={patient.surName}
                        type="text"
                        placeholder="Patient Surname"
                        onChange={(e) =>
                            setPatient({ ...patient, surName: e.target.value })
                        }
                    />

                    <input
                        value={
                            patient.atendedAt === undefined
                                ? ""
                                : patient.atendedAt instanceof Timestamp
                                ? patient.atendedAt
                                    .toDate()
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                        }
                        type="date"
                        onChange={(e) =>
                            setPatient({
                                ...patient,
                                atendedAt: Timestamp.fromDate(
                                    new Date(e.target.value)
                                ),
                            })
                        }
                    />
                </div>
                <button type="submit">SEND</button>
            </Test>
            {showPatient && (
                <div>
                    <p>
                        Paciente : Name: {patient.userName} - Surname:{" "}
                        {patient.surName}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Create;
