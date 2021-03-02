const queryString = require('query-string');


///////////////////conditional rendering
const displayResultUser = ({ apiResponseMediaUrl, codeSearch, setApiResponseMediaUrl }) => {
  const redirect_uri = 'https://lagoonproject.online/';
  const client_id = '2539292593034605';
 // const client_secret = 'fb1ac61da1eeb64fbfd54a497d86dcf9';
  
  const data = {
    client_id: client_id,
    redirect_uri: redirect_uri,
    scope: 'user_profile,user_media',
    response_type: 'code',
  };
  
  const dataString = queryString.stringify(data);
  if (apiResponseMediaUrl.length === 0) {
    return (<div>
      <div>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = `https://api.instagram.com/oauth/authorize?${dataString}`;
          setApiResponseMediaUrl(['patientez']);
        }}
      >
        Obtenir les infos
      </button>
      </div>
      <div>Cliquez sur le bouton ci-dessus pour obtenir le profil Instagram</div>
      </div>)
  } else if (apiResponseMediaUrl[0] === 'patientez') {
    return <div> Patientez...</div>
  
  } else if (codeSearch){
    return (
      <div>
        <div>
        <p className="show-result">
          <span className="bold-font"> <a href="/">Revenir à l'accueil</a> </span>
        </p>
        </div>
        <div>
        <p className="show-result">
          Compte: {apiResponseMediaUrl[1].username}
               </p>
        </div>
      </div>
    );
  } else {
    return null
  }
};

export default displayResultUser;
