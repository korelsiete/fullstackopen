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
