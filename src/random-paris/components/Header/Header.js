import styles from './Header.module.scss';

import React from 'react';
import PropTypes from 'prop-types';

const Header = () => {
	return (
		<header className={styles.header}>
			<h1>
				Random
				<br />
				Studio
			</h1>
			<p>
				Our Random family is growing internationally:
				<br /> Design studio Bonsoir Paris becomes Random Paris
			</p>
		</header>
	);
};

Header.propTypes = {};
Header.defaultProps = {};

export default Header;
