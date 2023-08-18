import DatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { Body } from 'src/components/text';
import { IconButton } from 'src/components/button';
import { ChevronIcon } from 'src/components/assets/icons';

type Props = {
	selected: Date;
	onChange: (date: Date) => void;
	minDate?: Date;
};

export const CustomDatepicker = ({ selected, onChange, minDate }: Props) => {
	return (
		<DatePicker
			calendarStartDay={1}
			inline
			selected={selected}
			onChange={onChange}
			minDate={minDate}
			renderCustomHeader={CustomDatepickerHeader}
		/>
	);
};

const CustomDatepickerHeader = (props: ReactDatePickerCustomHeaderProps) => {
	const { date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled } = props;

	return (
		<div>
			<div className="bg-overlaySecondary flex w-max items-center gap-3 rounded-lg py-2 px-3">
				<IconButton
					color="transparent"
					size="md"
					onClick={decreaseMonth}
					disabled={prevMonthButtonDisabled}
					icon={<ChevronIcon className="rotate-180" />}
					data-testid={'DatePicker__prevMonthButton'}
				/>
				<Body data-testid={'DatePicker__selectedMonth'}>
					{date.toLocaleString('en', { month: 'long' })} {date.getFullYear()}
				</Body>
				<IconButton
					color="transparent"
					size="md"
					onClick={increaseMonth}
					disabled={nextMonthButtonDisabled}
					icon={<ChevronIcon />}
					data-testid={'DatePicker__nextMonthButton'}
				/>
			</div>
		</div>
	);
};
