import './form.scss';
import { useState } from 'react';

export default function Form(props) {
  const [reqData, setReqData] = useState({});
  const [reqUrl, setReqUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      url: reqUrl,
      body: JSON.parse(reqData),
    };
    props.handleApiCall(formData);
  };

  const handleClick = (e) => {
    const { value } = e.target;
    props.setRequestParams({ ...props.requestParams, method: value });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input onChange={(e) => setReqUrl(e.target.value)} name="url" type="text" />
          <button type="submit">GO!</button>
        </label>
        <label className="methods">
          <button type="button" onClick={handleClick} id="get" value="GET">
            GET
          </button>
          <button type="button" onClick={handleClick} id="post" value="POST">
            POST
          </button>
          <button type="button" onClick={handleClick} id="put" value="PUT">
            PUT
          </button>
          <button type="button" onClick={handleClick} id="delete" value="DELETE">
            DELETE
          </button>
        </label>
        <textarea onChange={(e) => setReqData(e.target.value)} name="json" />
      </form>
    </>
  );
}
