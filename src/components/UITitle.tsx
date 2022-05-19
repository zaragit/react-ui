import styled from '@emotion/styled';

export interface Props {
  title: string;
}

function UITitle({ title }: Props) {
  return <Title>{title}</Title>;
}

export default UITitle;

const Title = styled.h1`
  font-size: 4rem;
  letter-spacing: 0.5rem;
`;
