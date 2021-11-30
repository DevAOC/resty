import { useState } from 'react';
import axios from 'axios';
import './app.scss';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

export default function App() {
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({ url: '', method: '' });

  const callApi = async (formParams) => {
    const response = await axios.get(formParams.url);
    const responseData = {
      headers: response.data.headers,
      count: response.data.count,
      res: response.data.results,
    };
    setData(responseData);
    setRequestParams({ ...requestParams, ...formParams });
  };

  return (
    <>
      <Header />
      <Form setRequestParams={setRequestParams} handleApiCall={callApi} />
      <div id="requestMethod">Request Method: {requestParams.method}</div>
      <div id="url">URL: {requestParams.url}</div>
      {data ? <Results data={data} /> : <p>Loading</p>}
      <Footer />
    </>
  );
}
