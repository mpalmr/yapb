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


function NotificationsProvider({ children, value }) {
  const [alerts, setAlerts] = useState([]);


  function dismiss(id) {
    setAlerts(alerts.filter(alert => alert.id !== id));
  }


  function dispatchNotification(type, message, timeout = 12500) {
    const id = uuid();
    setAlerts(alerts.concat({ id, type, message }));

    setTimeout(() => {
      dismiss(id);
    }, timeout);
  }


  return (
    <NotificationsContext.Provider value={value || dispatchNotification}>
      {alerts.map(({ id, type, message }) => (
        <Alert
          key={id}
          className={alertCss.className}
          variant={alertVariants[type] || type}
          onClose={() => dismiss(id)}
          dismissible
        >
          {message}
        </Alert>
      ))}

      {children}

      {alertCss.styles}
    </NotificationsContext.Provider>
  );
}


NotificationsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.func,
};

NotificationsProvider.defaultProps = {
  value: null,
};


export default NotificationsProvider;
