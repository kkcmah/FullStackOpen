interface contentProps {
  courseParts: { name: string; exerciseCount: number }[];
}

const Content = ({ courseParts }: contentProps) => {
  return (
    <>
      {courseParts.map((part) => {
        return (
          <p key={part.name}>
            {part.name} {part.exerciseCount}
          </p>
        );
      })}
    </>
  );
};

export default Content;
