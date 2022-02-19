import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: 1rem;
  justify-content: space-between;
  height: 98vh;
  margin-top: 0.5rem;
  ul {
    display: flex;
    flex-direction: column;
    a {
      display: flex;
      text-decoration: none;
      color: #000;
      font-size: 1.4rem;
      font-weight: 400;
      margin: 0.5rem 0;
      border-radius: 50px;
      padding: 0.5rem;

      &:hover {
        background-color: #eee;
      }
    }
  }
`;

export const LogoImg = styled.span`
  a {
    background: none;
    border-radius: 50px;
    display: flex;
    width: 3rem;
    justify-content: center;
    align-items: center;
    height: 3rem;
    margin-left: 40px;
    &:hover {
      background: #f7d4d4;
    }
  }
`;

export const ImageLogo = styled.img`
  height: 1.5rem;
  z-index: 10;
`;

export const ButtonTweet = styled.button`
  border: none;
  background-color: #00acee;
  color: #fff;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 1rem 2rem;
  max-width: 250px;
  margin: 0.5rem 0;

  &:hover {
    background-color: #008abe;
  }
`;

export const Icon = styled.span`
  font-size: 1.6rem;
  margin-right: 1rem;
`;

export const UserCard = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 50px;
  align-items: center;
  padding: 0.8rem;
  justify-content: space-between;
  cursor: pointer;
  margin-left: 30px;
  &:hover {
    background-color: #dedede;
  }
`;

export const ImagenPerfil = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 9999px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
    padding: 0;
  }
  p {
    color: #717a7a;
    font-size: 1rem;
    margin: 0;
    padding: 0;
  }
`;

export const ModalWrapper = styled.div`
  display: flex;
  opacity: ${(props) => (props.modalState ? "1" : "0")};
  transition: all ease-in-out 2s;
  transition-delay: 1s;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  min-height: 180px;
  width: 280px;
  max-height: 260px;
  border-radius: 18px;
  padding: 12px 0;
  position: absolute;
  bottom: 6rem;
  box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px,
    rgb(101 119 134 / 15%) 0px 0px 3px 1px;
`;

export const UserCardOnModal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  justify-content: space-between;

  span {
    color: #ee6262;
    font-size: 1.5rem;
  }
`;

export const CerrarSesion = styled.div`
  cursor: pointer;
  padding: 16px;
  font-size: 1rem;
`;
