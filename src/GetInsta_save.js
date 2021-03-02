import React, { useState, useEffect } from 'react';

import axios from 'axios';

const queryString = require('query-string');

////////////////////////////////data

const redirect_uri = 'https://lagoonproject.online/';
const client_id = '2539292593034605';
const client_secret = 'fb1ac61da1eeb64fbfd54a497d86dcf9';

const data = {
  client_id: client_id,
  redirect_uri: redirect_uri,
  scope: 'user_profile,user_media',
  response_type: 'code',
};

const dataString = queryString.stringify(data);

const GetInsta = () => {
  //////////////////////////State

  const [apiResponseToken, setApiResponseToken] = useState(
    'Token non obtenu, patientez'
  );
  const [apiResponseUserId, setApiResponseUserId] = useState(
    'User Id non obtenu, patientez'
  );
  const [codeSearch, setCodeSearch] = useState('Code non demandé');

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
          console.log(response.data);

          if (!response.data.error_type) {
            setApiResponseToken(response.data.access_token);
            setApiResponseUserId(response.data.user_id);
          } else if (response.data.error_type) {
            setApiResponseToken("revenir à l'accueil");
            setApiResponseUserId("revenir à l'accueil");
          }
        } catch (error) {
          console.error('ERROR', error);
        }
      };
      callApi();
    }
  }, []);

  return (
    <div>
      <h2> test de GetInsta</h2>
      <a href={`https://api.instagram.com/oauth/authorize?${dataString}`}>
        obtenir le code Instagram
      </a>
      <p>voici le code: {codeSearch}</p>
      <p>voici le token: {apiResponseToken} </p>
      <p>voici le user Id: {apiResponseUserId} </p>
    </div>
  );
};

export default GetInsta;
