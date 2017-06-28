import React from 'react';
import glamorous from 'glamorous';
import { css } from 'glamor';

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
	},
	props => (
		{  
			height: `${props.height}px`,
	     	width: `${props.width}px`,
	     	borderRadius: `${props.radius}px`,
	     	backgroundColor: `rgba(10,172,142,${props.alpha})`
	    }
    )
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

const skRotate = css.keyframes(
	{
		'100%': { transform: `rotate(360deg)` }
	}
);

const skBounce = css.keyframes(
	{
		'0%': { transform: `scale(0.0)` },
		'100%': { transform: `scale(0.0)` },
		'50%': { transform: `scale(1.0)`}
	}
);

const SpinnerStyle = glamorous.div(
	{
		width: '40px',
		height: '40px',
		position: 'relative',
		textAlign: 'center',
		animation: `${skRotate} 2.0s infinite linear`
	},
	props => (
		props.loading
  			? { opacity: props.alpha }
  			: { display: "none" }
	)
);

const Dot1Style = glamorous.div(
	{
		width: '60%',
		height: '60%',
		display: 'inline-block',
		position: 'absolute',
		top: '0',
		backgroundColor: '#fafafa',
		borderRadius: '100%',
		animation: `${skBounce} 2.0s infinite ease-in-out`
	}
);

const Dot2Style = glamorous(Dot1Style)(
	{
		top: 'auto',
		bottom: '0',
		animationDelay: '-1.0s'
	}
);

export const SpinnerContainer = (props) => {
	return (
		<SpinnerStyle {...props}>
	        <Dot1Style />
	        <Dot2Style />
	    </SpinnerStyle>
    );
}




