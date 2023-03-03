import { Spinner } from 'react-bootstrap';

export default function LoadingBox() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner className="spinnerColor" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
