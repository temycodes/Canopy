import { Moon, Power, Users, Wifi } from "lucide-react";
import { Card, Col, Row } from "react-bootstrap";
import { teamSelector } from "../store/teamStore";

const Analytics = () => {
  const teams = teamSelector.use.teams();
  const noOfTeamMembers = teams.length;
  const onlineMembers = teams.filter((team) => team.status === "online").length;
  const awayMembers = teams.filter((team) => team.status === "away").length;
  const offlineMembers = teams.filter((team) => team.status === "offline").length;

  const stats = [
    {
      label: "Total Members",
      value: noOfTeamMembers,
      icon: <Users size={20} />,
      color: "#6366f1",
    },
    {
      label: "Online",
      value: onlineMembers,
      icon: <Wifi size={20} />,
      color: "#22c55e",
    },
    {
      label: "Away",
      value: awayMembers,
      icon: <Moon size={20} />,
      color: "#f59e0b",
    },
    {
      label: "Offline",
      value: offlineMembers,
      icon: <Power size={20} />,
      color: "#9ca3af",
    },
  ];

  return (
    <div>
      <Row className='g-3'>
        {stats.map((stat) => (
          <Col key={stat.label} xs={12} sm={6} lg={3}>
            <Card
              className='border-0 shadow-sm h-80'
              style={{
                borderRadius: "16px",
                backgroundColor: `${stat.color}20`,
              }}
            >
              <Card.Body className='d-flex flex-row justify-content-between'>
                {/* Top */}
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='p-2 rounded' style={{ backgroundColor: stat.color, color: "white" }}>
                    {stat.icon}
                  </div>
                </div>

                {/* Value */}
                <div className='mt-2 d-flex justify-content-end text-end'>
                  <div className='d-flex flex-column'>
                    <h3 className='fw-bold mb-1'>{stat.value}</h3>
                    <div className='text-muted small'>{stat.label}</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Analytics;
