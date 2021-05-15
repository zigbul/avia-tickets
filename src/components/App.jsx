import React from 'react';
import styles from './app.module.scss';
import Sidebar from './sidebar/Sidebar';
import Tickets from './tickets/Tickets';

const App = () => {
  return (
    <article className={styles.App}>
      <Sidebar />
      <Tickets />
    </article>
  );
}

export default App;
