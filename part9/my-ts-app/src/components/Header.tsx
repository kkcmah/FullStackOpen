interface headerProps {
  name: string;
}

const Header = ({ name }: headerProps) => {
  return <h1>{name}</h1>;
};

export default Header;
