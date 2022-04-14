import { Entry, HealthCheckRating } from "../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./EntryDetails.css";

import { useStateValue } from "../state";

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();

  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const findCodeDesc = (code: string): string => {
    const diagnosis = diagnoses.find((d) => {
      return d.code === code;
    });
    if (diagnosis) {
      return diagnosis.name;
    }
    return "";
  };

  const getHealthRatingIconStyle = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return { color: "rgb(56, 168, 50)" };
      case HealthCheckRating.LowRisk:
        return { color: "rgb(195, 230, 57)" };
      case HealthCheckRating.HighRisk:
        return { color: "rgb(247, 177, 37)" };
      case HealthCheckRating.CriticalRisk:
        return { color: "rgb(240, 22, 22)" };

      default:
        return assertNever(rating);
    }
  };

  switch (entry.type) {
    case "HealthCheck":
      return (
        <div className="entry-detail">
          <div>
            {entry.date} <MedicalServicesIcon></MedicalServicesIcon>
          </div>
          <em>{entry.description}</em>
          <div>
            <FavoriteIcon
              style={getHealthRatingIconStyle(entry.healthCheckRating)}
            ></FavoriteIcon>
          </div>

          <div>diagnose by: {entry.specialist}</div>
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
    case "OccupationalHealthcare":
      return (
        <div className="entry-detail">
          <div>
            {entry.date} <WorkIcon></WorkIcon>
          </div>
          <em>{entry.description}</em>
          <div>diagnose by: {entry.specialist}</div>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {findCodeDesc(code)}
                </li>
              ))}
            </ul>
          )}
          <div>employer: {entry.employerName}</div>
          {entry.sickLeave && (
            <div>
              sick leave from {entry.sickLeave.startDate} to{" "}
              {entry.sickLeave.endDate}
            </div>
          )}
        </div>
      );
    case "Hospital":
      return (
        <div className="entry-detail">
          <div>
            {entry.date} <LocalHospitalIcon></LocalHospitalIcon>
          </div>
          <em>{entry.description}</em>
          <div>diagnose by: {entry.specialist}</div>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {findCodeDesc(code)}
                </li>
              ))}
            </ul>
          )}
          <div>discharge date: {entry.discharge.date}</div>
          <div>criteria: {entry.discharge.criteria}</div>
        </div>
      );

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
