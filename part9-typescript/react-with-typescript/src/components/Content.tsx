import { CoursePart } from '../types';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return courseParts.map((part: CoursePart) => (
    <p key={part.name}>
      {part.name} {part.exerciseCount}
    </p>
  ));
};

export default Content;
