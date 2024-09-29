import { FC } from 'react';

interface TitleProps {
  text: string;
}

const Title: FC<TitleProps> = ({ text }) => {
  return (
    <h1 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight py-5 text-center">
      {text}
    </h1>
  );
};

export default Title;
