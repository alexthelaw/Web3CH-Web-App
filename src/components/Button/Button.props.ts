import {DetailedHTMLProps, HTMLAttributes, ReactNode} from 'react';

export interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	view?: 'red' | 'transparent' | 'white';
	size?: 'xs' | 's' | 'l' | 'auto';
	disabled?: true | false;
	children: ReactNode;
}
