const Header = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

export default Header;
