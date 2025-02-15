import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import zoomIn from '../../animations/zoomIn';

const S = {
  Wrapper: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    /* background-color: white; */
    z-index: 1000000;
    color: white;
    .modal {
      position: fixed;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 300px; // height는 내용에 맞춰 알아서 늘어나도록. 아이폰 5가 320px이 가로
      /* ${(props) => props.theme.deviceSizes.desktop} {
        width: 30%;
      } */
      background: white;
      border-radius: 6px;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      color: var(--adaptiveGray800);
      animation: ${zoomIn} 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
      & > * {
        & {
          padding: ${(props) => props.theme.paddings.base};
        }
      }
      .modal-title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: ${(props) => props.theme.fontSizes.base};
        margin: 16px 0;
      }
      .modal-contents {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .confirm-button {
        width: 100%;
        background: var(--adaptiveGray900);
        border-radius: 0 0 6px 6px;
        color: white;
        outline: none;
        border: none;
        cursor: pointer;
        margin-top: ${(props) => props.theme.margins.base};
      }
      .link-to-main {
          font-weight: 600;
          color: red;
          font-size: ${(props) => props.theme.fontSizes.base};
      }
    }
  `,
};

const refreshPage = () => {
  window.location.reload();
};

function Modal({
  isCorrect, showModal, setshowModal, title = 'title'
}) {
  return (
    <>
      {showModal && (
        <S.Wrapper>
          <div className="modal">
            <div className="modal-title">{title}</div>
            {isCorrect || (
              <>
                <div className="regame" style={{ color: 'blue', fontWeight: '600' }} onClick={refreshPage}>다시하기</div>
                <Link className="link-to-main" to="/">메인화면으로 돌아가기</Link>
              </>
            )}
          </div>
        </S.Wrapper>
      )}
    </>
  );
}

export default Modal;
