import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import img1 from '../../../assets/images/users/user4.jpg';

const EmployeeCard = ({ image, title, empId, gender,projectDesignation }) => {
  return (
    <>
      <Card>
        <CardBody className="d-flex p-4 border-bottom">
          {gender === 'Female' ? (
            <img src={image} className="rounded-circle" width="80" alt="avatar" />
          ) : (
            <img src={img1} className="rounded-circle" width="80" alt="avatar" />
          )}
          <CardTitle tag="h4" className="fw-bold ml-3 mt-3 mb-0 profile_detail">
            <Link to={`/EmployeeEdit/${empId}?tab=1`}>{title}</Link>
            <CardSubtitle className="text-muted mt-2" style={{fontSize:15}}>{projectDesignation}</CardSubtitle>
          </CardTitle>
        </CardBody>
      </Card>
    </>
  );
};

EmployeeCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  empId: PropTypes.any,
  projectDesignation: PropTypes.string,
  gender: PropTypes.string,
};

export default EmployeeCard;
