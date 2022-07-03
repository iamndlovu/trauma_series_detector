import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import React from 'react';
import Header from './components/header/Header';
import { Grid } from '@material-ui/core';
import bgImage from './bg.png';
import PatientDetailsForm from './components/form/PatientDetailsForm';
import ImageCard from './components/card/ImageCard';
import SelectionButtons from './components/selection/SelectionButtons';
const axios = require('axios').default;

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
	mainContainer: {
		backgroundImage: `url(${bgImage})`,
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		flexBasis: '89vh',
		flexGrow: 1,
		margin: '0',
		paddingBottom: '3rem',
	},
	imageCard: {
		margin: 'auto',
		maxWidth: 400,
		height: 500,
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
		fontSize: '22px',
		backgroundColor: 'transparent !important',
		borderColor: 'transparent !important',
		color: '#000000a6 !important',
		fontWeight: 'bolder',
		padding: '1px 24px 1px 16px',
	},
	tableCell1: {
		fontSize: '14px',
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
export const ImageUpload = () => {
	const classes = useStyles();
	const [selectedFile, setSelectedFile] = useState();
	const [preview, setPreview] = useState();
	const [data, setData] = useState();
	const [image, setImage] = useState(false);
	const [isLoading, setIsloading] = useState(false);
	const [patientFirstName, setPatientFirstName] = useState('');
	const [patientLastName, setPatientLastName] = useState('');
	const [hospitalNumber, sethospitalNumber] = useState('');
	const [patientID, setPatientID] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [referringClinician, setreferringClinician] = useState('');
	const [showForm, setShowForm] = useState(false);
	const [showSelection, setShowSelection] = useState(true);
	const [selection, setSelection] = useState(null);

	let confidence = 0;

	const onChangeFirstName = e => setPatientFirstName(e.target.value);
	const onChangeLastName = e => setPatientLastName(e.target.value);
	const onChangeHospitalNumber = e => sethospitalNumber(e.target.value);
	const onChangeClinician = e => setreferringClinician(e.target.value);
	const onChangePatientID = e => setPatientID(e.target.value);
	const onChangeDateOfBirth = e => setDateOfBirth(e.target.value);

	const submitForm = e => {
		e.preventDefault();
		setShowForm(false);
	};

	const sendFile = async () => {
		if (image) {
			let formData = new FormData();
			formData.append('file', selectedFile);
			let res = await axios({
				method: 'post',
				url: `${process.env.REACT_APP_API_URL}/${selection}`,
				data: formData,
			});
			if (res.status === 200) {
				setData(res.data);
			}
			setIsloading(false);
		}
	};

	const clearData = () => {
		setData(null);
		setImage(false);
		setSelectedFile(null);
		setPreview(null);
		setShowForm(false);
		setSelection(null);
		setShowSelection(true);
	};

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}
		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);
	}, [selectedFile]);

	useEffect(() => {
		if (!preview) {
			return;
		}
		setIsloading(true);
		sendFile();
		// eslint-disable-next-line
	}, [preview]);

	const onSelectFile = files => {
		if (!files || files.length === 0) {
			setSelectedFile(undefined);
			setImage(false);
			setData(undefined);
			return;
		}
		setSelectedFile(files[0]);
		setData(undefined);
		setImage(true);
	};

	if (data) {
		confidence = (parseFloat(data.confidence) * 100).toFixed(2);
	}

	if (image && isLoading) {
		sendFile().then(() => setIsloading(false));
	}

	return (
		<React.Fragment>
			<Header />
			<Container
				maxWidth={false}
				className={classes.mainContainer}
				disableGutters={true}
				style={{ position: 'relative' }}
			>
				<Grid
					className={classes.gridContainer}
					container
					direction="row"
					justifyContent="center"
					alignItems="center"
					spacing={2}
				>
					{(showSelection && (
						<SelectionButtons
							setSelection={setSelection}
							toggle={setShowSelection}
							toggleForm={setShowForm}
						/>
					)) ||
						(showForm ? (
							<PatientDetailsForm
								formData={{
									patientFirstName,
									patientLastName,
									hospitalNumber,
									patientID,
									referringClinician,
									dateOfBirth,
								}}
								formControls={{
									onChangeFirstName,
									onChangeLastName,
									onChangeHospitalNumber,
									onChangeClinician,
									onChangePatientID,
									onChangeDateOfBirth,
									submitForm,
								}}
							/>
						) : (
							<ImageCard
								isLoading={isLoading}
								image={image}
								preview={preview}
								onSelectFile={onSelectFile}
								data={data}
								confidence={confidence}
								clearData={clearData}
								formData={{
									patientFirstName,
									patientLastName,
									hospitalNumber,
									patientID,
									dateOfBirth,
									referringClinician,
								}}
							/>
						))}
				</Grid>
			</Container>
		</React.Fragment>
	);
};
