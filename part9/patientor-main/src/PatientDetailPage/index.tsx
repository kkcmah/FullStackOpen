import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

import { addPatientEntry, setPatient, useStateValue } from "../state";
import { Patient, Gender, Entry, EntryFormValues } from "../types";
import { apiBaseUrl } from "../constants";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";
import { Button } from "@material-ui/core";

const PatientListPage = () => {
  const [showAddEntryForm, setShowAddEntryForm] = useState(false);
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

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!id) {
      console.error("id undefined");
      return;
    }
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addPatientEntry(newEntry));
      setShowAddEntryForm(false);
    } catch (e: unknown) {
      console.error(e);
    }
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

      <h3>
        entries{" "}
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setShowAddEntryForm(true);
          }}
        >
          +
        </Button>
      </h3>

      {patient.entries.map((entry) => {
        return <EntryDetails key={entry.id} entry={entry}></EntryDetails>;
      })}
      {showAddEntryForm && (
        <AddEntryForm
          onSubmit={submitNewEntry}
          onCancel={() => {
            setShowAddEntryForm(false);
          }}
        ></AddEntryForm>
      )}
    </div>
  );
};

export default PatientListPage;
