# CourseInfo Part 2

## Step 6

Create component Course:

```jsx
const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
    </>
  );
};
```

Dynamically render parts of the course:

```jsx
const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};
```

## Step 7

Shows the sum of the exercises in the course.

```jsx
const Total = ({ parts }) => {
  let totalExercises = 0;
  for (let i = 0; i < parts.length; i++) {
    totalExercises += parts[i].exercises;
  }

  return <p>Total of {totalExercises} exercises</p>;
};
```
