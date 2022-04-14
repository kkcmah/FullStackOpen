import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import { setPatient, useStateValue } from "../state";
import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";

const PatientListPage = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();
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

  const findCodeDesc = (code: string): string => {
    const diagnosis = diagnoses.find((d) => {
      return d.code === code;
    });
    if (diagnosis) {
      return diagnosis.name;
    }
    return "";
  };

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
        return (
          <div key={entry.id}>
            <div>
              {entry.date} {entry.description}
            </div>
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map((code) => (
                  <li key={code}>
                    {code} {findCodeDesc(code)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PatientListPage;
