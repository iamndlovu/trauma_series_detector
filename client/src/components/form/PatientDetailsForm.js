import React from 'react';

import styles from './PatientDetailsForm.module.css';

const PatientDetailsForm = ({ formData, formControls }) => {
	const {
		patientFirstName,
		patientLastName,
		hospitalNumber,
		patientID,
		referringClinician,
		dateOfBirth,
	} = formData;

	const {
		onChangeFirstName,
		onChangeLastName,
		onChangeHospitalNumber,
		onChangeClinician,
		onChangePatientID,
		onChangeDateOfBirth,
		submitForm,
	} = formControls;

	return (
		<form className={styles.Form} onSubmit={submitForm}>
			<div className={styles.formGroup}>
				<label className={styles.offscreen}>Hospital Number</label>
				<input
					type="text"
					required
					placeholder="Hospital Number"
					value={hospitalNumber}
					onChange={onChangeHospitalNumber}
				/>
			</div>
			<div className={styles.formGroup}>
				<label className={styles.offscreen}>Patient First Name</label>
				<input
					type="text"
					required
					placeholder="Patient First Name"
					value={patientFirstName}
					onChange={onChangeFirstName}
				/>
			</div>
			<div className={styles.formGroup}>
				<label className={styles.offscreen}>Patient Last Name(s)</label>
				<input
					type="text"
					required
					placeholder="Patient Last Name(s)"
					value={patientLastName}
					onChange={onChangeLastName}
				/>
			</div>
			<div className={styles.formGroup}>
				<label className={styles.offscreen}>Patient ID</label>
				<input
					type="text"
					required
					placeholder="Patient ID"
					value={patientID}
					onChange={onChangePatientID}
				/>
			</div>
			<div className={styles.formGroup}>
				<label>Patient Date of Birth:</label>
				<input
					type="date"
					required
					placeholder="Patient Date of Birth"
					value={dateOfBirth}
					onChange={onChangeDateOfBirth}
				/>
			</div>
			<div className={styles.formGroup}>
				<label className={styles.offscreen}>Referring Clinician</label>
				<input
					type="text"
					required
					placeholder="Referring Clinician"
					value={referringClinician}
					onChange={onChangeClinician}
				/>
			</div>
			<input type="submit" value="Enter" className={styles.submit} />
		</form>
	);
};

export default PatientDetailsForm;
