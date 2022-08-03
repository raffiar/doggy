interface AlertProps {
	message: string;
}
export const Alert = (props: AlertProps) => {
	const { message } = props;
	return (
		<div className="alert-container">
			<h3>{message}</h3>
		</div>
	);
};
