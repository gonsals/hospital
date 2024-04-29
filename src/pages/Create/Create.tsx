//import { Test } from './Create.styles';

import { useState } from "react";
import { createPatient } from "../../app/services/patients";
import { NewPatient } from "../../common/Patient";
import { Timestamp } from "firebase/firestore";
import { Test } from "./Create.styles";
import toast from "react-hot-toast";

const Create = () => {
    const [patient, setPatient] = useState<NewPatient>({
        userName: "",
        surName: "",
        atendedAt: undefined,
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await toast.promise(createPatient(patient), {
                loading: "Saving...",
                success: (
                    <b>
                        New patient : ${patient?.userName} - ${patient?.surName}
                    </b>
                ),
                error: <b>Could not save.</b>,
            });

            setTimeout(() => {
                setPatient({ userName: "", surName: "", atendedAt: undefined });
            }, 1200);
        } catch (error) {
            if (error instanceof Error) toast.error(error.message);
            else throw error;
        }
    };

    return (
        <div>
            <Test onSubmit={handleSubmit}>
                <div className="inputs">
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
        </div>
    );
};

export default Create;
