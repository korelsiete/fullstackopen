# Course Information

## Step 1

Component creation:

- Header
- Content
- Footer

```js
const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts, exercises }) => {
  return (
    <>
      <p>
        {parts[0]} {exercises[0]}
      </p>
      <p>
        {parts[1]} {exercises[1]}
      </p>
      <p>
        {parts[2]} {exercises[2]}
      </p>
    </>
  );
};

const Total = ({ totalValue }) => {
  return <p>Number of exercises {totalValue}</p>;
};
```

Pass values ​​to components:

```js
  <Header course={course} />
  <Content
    parts={[part1, part2, part3]}
    exercises={[exercises1, exercises2, exercises3]}
  />
  <Total totalValue={exercises1 + exercises2 + exercises3} />
```

## Step 2

Create Part component:

```js
const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};
```

Refactor Content component:

```js
const Content = ({ parts, exercises }) => {
  return (
    <>
      <Part part={parts[0]} exercises={exercises[0]} />
      <Part part={parts[1]} exercises={exercises[1]} />
      <Part part={parts[2]} exercises={exercises[2]} />
    </>
  );
};
```

## Step 3

Change variables:

```js
const part1 = {
  name: "Fundamentals of React",
  exercises: 10,
};
const part2 = {
  name: "Using props to pass data",
  exercises: 7,
};
const part3 = {
  name: "State of a component",
  exercises: 14,
};
```

Pass the variables:

```js
<Content
  parts={[part1.name, part2.name, part3.name]}
  exercises={[part1.exercises, part2.exercises, part3.exercises]}
/>

<Total totalValue={part1.exercises + part2.exercises + part3.exercises} />
```

## Step 4

Change variables:

```js
const parts = [
  {
    name: "Fundamentals of React",
    exercises: 10,
  },
  {
    name: "Using props to pass data",
    exercises: 7,
  },
  {
    name: "State of a component",
    exercises: 14,
  },
];
```

Refactor components:

```js
const Content = ({ parts }) => {
  return (
    <>
      <Part part={parts[0].name} exercises={parts[0].exercises} />
      <Part part={parts[1].name} exercises={parts[1].exercises} />
      <Part part={parts[2].name} exercises={parts[2].exercises} />
    </>
  );
};

const Total = ({ parts }) => {
  const totalValue = parts.reduce((acc, part) => acc + part.exercises, 0);
  return <p>Number of exercises {totalValue}</p>;
};
```

Pass the variables:

```js
<Content parts={parts} />
<Total parts={parts} />
```

## Step 5

Change variables:

```js
const course = {
  name: "Half Stack application development",
  parts: [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ],
};
```

Pass the variables:

```js
<Header course={course.name} />
<Content parts={course.parts} />
<Total parts={course.parts} />
```
