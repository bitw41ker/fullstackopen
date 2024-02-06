interface TotalProps {
  totalExcercises: number;
}

const Total = ({ totalExcercises }: TotalProps) => {
  return <p>{totalExcercises}</p>;
};

export default Total;
