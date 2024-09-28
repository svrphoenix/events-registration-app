'use client';

import { Button } from '@nextui-org/react';
import { FC } from 'react';

export interface ILoadMoreProps {
  enabled?: boolean;
  handleClick: () => void;
}
const LoadMore: FC<ILoadMoreProps> = ({ enabled, handleClick }) => {
  return (
    <Button isDisabled={!enabled} onPress={handleClick}>
      Load more
    </Button>
  );
};

export default LoadMore;
