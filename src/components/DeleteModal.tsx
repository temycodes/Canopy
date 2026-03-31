import type React from "react";
import { Button, Modal } from "react-bootstrap";

type DeleteModalProps = {
  show: boolean;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
  teamName: string;
};

const DeleteModal: React.FC<DeleteModalProps> = ({ show, onCancelDelete, onConfirmDelete, teamName }) => {
  return (
    <Modal show={show} onHide={onCancelDelete} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You will permanetly delete this team member <strong>{teamName}</strong> ?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onCancelDelete}>
          Cancel
        </Button>
        <Button variant='primary' onClick={onConfirmDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
