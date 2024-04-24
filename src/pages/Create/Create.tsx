//import { Test } from './Create.styles';

import { useState } from "react";
// import { Patient } from "../../common/Patient";

const Create = () => {
    const [patient, setPatient] = useState({});


    return (
        <div>
            <form action="">
                <input
                    type="text"
                    placeholder="Patient Name"
                    onChange={(e) =>
                        setPatient({ ...patient, userName: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Patient Surname"
                    onChange={(e) =>
                        setPatient({ ...patient, surName: e.target.value })
                    }
                />
                <button type="submit">SEND</button>
            </form>
        </div>
    );
};

export default Create;
