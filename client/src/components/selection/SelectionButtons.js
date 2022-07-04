import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { common } from '@material-ui/core/colors';

import styles from './SelectionButtons.module.css';

const useStyles = makeStyles(theme => ({
	clearButton: {
		width: '10rem',
		height: '10rem',
		borderRadius: '15px',
		padding: '15px 22px',
		color: '#000000a6',
		fontSize: '17px',
		fontWeight: 900,
	},
}));

const ColorButton = withStyles(theme => ({
	root: {
		color: theme.palette.getContrastText(common.white),
		backgroundColor: common.white,
		'&:hover': {
			backgroundColor: '#ffffff7a',
		},
	},
}))(Button);

const SelectionButtons = ({ setSelection, toggle, toggleForm }) => {
	const classes = useStyles();

	const selectionMade = selection => {
		setSelection(selection);
		toggle(false);
		toggleForm(true);
	};

	return (
		<section className={styles.SelectionButtons}>
			<h1>Select Area of Interest</h1>
			<div>
				<div>
					<ColorButton
						variant="contained"
						className={classes.clearButton}
						color="primary"
						component="span"
						size="large"
						onClick={() => selectionMade('chest')}
					>
						Chest
					</ColorButton>
				</div>
				<div>
					<ColorButton
						variant="contained"
						className={classes.clearButton}
						color="primary"
						component="span"
						size="large"
						onClick={() => selectionMade('cspine')}
					>
						C-Spine
					</ColorButton>
				</div>
				<div>
					<ColorButton
						variant="contained"
						className={classes.clearButton}
						color="primary"
						component="span"
						size="large"
						onClick={() => selectionMade('pelvis')}
					>
						Pelvis
					</ColorButton>
				</div>
				{/* <div>
					<ColorButton
						variant="contained"
						className={classes.clearButton}
						color="primary"
						component="span"
						size="large"
						onClick={() => selectionMade('pneumothorax')}
					>
						Pneumothorax
					</ColorButton>
				</div> */}
			</div>
		</section>
	);
};

export default SelectionButtons;
