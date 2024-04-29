import { useEffect, useState } from "react";
import { getPatients } from "../../app/services/patients";
import { Patient } from "../../common/Patient";
import { Link } from "react-router-dom";
import DataTable, { TableColumn } from "react-data-table-component";

const Read = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
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

    const columns: TableColumn<Patient>[] = [
        {
            name: "ID",
            selector: (patients) => patients.id,
            cell: (patients: Patient) => (
                <Link
                    to={`/updateDelete/${patients.id}`}
                    style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                        maxWidth: "100px",
                        textOverflow: "ellipsis",
                    }}
                >
                    {patients.id}
                </Link>
            ),
            sortable: true,
        },
        {
            name: "PatientName",
            selector: (patients) => patients.userName,
            sortable: true,
        },
        {
            name: "PatientSurName",
            selector: (patients) => patients.surName,
            sortable: true,
        },
        {
            name: "AtendedAt",
            selector: (patients: Patient) => {
                const atendedAtDate = new Date(
                    patients.atendedAt.seconds * 1000
                );

                const day = atendedAtDate.getDate();
                const month = atendedAtDate.getMonth() + 1;
                const year = atendedAtDate.getFullYear();

                return `${day}/${month}/${year}`;
            },
            sortable: true,
        },
    ];

    return (
        <DataTable
            title="Patients"
            columns={columns}
            data={patients}
            pagination
            paginationPerPage={10}
            highlightOnHover
            progressPending={loading}
        />
    );
};

export default Read;
