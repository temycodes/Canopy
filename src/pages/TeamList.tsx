import { Plus, Users } from "lucide-react";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CardList from "../components/CardList";
import DeleteModal from "../components/DeleteModal";
import useTeamStore, { teamSelector } from "../store/teamStore";
import type { TeamMember } from "../utils/types";
import { toast } from "react-toastify";
import Analytics from "../components/Analytics";
import Filter from "../components/Filter";

const TeamList = () => {
  const navigate = useNavigate();
  const teams = useTeamStore((state) => state.teams);
  const deleteTeam = teamSelector.use.deleteTeam();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<TeamMember | null>(null);

  const handleDelete = (team: TeamMember) => {
    setTeamToDelete(team);
    setShowDeleteModal(true);
  };
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };
  const handleConfirmDelete = () => {
    if (teamToDelete) {
      deleteTeam(teamToDelete.id);
      setShowDeleteModal(false);
      setTeamToDelete(null);
      toast(`${teamToDelete.name} has been deleted`);
    }
  };

  // filter
  const filters = ["All", "Online", "Offline", "Away"];
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const filteredTeams = teams.filter((team) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Online") return team.status === "online";
    if (activeFilter === "Offline") return team.status === "offline";
    if (activeFilter === "Away") return team.status === "away";
    return true;
  });

  return (
    <Container fluid className='py-4'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div>
          <h2 className='fw-bold mb-1 logo'>Canopy</h2>
          <p className='text-muted mb-0 small fst-italic'>Manage and organize your team members</p>
        </div>

        <div className='d-flex align-items-center gap-3 justify-content-end flex-wrap'>
          <span className='rounded-pill p-1 align-items-center justify-content-center d-flex border'>
            {filters.map((filter) => (
              <Filter
                key={filter}
                label={filter}
                active={activeFilter === filter}
                onClick={() => handleFilterClick(filter)}
              />
            ))}
          </span>

          <Button className='d-flex align-items-center gap-2' onClick={() => navigate("/add")}>
            <Plus size={18} />
            <span className='d-none d-sm-inline'>Add New Member</span>
            <span className='d-sm-none'>Add</span>
          </Button>
        </div>
      </div>
      <div>
        <Analytics />
      </div>

      {filteredTeams.length === 0 ? (
        <div className='empty-state text-center py-5'>
          <div className='empty-icon mb-3'>
            <Users size={42} />
          </div>

          <h4 className='text-light mb-2'>No team members yet</h4>

          <p className='text-muted mb-4'>Start building your team by adding your first member.</p>

          <Button>
            <Plus size={16} className='me-2' />
            Add your first member
          </Button>
        </div>
      ) : (
        <Row className='p-4 mx-auto'>
          {filteredTeams.map((team) => (
            <Col key={team.id} xs={12} md={6} lg={4} className='mb-4'>
              <CardList team={team} handleDelete={handleDelete} />
            </Col>
          ))}
        </Row>
      )}

      <DeleteModal
        teamName={teamToDelete?.name || ""}
        onConfirmDelete={handleConfirmDelete}
        show={showDeleteModal}
        onCancelDelete={handleCancelDelete}
      />
    </Container>
  );
};

export default TeamList;
