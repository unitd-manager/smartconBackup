import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  ModalBody,
  ModalFooter,
  Modal,
  ModalHeader,
} from 'reactstrap';
import PropTypes from 'prop-types';
import message from '../Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../views/form-editor/editor.scss';

import api from '../../constants/api';

const WorkOrderEditModal = ({ workLine, subWorkData, setSubWorkData }) => {
  WorkOrderEditModal.propTypes = {
    workLine: PropTypes.object,
    subWorkData: PropTypes.bool,
    setSubWorkData: PropTypes.func,
  };

  const [contactinsert, setContactInsert] = useState(null);

  const handleInputs = (e) => {
    setContactInsert({ ...contactinsert, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db

  const editWorkOrderData = () => {
    api
      .post('/projecttabsubconworkorder/editWorkOrder', contactinsert)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  useEffect(() => {
    setContactInsert(workLine);
  }, [workLine]);

  return (
    <>
      <Modal size="lg" isOpen={subWorkData}>
        <ModalHeader>
          Work Order Details
          <Button
            color="secondary"
            onClick={() => {
              setSubWorkData(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md="3" className="mb-4 d-flex justify-content-between"></Col>
          </Row>
          <Row>
            <Col md="4">
              <FormGroup>
                <Label>Description </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.description}
                  name="description"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Quantity </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.quantity}
                  name="quantity"
                />
              </FormGroup>
            </Col>

            <Col md="4">
              <FormGroup>
                <Label>unit Rate </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.unit_rate}
                  name="unit_rate"
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Row>
            <div className="d-flex align-items-center gap-2">
              <Button
                color="primary"
                onClick={() => {
                  editWorkOrderData();
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setSubWorkData(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Row>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default WorkOrderEditModal;
