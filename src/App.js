import { useReducer } from 'react';
import axios from 'axios';
import './App.scss';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

export default function App() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'UPDATE_DATA':
          return {
            data: action.data,
            params: action.params,
          };
        default:
          return state;
      }
    },
    {
      data: {},
      params: { url: '', method: '' },
    }
  );

  const handleApiCall = async (formParams) => {
    try {
      const response = await axios.get(formParams.url);
      dispatch({
        type: 'UPDATE_DATA',
        data: {
          headers: response.data.headers,
          count: response.data.count,
          res: response.data.results,
        },
        params: formParams,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Form handleApiCall={handleApiCall} />
      <div id="requestMethod">Request Method: {state.params.method}</div>
      <div id="url">URL: {state.params.url}</div>
      {state.data ? <Results data={state.data} /> : <p>Loading</p>}
      <Footer />
    </>
  );
}
