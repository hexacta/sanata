import glamorous from "glamorous";

export const MainContainer = glamorous.div(
	{
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
		minHeight: '100%'
	}
); 

export const FormContainer = glamorous.div(
	{
		border: '1px solid rgba(10, 172, 142, 1)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		backgroundColor: 'white',
		marginTop: '15px'
	}
);

export const FormInput = glamorous.input(
	{
		flex: '1',
		border: '0',
		backgroundColor: 'transparent',
		height: '85%',
		padding: '2px 2px 2px 2px',
		outline: 'none'
	}
);

export const FormButton = glamorous.button(
	{
		border: '0',
		backgroundColor: 'transparent',
		height: '100%',
		cursor: 'pointer',
		outline: 'none'
	}
);

export const FormSpan = glamorous.span(
	{
		color: 'grey',
		marginLeft: '8px'
	}
);

export const FormWrapper = glamorous.div(
	{
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: 'white'
	}
);


