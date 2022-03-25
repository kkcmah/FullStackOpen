// function App() {
//   return (
//     <div className="App">
//       <p>Hello World</p>
//     </div>
//   );
// }

// React compose application from many reusable components

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old.</p>
    </div>
  )
}

const App = () => {
  //console.log("Hello from component App");
  const now = new Date();
  const name = "boop";
  const a = 10;
  const b = 20;
  // js code within {} are evaluated and embedded into html
  // jsx compiled into js by Babel
  return (
    <div>
      <p>Hello World, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
      <Hello name={name} age={a} />
      <Hello name="BB" age={b}/>
    </div>
  );
};

export default App;
