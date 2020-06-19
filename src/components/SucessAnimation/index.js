import React from 'react';
import animationData from '../../lotties/7471-personal-phone-night.json';

import { Lottie, Container } from './styles';

function CartAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Container>
      <Lottie options={defaultOptions} height={400} width={400} />
    </Container>
  );
}

export default CartAnimation;
