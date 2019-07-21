import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import { Alert } from 'react-bootstrap';
import uuid from 'uuid/v4';


const alertCss = css.resolve`
  margin-bottom: 0;
`;


const alertVariants = {
  error: 'danger',
};

export const NotificationsContext = createContext();


function NotificationsProvider({ children }) {
  const [alerts, setAlerts] = useState([]);


  function dispatchNotification(type, message, timeout = 12500) {
    const id = uuid();
    setAlerts(alerts.concat({
      id,
      variant: alertVariants[type],
      message,
    }));

    setTimeout(() => {
      setAlerts(alerts.filter(alert => alert.id !== id));
    }, timeout);
  }


  return (
    <NotificationsContext.Provider value={dispatchNotification}>
      {alerts.map(({ id, variant, message }) => (
        <Alert key={id} className={alertCss.className} variant={variant}>{message}</Alert>
      ))}

      {children}

      {alertCss.styles}
    </NotificationsContext.Provider>
  );
}


NotificationsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export default NotificationsProvider;
