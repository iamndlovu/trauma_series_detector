import React from 'react';

import logo from '../../cblogo.PNG';
import styles from './Header.module.css';

const Header = () => {
	return (
		<header className={styles.Header}>
			<h1 className={styles.appName}>Trauma Series Detector</h1>
			<img src={logo} alt="TSD" className={styles.appLogo} />
		</header>
	);
};

export default Header;
