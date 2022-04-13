import { patients } from "../../data/patients";
import { getAllPatientsOmitSensitive } from "../types";

const getAllPatientsOmitSensitive = (): getAllPatientsOmitSensitive[] => {
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

export default { getAllPatientsOmitSensitive };
