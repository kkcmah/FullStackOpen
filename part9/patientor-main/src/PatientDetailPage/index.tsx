import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import { useStateValue } from "../state";
import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";

const PatientListPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getPatient = async () => {
      if (patient?.id !== id && id) {
        try {
          const { data: patientData } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch({ type: "ADD_INDIVIDUAL_PATIENT", payload: patientData });
        } catch (error) {
          console.log(error);
        }
      }
    };

    void getPatient();
  }, []);

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h2>
        {patient.name}{" "}
        {patient.gender === Gender.Female && <FemaleIcon></FemaleIcon>}
        {patient.gender === Gender.Male && <MaleIcon></MaleIcon>}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
  );
};

export default PatientListPage;
