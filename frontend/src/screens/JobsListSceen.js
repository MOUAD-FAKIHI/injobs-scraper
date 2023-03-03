import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useEffect, useReducer } from 'react';
import Table from 'react-bootstrap/Table';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, jobOffers: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default function JobsListSceen() {
  const params = useParams();
  const { jobtitle, location } = params;
  const [{ loading, error, jobOffers }, dispatch] = useReducer(reducer, {
    jobOffers: [],
    loading: true,
    ready: true,
    error: '',
  });
  const headers = [
    { label: 'Id', key: 'Id' },
    { label: 'Offer', key: 'Offer' },
    { label: 'Company', key: 'Company' },
    { label: 'Location', key: 'Location' },
    { label: 'State', key: 'State' },
    { label: 'Salary', key: 'Salary' },
    { label: 'Date', key: 'Date' },
    { label: 'Link', key: 'Link' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(
          `/api/linkedjob-offers/jobtitle/${jobtitle}/location/${location}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [jobtitle, location]);

  return (
    <div className="searchResultsStyle">
      <div className="mb-2 d-flex justify-content-between">
        <h2>Search results</h2>
        <div>
          <CSVLink
            filename={'injobs.csv'}
            separator={';'}
            data={jobOffers}
            headers={headers}
          >
            <Button disabled={loading}>
              <i className="fa-solid fa-file-excel"></i> Upload
            </Button>
          </CSVLink>
        </div>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Table className="tableStyle" striped responsive bordered>
            <thead>
              <tr>
                <th>Offer</th>
                <th>Company</th>
                <th>Location</th>
                <th>Salary</th>
                <th>State</th>
                <th>Date</th>
                <th>Apply</th>
              </tr>
            </thead>
            <tbody>
              {jobOffers.map((jobOffer) => (
                <tr key={jobOffer.Id}>
                  <td>{jobOffer.Offer}</td>
                  <td>{jobOffer.Company}</td>
                  <td>{jobOffer.Location}</td>
                  <td>{jobOffer.Salary}</td>
                  <td>{jobOffer.State}</td>
                  <td>{jobOffer.Date}</td>
                  <td>
                    <Link to={jobOffer.Link}>Link</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}
