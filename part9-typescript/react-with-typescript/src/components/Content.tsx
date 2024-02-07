import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return courseParts.map((part: CoursePart) => (
    <Part part={part} key={part.name} />
  ));
};

export default Content;
