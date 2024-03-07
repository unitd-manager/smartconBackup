import React, { useEffect, useState } from 'react';
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
import ComponentCard from '../ComponentCard';
import message from '../Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../views/form-editor/editor.scss';

import api from '../../constants/api';

const QuotationViewLineItems = ({ quoteLine, quoteData, setQuoteData }) => {
  QuotationViewLineItems.propTypes = {
    quoteLine: PropTypes.object,
    quoteData: PropTypes.bool,
    setQuoteData: PropTypes.func,
  };

  const [quoteedit, setQuoteEdit] = useState(null);
  const handleInputs = (e) => {
    setQuoteEdit({ ...quoteedit, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db

  const editquoteLineData = () => {
    api
      .post('/projecttabquote/editTabQuoteLineItems', quoteedit)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  const insertquoteLog = () => {
    api
      .post('/projecttabquote/insertQuoteitemsLog', quoteedit)
      .then(() => {
        message('quote inserted successfully.', 'success');
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  };
  useEffect(() => {
    setQuoteEdit(quoteLine);
  }, [quoteLine]);

  return (
    <>
      <Modal size="lg" isOpen={quoteData}>
        <ModalHeader>
          Edit display{' '}
          <Button
            color="secondary"
            onClick={() => {
              setQuoteData(false);
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
            <Col md="2">
              <FormGroup>
                <Label>Title </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={quoteedit && quoteedit.title}
                  name="title"
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>Description </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={quoteedit && quoteedit.description}
                  name="description"
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>Quantity </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={quoteedit && quoteedit.quantity}
                  name="quantity"
                />
              </FormGroup>
            </Col>

            <Col md="2">
              <FormGroup>
                <Label>UOM </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={quoteedit && quoteedit.unit}
                  name="unit"
                />
              </FormGroup>
            </Col>
            <Col md="2">
              <FormGroup>
                <Label>Unit Price </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={quoteedit && quoteedit.unit_price}
                  name="unit_price"
                />
              </FormGroup>
            </Col>

            <Col md="2">
              <FormGroup>
                <Label>Total Price </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={quoteedit && quoteedit.amount}
                  name="amount"
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
          <Row>
            <div className="pt-3 mt-3 d-flex align-items-center gap-2">
              <Button
                color="primary"
                onClick={() => {
                  editquoteLineData();
                  insertquoteLog();
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setQuoteData(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Row>
        </ModalFooter>

        <ComponentCard></ComponentCard>
      </Modal>
    </>
  );
};
export default QuotationViewLineItems;
