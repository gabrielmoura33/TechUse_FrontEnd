import React from 'react';
import animationData from '../../lotties/4914-cart-checkout-fast.json';

import { Lottie, Container } from './styles';

function CartAnimation({ visible }) {
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Container visible={visible}>
      <Lottie
        isPaused={!visible}
        options={defaultOptions}
        height={400}
        width={400}
      />
    </Container>
  );
}

export default CartAnimation;
