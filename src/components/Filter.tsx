import { Button } from "react-bootstrap";

type FilterProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

const Filter = ({ label, active, onClick }: FilterProps) => {
  return (
    <Button
      onClick={onClick}
      className={"rounded-pill px-2 py-1 me-2 " + (active ? "fw-semibold" : "")}
      variant={active ? "primary" : "outline-secondary"}
    >
      {label}
    </Button>
  );
};

export default Filter;
