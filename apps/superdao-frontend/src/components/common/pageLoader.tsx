import styled from '@emotion/styled';
import { Loader } from './loader';

export const PageLoader = () => {
	return (
		<Wrapper>
			<Loader size="40" />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
	height: 100%;

	flex: 1;

	display: flex;
	justify-content: center;
	align-items: center;
`;
