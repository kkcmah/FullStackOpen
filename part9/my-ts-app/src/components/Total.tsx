interface totalProps {
  courseParts: { name: string; exerciseCount: number }[];
}

const Total = ({ courseParts }: totalProps) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
