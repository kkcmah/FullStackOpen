import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import { setPatient, useStateValue } from "../state";
import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";
import EntryDetails from "./EntryDetails";

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
          dispatch(setPatient(patientData));
        } catch (error) {
          console.log(error);
        }
      }
    };

    void getPatient();
  }, []);

  if (!patient || patient.id !== id) return <div>Loading...</div>;

  return (
    <div>
      <h2>
        {patient.name}{" "}
        {patient.gender === Gender.Female && <FemaleIcon></FemaleIcon>}
        {patient.gender === Gender.Male && <MaleIcon></MaleIcon>}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {patient.entries.map((entry) => {
        return <EntryDetails key={entry.id} entry={entry}></EntryDetails>;
      })}
    </div>
  );
};

export default PatientListPage;
