import React, { useEffect, useState } from 'react';
import { Row, Col, FormGroup, Label, Button, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';

const StaffDetails = () => {
  // All state variables

  const [staffdetails, setStaffDetails] = React.useState({ email: '', first_name: '' , employee_id:''});
  const [valuelistname, setValueListName] = useState();

  // Navigation and Parameter Constants

  const navigate = useNavigate();

  //All Functions/Methods

  //Setting Data in Staff Details
  const handleInputs = (e) => {
    setStaffDetails({ ...staffdetails, [e.target.name]: e.target.value });
  };
  const getValueListName = () => {
    api
      .get('/employee/getEmployee')
      .then((res) => {
        setValueListName(res.data.data);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //Api call for Insert Staff Data
  const insertStaffData = () => {
    staffdetails.creation_date = creationdatetime;

    if (!staffdetails.email) {
      message('Email is required', 'warning');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(staffdetails.email)) {
      message('Invalid email address', 'warning');
    } else if (staffdetails.email !== '' && staffdetails.employee_id !== '') {
      api
        .post('/staff/insertStaff', staffdetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Staff Details inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/StaffEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('please fill all fields.', 'warning');
    }
  };
  useEffect(() => {
    getValueListName();
  }, []);
  return (
    <div>
      <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="12">
          <ComponentCard title="key Details">
            <FormGroup>
              <Row>
              <Col md="12">
                    <Label>
                     Employee Name <span className="required"> *</span>
                    </Label>
                    <Input
                      type="select"
                      onChange={handleInputs}
                      value={staffdetails && staffdetails.employee_id}
                      name="employee_id"
                    >
                      <option defaultValue="selected">Please Select</option>
                      {valuelistname &&
                        valuelistname.map((ele) => {
                          return (
                            <option key={ele.employee_id} value={ele.employee_id}>
                              {ele.first_name}
                            </option>
                          );
                        })}
                    </Input>
                  </Col>
               
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Col md="12">
                  <Label>
                    Email<span className="required"> *</span>
                  </Label>
                  <Input
                    type="email"
                    onChange={handleInputs}
                    value={staffdetails && staffdetails.email}
                    name="email"
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                  <Button
                    color="primary"
                    type="button"
                    className="btn mr-2 shadow-none"
                    onClick={() => {
                      insertStaffData();
                    }}
                  >
                    Save & Continue
                  </Button>
                  <Button
                    type="submit"
                    className="btn btn-dark shadow-none"
                    onClick={(e) => {
                      if (window.confirm('Are you sure you want to cancel? ')) {
                        navigate('/Staff');
                      } else {
                        e.preventDefault();
                      }
                    }}
                  >
                    Go to List
                  </Button>
                </div>
              </Row>
            </FormGroup>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default StaffDetails;
