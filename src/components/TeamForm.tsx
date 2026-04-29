import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { teamSelector } from "../store/teamStore";
import type { TeamMember } from "../utils/types";
import { deptColors } from "../config/config";
import { toast } from "react-toastify";
import { useState } from "react";

const teamSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string(),
  department: z.string(),
  email: z.string().email("Invalid email"),
  status: z.enum(["online", "offline", "away"]),
  skills: z.array(z.string()).max(3, "Maximum of 3 skills"),
  hireDate: z.string().optional(),
});

type teamFormData = z.infer<typeof teamSchema>;

type TeamFormProps = {
  isEdit?: boolean;
};

const TeamForm: React.FC<TeamFormProps> = ({ isEdit = false }) => {
  const addTeam = teamSelector.use.addTeam();
  const getTeamById = teamSelector.use.getTeamById();
  const updateTeam = teamSelector.use.updateTeam();
  const { id } = useParams();

  const currentTeam = id ? getTeamById(id) : null;

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<teamFormData>({
    resolver: zodResolver(teamSchema),
    defaultValues: currentTeam
      ? {
          name: currentTeam?.name,
          role: currentTeam?.role,
          department: currentTeam?.department,
          email: currentTeam?.email,
          status: currentTeam?.status,
          skills: currentTeam?.skills,
          hireDate: currentTeam?.hireDate || "",
        }
      : undefined,
  });

  const [skillsInput, setSkillsInput] = useState(
    () => watch("skills")?.join(", ") || "", // lazy init
  );
  const navigate = useNavigate();

  const onSubmit = (data: teamFormData) => {
    // add team
    if (!isEdit) {
      const newMember: TeamMember = {
        ...data,
        id: crypto.randomUUID(),
      };
      addTeam(newMember);
      toast("Added a new Team Member!");
      navigate("/");
    } else {
      // update team
      if (id) {
        const updatedMember: TeamMember = {
          ...data,
          id,
        };

        updateTeam(id, updatedMember);
        toast("Updated Team Member Successfully");
        navigate("/", {
          state: {
            highlightedTeam: id,
          },
        });
      }
    }
  };

  return (
    <Container className='py-4 rounded'>
      <Row className='justify-content-center'>
        <Col lg={8}>
          <Card className='shadow-lg'>
            <Card.Header className='text-white' style={{ backgroundColor: "#da70d6" }}>
              <h3 className='mb-0'>{isEdit ? "Edit Team Member" : "Add Team Member"}</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* row 1 */}
                <Row>
                  <Col md={6}>
                    <Form.Group className='mb-3'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type='text'
                        isInvalid={!!errors.name}
                        placeholder='Enter your name...'
                        {...register("name")}
                      />
                      {errors?.name && <Form.Text className='text-danger'>{errors.name.message}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className='mb-3'>
                      <Form.Label>Role</Form.Label>
                      <Form.Control
                        required
                        type='text'
                        isInvalid={!!errors.role}
                        placeholder='Enter your role...'
                        {...register("role")}
                      />
                      {errors?.role && <Form.Text className='text-danger'>{errors.role.message}</Form.Text>}
                    </Form.Group>
                  </Col>
                </Row>
                {/* row 2 */}
                <Row>
                  <Col md={6}>
                    <Form.Group className='mb-3'>
                      <Form.Label>Department</Form.Label>
                      <Form.Select
                        required
                        isInvalid={!!errors.department}
                        {...register("department", {
                          setValueAs: (value) => value.toLowerCase(),
                        })}
                      >
                        <option value=''> Select your department... </option>

                        {Object.keys(deptColors).map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </Form.Select>

                      {errors?.department && <Form.Text className='text-danger'>{errors.department.message}</Form.Text>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className='mb-3'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type='email'
                        isInvalid={!!errors.email}
                        placeholder='Enter your email...'
                        {...register("email")}
                      />
                      {errors?.email && <Form.Text className='text-danger'>{errors.email.message}</Form.Text>}
                    </Form.Group>
                  </Col>
                </Row>
                {/* row 3 */}
                <Row>
                  <Col md={6}>
                    <Form.Group className='mb-3'>
                      <Form.Label>Status</Form.Label>
                      <Form.Select {...register("status")}>
                        <option value='online'>Online</option>
                        <option value='away'>Away</option>
                        <option value='offline'>Offline</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className='mb-3'>
                      <Form.Label>Skills (max 3)</Form.Label>

                      <Form.Control
                        type='text'
                        isInvalid={!!errors.skills}
                        placeholder='React, TypeScript, Tailwind'
                        value={skillsInput}
                        onChange={(e) => setSkillsInput(e.target.value)}
                        onBlur={() =>
                          setValue(
                            "skills",
                            skillsInput
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean)
                              .slice(0, 3),
                            { shouldValidate: true },
                          )
                        }
                      />

                      <Form.Text className='text-muted'>Separate skills with commas. Maximum of 3.</Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className='mb-3'>
                      <Form.Label>Hire Date</Form.Label>

                      <Form.Control type='date' {...register("hireDate")} />
                    </Form.Group>
                  </Col>
                </Row>
                <div className='d-flex justify-content-end gap-2'>
                  <Button type='submit' variant='secondary' style={{ backgroundColor: "#da70d6" }}>
                    {isEdit ? "Update Member" : "Add Member"}
                  </Button>
                  <Button variant='danger' onClick={() => navigate("/")}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TeamForm;
