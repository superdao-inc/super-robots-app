import { useRef } from 'react';
import { nanoid } from 'nanoid';
import { toast } from './toast';

export function useDismissibleToast(label: string) {
	const id = useRef<string>(nanoid());

	const show = () => {
		toast(label, { id: id.current });
	};
	const hide = () => {
		toast.dismiss(id.current);
	};

	return { show, hide };
}
