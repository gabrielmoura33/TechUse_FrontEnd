import styled from 'styled-components';
import LottieLib from 'react-lottie';

export const Container = styled.div`
  background: rgba(37, 34, 30, 0.3);
  position: absolute;
  height: 100%;
  width: 100%;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex: 1;
  align-items: center;
`;
export const Lottie = styled(LottieLib)``;
