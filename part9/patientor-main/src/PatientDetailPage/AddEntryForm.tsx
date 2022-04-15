import { Button, Grid } from "@material-ui/core";
import { Formik, Form, Field, FormikErrors } from "formik";
import {
  DiagnosisSelection,
  SelectField,
  TextField,
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { HealthCheckRating, EntryFormValues, EntryType } from "../types";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthCheckRatingOptions = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

const entryTypeOptions = [
  { value: EntryType.HealthCheck, label: "Health Check" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare" },
];

interface EntryFormErrors
  extends Omit<FormikErrors<EntryFormValues>, "sickLeave" | "discharge"> {
  sickLeave?: {
    startDate?: string;
    endDate?: string;
  };
  discharge?: {
    date?: string;
    criteria?: string;
  };
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  const isValidDate = (date: string) => {
    return Boolean(Date.parse(date));
  };

  const requiredError = "Field is required";
  const invalidDate = "Date is invalid. Format: YYYY-MM-DD";

  const validateBase = (values: EntryFormValues, errors: EntryFormErrors) => {
    if (!values.description) {
      errors.description = requiredError;
    }
    if (!values.date) {
      errors.date = requiredError;
    }
    if (!isValidDate(values.date)) {
      errors.date = invalidDate;
    }
    if (!values.specialist) {
      errors.specialist = requiredError;
    }
    return errors;
  };

  const validateHealthCheckForm = (
    values: EntryFormValues,
    errors: EntryFormErrors
  ): EntryFormErrors => {
    if (
      values.healthCheckRating === null ||
      values.healthCheckRating === undefined
    ) {
      errors.healthCheckRating = requiredError;
    }
    return errors;
  };

  const validateOccHealthcareForm = (
    values: EntryFormValues,
    errors: EntryFormErrors
  ): EntryFormErrors => {
    if (!values.employerName) {
      errors.employerName = requiredError;
    }

    if (
      values.sickLeave &&
      values.sickLeave.startDate !== "" &&
      !isValidDate(values.sickLeave.startDate)
    ) {
      errors.sickLeave = { ...errors.sickLeave, startDate: invalidDate };
    }

    if (
      values.sickLeave &&
      !values.sickLeave.startDate &&
      values.sickLeave.endDate
    ) {
      errors.sickLeave = { ...errors.sickLeave, startDate: requiredError };
    }

    if (
      values.sickLeave &&
      values.sickLeave.endDate !== "" &&
      !isValidDate(values.sickLeave.endDate)
    ) {
      errors.sickLeave = { ...errors.sickLeave, endDate: invalidDate };
    }

    if (
      values.sickLeave &&
      values.sickLeave.startDate &&
      !values.sickLeave.endDate
    ) {
      errors.sickLeave = { ...errors.sickLeave, endDate: requiredError };
    }

    return errors;
  };

  const validateHospitalForm = (
    values: EntryFormValues,
    errors: EntryFormErrors
  ): EntryFormErrors => {
    if (!values.discharge) {
      return errors;
    }
    if (!isValidDate(values.discharge.date)) {
      errors.discharge = { ...errors.discharge, date: invalidDate };
    }
    if (!values.discharge.criteria) {
      errors.discharge = {
        ...errors.discharge,
        criteria: "criteria is required",
      };
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        // health check entry values
        healthCheckRating: 0,
        // occupational health entry values
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
        // hospital entry values
        discharge: { date: "", criteria: "" },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        let errors: EntryFormErrors = {};
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        errors = validateBase(values, errors);
        if (values.type === EntryType.HealthCheck) {
          return validateHealthCheckForm(values, errors);
        } else if (values.type === EntryType.OccupationalHealthcare) {
          return validateOccHealthcareForm(values, errors);
        } else if (values.type === EntryType.Hospital) {
          return validateHospitalForm(values, errors);
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Entry type"
              name="type"
              options={entryTypeOptions}
            />
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />

            {values.type === EntryType.HealthCheck && (
              <SelectField
                label="health check rating"
                name="healthCheckRating"
                options={healthCheckRatingOptions}
              />
            )}

            {values.type === EntryType.OccupationalHealthcare && (
              <>
                <Field
                  label="employer name"
                  placeholder="employer name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="sick leave start date"
                  placeholder="sick leave start date"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="sick leave end date"
                  placeholder="sick leave end date"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            )}

            {values.type === EntryType.Hospital && (
              <>
                <Field
                  label="discharge date"
                  placeholder="discharge date"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="criteria"
                  placeholder="critera"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            )}

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Grid>
              <Grid item>
                <Button
                  style={{ float: "left" }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{ float: "right" }}
                  color="secondary"
                  variant="contained"
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
