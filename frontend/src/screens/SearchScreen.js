import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SearchScreen() {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const submitHandler = async (e) => {
    e.preventDefault();
    navigate(`/jobslist/${jobTitle}/${location}`);
  };
  return (
    <Container className="small-container p-3 formStyle">
      <h2 className="my-3 p-2">Search for a job</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="jobTitle">
          <Form.Label>Job titles or companies</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3 btnStyle">
          <Button type="submit">Search</Button>
        </div>
      </Form>
    </Container>
  );
}
