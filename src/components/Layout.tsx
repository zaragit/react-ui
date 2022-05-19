import styled from '@emotion/styled';

export interface Props {
  children?: React.ReactNode;
}

function Layout({ children }: Props) {
  return <Container>{children}</Container>;
}

export default Layout;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
