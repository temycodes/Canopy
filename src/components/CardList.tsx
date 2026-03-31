import { Bolt, Briefcase, Calendar, Circle, CircleStar, Edit, Mail, Trash } from "lucide-react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { deptColors, statusConfig } from "../config/config";
import type { TeamMember } from "../utils/types";
import { useEffect, useState } from "react";

type CardListProps = {
  team: TeamMember;
  handleDelete: (team: TeamMember) => void;
};

const CardList = ({ team, handleDelete }: CardListProps) => {
  const deptColor = deptColors[team.department];
  const navigate = useNavigate();

  const { state } = useLocation();
  const highlightedTeam = state?.highlightedTeam;
  const [highlightId, setHighlightId] = useState<string | undefined>(highlightedTeam);

  useEffect(() => {
    if (!highlightedTeam) return;
    const timeout = setTimeout(() => setHighlightId(undefined), 3000);

    return () => clearTimeout(timeout);
  }, [highlightedTeam]);

  return (
    <Card
      className={`border-0 h-100 shadow-hover cursor-pointer ${highlightId === team.id ? "highlighted" : ""} `}
      style={{
        borderRadius: "16px",
        backgroundColor: `${deptColor}80`,
      }}
    >
      <Card.Body className='d-flex flex-column gap-2'>
        {/* Header */}
        <div className='d-flex justify-content-between align-items-start'>
          <Card.Title className='fw-semibold mb-0 text-primary text-truncate'>{team.name}</Card.Title>

          <Circle size={14} fill={statusConfig[team.status].color} />
        </div>

        {/* Role */}
        <div className='d-flex align-items-center gap-2 small'>
          <Briefcase size={14} />
          {team.role}
        </div>

        {/* Department */}
        <div className='d-flex align-items-center gap-2 text-muted'>
          <Bolt size={16} />
          <span>{team.department}</span>
        </div>

        {/* Email */}
        <div className='d-flex align-items-center gap-2 text-muted small'>
          <Mail size={14} />
          {team.email}
        </div>

        {/* Skills */}
        <div className='d-flex flex-wrap gap-1 mt-1'>
          {team.skills.map((skill) => (
            <div className='d-flex align-items-center gap-1' key={skill}>
              <CircleStar size={12} />
              <span className=' text-muted small'>{skill}</span>
            </div>
          ))}
        </div>

        {/* Spacer */}
        <div className='flex-grow-1' />

        {/* Footer */}
        <div className='d-flex align-items-center gap-2 text-muted small'>
          <Calendar size={14} />
          {team.hireDate}
        </div>

        <div className='d-flex justify-content-between '>
          <Button
            size='sm'
            className='rounded-2'
            variant='outline-primary'
            onClick={() => navigate(`/edit/${team.id}`)}
          >
            <Edit size={14} />
          </Button>
          <Button size='sm' className='rounded-2' variant='outline-danger' onClick={() => handleDelete(team)}>
            <Trash size={14} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardList;
