import React, { useState, Fragment } from 'react';

import './App.css';

function App() {
  const [eventsList, setEventsList] = useState([]);

  const handleClick = () => {
    window.chrome.identity.getAuthToken({ interactive: true }, function(token) {
      console.log(token);
      var init = {
        method: 'GET',
        async: true,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        contentType: 'json'
      };
      fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events?key=AIzaSyCNBqYRAgzeeA2maUFrwNwe1wxl8bxcl0k',
        init
      )
        .then(response => response.json())
        .then(function(data) {
          console.log(data);
          setEventsList(data.items);
        });
    });
  };

  return (
    <Fragment>
      <button onClick={handleClick}>List Events</button>
      <ul>
        {eventsList.length > 0 &&
          eventsList.map(function(eventList) {
            return <li>{eventList.summary}</li>;
          })}
      </ul>
    </Fragment>
  );
}

export default App;
