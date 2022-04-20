import React from 'react';

import styles from './FullReportTable.module.css';

const FullReportTable = React.forwardRef(
	({ formData, image, data, confidence }, ref) => {
		const {
			patientFirstName,
			patientLastName,
			hospitalNumber,
			patientID,
			referringClinician,
			dateOfBirth,
		} = formData;

		return (
			<table ref={ref} className={styles.FullReportTable}>
				<div>
					<thead>
						<tr className={styles.column}>
							<th>First Name:</th>
							<th>Last Name(s):</th>
							<th>Patient ID:</th>
							<th>Date of Birth</th>
							<th>Hospital Number:</th>
							<th>Referring Clinician:</th>
						</tr>
					</thead>
					<tbody>
						<tr className={styles.column}>
							<td>{patientFirstName}</td>
							<td>{patientLastName}</td>
							<td>{patientID}</td>
							<td>{dateOfBirth}</td>
							<td>{hospitalNumber}</td>
							<td>{referringClinician}</td>
						</tr>
					</tbody>
				</div>
				<br />
				<table>
					<tbody>
						<tr className={styles.imageContainer}>
							<td colSpan={2}>
								<img
									src={image}
									alt={`${confidence}% confidence ${data.class} scan`}
								/>
							</td>
						</tr>
						<tr>
							<th>Label:</th>
							<td>{data.class}</td>
						</tr>
						<tr>
							<th>Confidence:</th>
							<td>{confidence}%</td>
						</tr>
					</tbody>
				</table>
			</table>
		);
	}
);

export default FullReportTable;
