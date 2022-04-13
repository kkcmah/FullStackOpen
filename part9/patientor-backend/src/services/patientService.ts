import { v4 as uuidv4 } from "uuid";
import patients from "../../data/patients";
import { PatientOmitSensitive, NewPatient, Patient } from "../types";

const getAllPatientsOmitSensitive = (): PatientOmitSensitive[] => {
  // actually have to ensure that we omit the fields we dont want
  // otherwise returning patients would pass the type check
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) return undefined;
  return { ...patient, entries: [] };
};

const addPatient = (newPatient: NewPatient): Patient => {
  const addedPatient = {
    id: uuidv4(),
    ...newPatient,
    entries: [],
  };
  patients.push(addedPatient);
  return addedPatient;
};

export default { getAllPatientsOmitSensitive, addPatient, getPatientById };
