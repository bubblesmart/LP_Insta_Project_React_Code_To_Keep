import React from 'react';
import MediaDetail from './MediaDetail';

const MediaList = ({ apiResponseMediaUrl}) => {

  switch (apiResponseMediaUrl.length) {
    case 25:
      const mediaList = apiResponseMediaUrl.map((item) => {
        return <MediaDetail key={item.id} media_url={item.media_url} />;
      });

      return <div className="show-result"> {mediaList} </div>;
    

    default:
      return null;
  }
};

export default MediaList;
