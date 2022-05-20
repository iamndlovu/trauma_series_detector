import React, { useState, useRef } from 'react';

import FullReportTable from './../report/FullReportTable';
import ReactToPrint from 'react-to-print';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
	Paper,
	CardActionArea,
	CardMedia,
	Grid,
	TableContainer,
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
	Button,
	CircularProgress,
} from '@material-ui/core';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';

const ColorButton = withStyles(theme => ({
	root: {
		color: theme.palette.getContrastText(common.white),
		backgroundColor: common.white,
		'&:hover': {
			backgroundColor: '#ffffff7a',
		},
	},
}))(Button);

const useStyles = makeStyles(theme => ({
	grow: {
		flexGrow: 1,
	},
	clearButton: {
		width: '-webkit-fill-available',
		borderRadius: '15px',
		padding: '15px 22px',
		color: '#000000a6',
		fontSize: '20px',
		fontWeight: 900,
	},
	root: {
		maxWidth: 345,
		flexGrow: 1,
	},
	media: {
		height: 400,
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 500,
	},
	gridContainer: {
		justifyContent: 'center',
		padding: '4em 1em 0 1em',
	},
	imageCard: {
		margin: 'auto',
		maxWidth: 400,
		//		height: 500,
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		boxShadow: '0px 9px 70px 0px rgb(255 255 255 / 30%) !important',
		borderRadius: '15px',
	},
	imageCardEmpty: {
		height: 'auto',
	},
	noImage: {
		margin: 'auto',
		width: 400,
		height: '400 !important',
	},
	input: {
		display: 'none',
	},
	uploadIcon: {
		background: 'white',
	},
	tableContainer: {
		backgroundColor: 'transparent !important',
		boxShadow: 'none !important',
	},
	table: {
		backgroundColor: 'transparent !important',
	},
	tableHead: {
		backgroundColor: 'transparent !important',
	},
	tableRow: {
		backgroundColor: 'transparent !important',
	},
	tableCell: {
		fontSize: '1rem',
		backgroundColor: 'transparent !important',
		borderColor: 'transparent !important',
		color: '#000000a6 !important',
		fontWeight: '400',
		padding: '1px 24px 1px 16px',
	},
	tableCell1: {
		fontSize: '1.3rem',
		backgroundColor: 'transparent !important',
		borderColor: 'transparent !important',
		color: '#000000a6 !important',
		fontWeight: 'bolder',
		padding: '1px 24px 1px 16px',
	},
	tableBody: {
		backgroundColor: 'transparent !important',
	},
	text: {
		color: 'white !important',
		textAlign: 'center',
	},
	buttonGrid: {
		maxWidth: '416px',
		width: '100%',
	},
	detail: {
		backgroundColor: 'white',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
	},
	appbar: {
		background: 'black',
		boxShadow: 'none',
		color: 'white',
		width: '100vw',
	},
	loader: {
		color: 'black !important',
	},
}));

const ImageCard = ({
	image,
	preview,
	onSelectFile,
	data,
	confidence,
	isLoading,
	clearData,
	formData,
}) => {
	const [showReport, setShowReport] = useState(false);

	const toggleReport = () => setShowReport(oldState => !oldState);

	const classes = useStyles();
	return (
		<>
			<Grid item xs={12}>
				{showReport ? (
					<PrintableReport
						formData={formData}
						image={preview}
						data={data}
						confidence={confidence}
					/>
				) : (
					<Card
						className={`${classes.imageCard} ${
							!image ? classes.imageCardEmpty : ''
						}`}
					>
						{image && (
							<CardActionArea>
								<CardMedia
									className={classes.media}
									image={preview}
									component="image"
									title="Contemplative Reptile"
								/>
							</CardActionArea>
						)}
						{!image && (
							<CardContent className={classes.content}>
								<DropzoneAreaBase
									acceptedFiles={['image/*']}
									dropzoneText={
										'Drag and drop an image of your scan to process'
									}
									onDrop={onSelectFile}
									// Max file size = 1GB
									maxFileSize={1073741824}
									// only display error & info alerts
									showAlerts={['error', 'info']}
									// upload only one file
									filesLimit={1}
								/>
							</CardContent>
						)}
						{data && (
							<CardContent className={classes.detail}>
								<TableContainer
									component={Paper}
									className={classes.tableContainer}
								>
									<Table
										className={classes.table}
										size="small"
										aria-label="simple table"
									>
										<TableHead className={classes.tableHead}>
											<TableRow className={classes.tableRow}>
												<TableCell className={classes.tableCell1}>
													Label:
												</TableCell>
												<TableCell align="right" className={classes.tableCell1}>
													Confidence:
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody className={classes.tableBody}>
											<TableRow className={classes.tableRow}>
												<TableCell
													component="th"
													scope="row"
													className={classes.tableCell}
												>
													{data.class}
												</TableCell>
												<TableCell align="right" className={classes.tableCell}>
													{confidence}%
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
							</CardContent>
						)}
						{isLoading && (
							<CardContent className={classes.detail}>
								<CircularProgress
									color="secondary"
									className={classes.loader}
								/>
								<Typography className={classes.title} variant="h6" noWrap>
									Processing
								</Typography>
							</CardContent>
						)}
					</Card>
				)}
			</Grid>
			{data && (
				<Grid item className={classes.buttonGrid}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							flexWrap: 'wrap',
						}}
					>
						{!showReport && (
							<>
								<ColorButton
									variant="contained"
									className={classes.clearButton}
									color="primary"
									component="span"
									size="large"
									onClick={toggleReport}
								>
									Full report
								</ColorButton>
								<br />
								<br />
							</>
						)}
						<ColorButton
							variant="contained"
							className={classes.clearButton}
							color="primary"
							component="span"
							size="large"
							onClick={() => {
								setShowReport(false);
								clearData();
							}}
							startIcon={<Clear fontSize="large" />}
						>
							Clear
						</ColorButton>
					</div>
				</Grid>
			)}
		</>
	);
};

const PrintableReport = ({ formData, image, data, confidence }) => {
	const componentRef = useRef();
	const [hover, setHover] = useState(false);

	const buttonStyles = {
		position: 'absolute',
		top: '5px',

		backgroundColor: '#04080e',
		color: hover ? '#61dafb' : '#ff0000',
		fontSize: '1.1rem',
		minHeight: '3rem',
		minWidth: '7rem',
		borderRadius: '6px',
		padding: '0.375rem 0.75rem',
		margin: 'auto',
		cursor: 'pointer',
		transition: 'all 0.5s ease-in-out',
	};

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<ReactToPrint
				trigger={() => (
					<button
						onMouseEnter={() => setHover(true)}
						onMouseLeave={() => setHover(false)}
						style={buttonStyles}
					>
						PRINT THIS REPORT
					</button>
				)}
				content={() => componentRef.current}
			/>
			<FullReportTable
				formData={formData}
				image={image}
				data={data}
				confidence={confidence}
				ref={componentRef}
			/>
		</div>
	);
};

//.Form .submit:hover {
//	color: #61dafb;
//}

export default ImageCard;
