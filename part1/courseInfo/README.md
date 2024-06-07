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
