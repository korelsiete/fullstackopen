const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

const Total = ({ parts }) => {
  let totalExercises = parts.reduce((acc, part) => acc + part.exercises, 0);

  return <p>Total of {totalExercises} exercises</p>;
};

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name}: {exercises}
    </p>
  );
};

export default Course;
