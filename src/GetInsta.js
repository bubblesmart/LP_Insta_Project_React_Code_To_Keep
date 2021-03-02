import React, { useState, useEffect } from 'react';
import MediaList from './MediaList';
import axios from 'axios';
import DisplayResultUser from './DisplayResultUser';
import './styles.css';
//const queryString = require('query-string');

// https://api.instagram.com/oauth/authorize?client_id=2539292593034605&redirect_uri=https://lagoonproject.online/&scope=user_profile,user_media&response_type=code
////////////////////////////////data

const redirect_uri = 'https://lagoonproject.online/';
const client_id = '2539292593034605';
const client_secret = 'fb1ac61da1eeb64fbfd54a497d86dcf9';

//const data = {
//   client_id: client_id,
//   redirect_uri: redirect_uri,
//   scope: 'user_profile,user_media',
//   response_type: 'code',
// };

//const dataString = queryString.stringify(data);

const GetInsta = () => {
  //////////////////////////State

  const [apiResponseMediaUrl, setApiResponseMediaUrl] = useState([]);
  const [codeSearch, setCodeSearch] = useState(undefined);

  //////////////////fetch token

  useEffect(() => {
    const querySearch = window.location.search.split('=');

    if (querySearch[1]) {
      setCodeSearch(querySearch[1]);

      const dataToGetToken = {
        method: 'post',
        urlToFetch: 'https://api.instagram.com/oauth/access_token',
        headers: { 'content-type': 'multipart/form-data' },
        redirect_uri,
        client_id,
        client_secret,
        code: codeSearch,
        grant_type: 'authorization_code',
      };

      const callApi = async () => {
        try {
          const response = await axios({
            url: '/getApi',
            method: 'post',
            data: dataToGetToken,
          });

          setApiResponseMediaUrl(response.data);
        } catch (error) {
          console.error('ERROR', error);
        }
      };

      if (codeSearch) {
        callApi();
      }
    }
  }, [codeSearch, apiResponseMediaUrl]);

  return (
    <div className="display-info">
     

      <div className="display-result">
        <DisplayResultUser
          apiResponseMediaUrl={apiResponseMediaUrl}
          codeSearch={codeSearch}
          setApiResponseMediaUrl = {setApiResponseMediaUrl}
        />
        <MediaList apiResponseMediaUrl={apiResponseMediaUrl} />
      </div>
    </div>
  );
};

export default GetInsta;
