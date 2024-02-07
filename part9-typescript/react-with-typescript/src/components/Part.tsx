import { CoursePart } from '../types';

interface CourseProps {
  part: CoursePart;
}

const Part = ({ part }: CourseProps) => {
  const baseContent = (
    <>
      <h2>{part.name}</h2>
      <p>Excercises: {part.exerciseCount}</p>
    </>
  );

  let partKindContent;

  switch (part.kind) {
    case 'basic':
      partKindContent = (
        <>
          {baseContent}
          <p>Description:: {part.description}</p>
        </>
      );
      break;
    case 'group':
      partKindContent = (
        <>
          {baseContent}
          <p>Group projects: {part.groupProjectCount}</p>
        </>
      );
      break;
    case 'background':
      partKindContent = (
        <>
          {baseContent}
          <p>Description:: {part.description}</p>
          <p>Material: {part.backgroundMaterial}</p>
        </>
      );
      break;
    default:
      return assertNever(part);
  }

  return partKindContent;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;
