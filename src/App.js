import { useReducer } from 'react';
import axios from 'axios';
import './App.scss';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

export default function App() {
  // getter and setter (setter now injest and action to supply the reducer)
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'ADD_PERSON':
          return {
            count: state.count + 1,
            data: [...state.data, action.payload],
          };
        default:
          return state;
      }
    },
    {
      data: null,
      params: { url: '', method: '' },
    }
  );

  const handleStateChange = async (formParams) => {
    try {
      const response = await axios.get(formParams.url);
      const responseData = {
        headers: response.data.headers,
        count: response.data.count,
        res: response.data.results,
      };
      dispatch(responseData);
      setRequestParams({ ...requestParams, ...formParams });
    } catch (error) {
      console.log(error);
    }
  };

  // our addPerson action creator
  function handleAddPerson(name) {
    let action = {
      type: 'ADD_PERSON',
      payload: name,
    };

    dispatch(action);
  }

  return (
    <>
      <Header />
      <Form handleStateChange={handleStateChange} />
      <div id="requestMethod">Request Method: {state.params.method}</div>
      <div id="url">URL: {state.params.url}</div>
      {state.data ? <Results data={state.data} /> : <p>Loading</p>}
      <Footer />
    </>
  );
}
