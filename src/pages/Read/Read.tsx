import { Test } from "./Read.styles";
import { useEffect, useState } from "react";
import { getPatients } from "../../app/services/patients";
import { Patient } from "../../common/Patient";
import { Link } from "react-router-dom";

const Read = () => {
    const [patients, setPatients] = useState<Patient[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPatients()
            .then((data) => {
                setPatients(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching patients:", error);
                setLoading(false);
            });
    }, []);

    return (
        <Test>
            {loading ? (
                <p>Loading...</p>
            ) : patients && patients.length > 0 ? (
                <table>
                    <tbody>
                        <tr>
                            <td>ID ⬇️ </td>
                            <td>PatientName ⬇️ </td>
                            <td>PatientSurName ⬇️ </td>
                            <td>AtendedAt ⬇️ </td>
                        </tr>
                        {patients.map((patient) => {
                            const atendedAtDate = new Date(
                                patient.atendedAt.seconds * 1000
                            );

                            const day = atendedAtDate.getDate();
                            const month = atendedAtDate.getMonth() + 1;
                            const year = atendedAtDate.getFullYear();

                            const formattedAtendedAt = `${day}/${month}/${year}`;

                            return (
                                <tr key={patient.id}>
                                    <td>
                                        <Link
                                            to={`/updateDelete/${patient.id}`}
                                        >
                                            {patient.id}
                                        </Link>
                                    </td>
                                    <td>{patient.userName}</td>
                                    <td>{patient.surName}</td>
                                    <td>{formattedAtendedAt}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>Nothing in db</p>
            )}
        </Test>
    );
};

export default Read;
