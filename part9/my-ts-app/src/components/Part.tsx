import { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const topPart = (
    <h3>
      {coursePart.name} {coursePart.exerciseCount}
    </h3>
  );

  switch (coursePart.type) {
    case "normal":
      return (
        <>
          {topPart}
          <i>{coursePart.description}</i>
        </>
      );

    case "groupProject":
      return (
        <>
          {topPart}
          <div>project exercises {coursePart.groupProjectCount}</div>
        </>
      );

    case "submission":
      return (
        <>
          {topPart}
          <i>{coursePart.description}</i>
          <div>submit to {coursePart.exerciseSubmissionLink}</div>
        </>
      );

    case "special":
      return (
        <>
          {topPart}
          <i>{coursePart.description}</i>
          <div>required skills: {coursePart.requirements.join(", ")}</div>
        </>
      );

    default:
      return assertNever(coursePart);
  }
};

export default Part;
