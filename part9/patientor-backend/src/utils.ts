import {
  NewPatient,
  Gender,
  NewEntry,
  EntryType,
  HealthCheckRating,
  NewEntryBase,
  NewHospitalEntry,
  NewHealthCheckEntry,
  NewOccupationalHealthcareEntry,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name " + name);
  }
  return name;
};

const parseDate = (date: unknown): string => {
  // isString first checks date is string so it can be passed to isDate
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }
  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };

  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(param);
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error("Incorrect or missing type: " + type);
  }
  return type;
};

const parseDescription = (desc: unknown): string => {
  if (!desc || !isString(desc)) {
    throw new Error("Incorrect or missing description " + desc);
  }
  return desc;
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (!codes || !Array.isArray(codes)) {
    throw new Error("Incorrect or missing diagnostic codes " + codes);
  }

  return codes.map((code) => parseName(code));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  // rating can be 0 for healthy
  if (rating === undefined || rating === null || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing health check rating " + rating);
  }
  return rating;
};

const isSickLeave = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  param: any
): param is { startDate: string; endDate: string } => {
  if (
    !param.startDate ||
    !param.endDate ||
    !isString(param.startDate) ||
    !isDate(param.startDate as string) ||
    !isString(param.endDate) ||
    !isDate(param.endDate as string)
  ) {
    return false;
  }
  return true;
};

const parseSickLeave = (
  sickLeave: unknown
): { startDate: string; endDate: string } => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error("Incorrect or missing sick leave " + sickLeave);
  }
  return sickLeave;
};

const isDischarge = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  param: any
): param is { date: string; criteria: string } => {
  if (
    !param.date ||
    !param.criteria ||
    !isString(param.date) ||
    !isDate(param.date as string) ||
    !isString(param.criteria)
  ) {
    return false;
  }
  return true;
};

const parseDischarge = (
  discharge: unknown
): { date: string; criteria: string } => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error("Incorrect or missing discharge " + discharge);
  }
  return discharge;
};

const toNewHealthCheckEntry = (
  baseEntry: NewEntryBase,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any
): NewHealthCheckEntry => {
  const newEntry: NewHealthCheckEntry = {
    type: EntryType.HealthCheck,
    ...baseEntry,
    healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
  };
  return newEntry;
};

const toNewOccupationalHealthcareEntry = (
  baseEntry: NewEntryBase,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any
): NewOccupationalHealthcareEntry => {
  const newEntry: NewOccupationalHealthcareEntry = {
    type: EntryType.OccupationalHealthcare,
    ...baseEntry,
    employerName: parseName(obj.employerName),
  };
  if (obj.sickLeave) {
    newEntry.sickLeave = parseSickLeave(obj.sickLeave);
  }
  return newEntry;
};

const toNewHospitalEntry = (
  baseEntry: NewEntryBase,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any
): NewHospitalEntry => {
  const newEntry: NewHospitalEntry = {
    type: EntryType.Hospital,
    ...baseEntry,
    discharge: parseDischarge(obj.discharge),
  };
  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {
  const newEntryBase: NewEntryBase = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseName(object.specialist),
  };

  if (object.diagnosisCodes) {
    newEntryBase.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  const type = parseType(object.type);

  if (type === EntryType.HealthCheck) {
    return toNewHealthCheckEntry(newEntryBase, object);
  } else if (type === EntryType.OccupationalHealthcare) {
    return toNewOccupationalHealthcareEntry(newEntryBase, object);
  } else if (type === EntryType.Hospital) {
    return toNewHospitalEntry(newEntryBase, object);
  } else {
    throw new Error("Failed to create new entry check if type is correct");
  }
};
