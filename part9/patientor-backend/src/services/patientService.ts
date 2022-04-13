import { v4 as uuidv4 } from "uuid";
import patients from "../../data/patients";
import { PatientsOmitSensitive, NewPatient, Patient } from "../types";

const getAllPatientsOmitSensitive = (): PatientsOmitSensitive[] => {
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

const addPatient = (newPatient: NewPatient): Patient => {
  const addedPatient = {
    id: uuidv4(),
    ...newPatient,
  };
  patients.push(addedPatient);
  return addedPatient;
};

export default { getAllPatientsOmitSensitive, addPatient };
