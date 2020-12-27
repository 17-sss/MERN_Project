import React from 'react';
import styled, { css } from 'styled-components';
import { getSize } from '../../lib/utility/customFunc';
import { faListAlt, faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CommonTableMultiWrapper as MemberPageNameWrapper } from '../common/CommonTableComponents';
import { CustomLink } from '../common/StyleUtilModels';

// 1. Wrapper
// 1) MemberWrapper: 메인 Wrapper
const MemberWrapper = styled.div`
    width: ${getSize(1.35)};
    margin: 0 auto;
    padding-bottom: 80px;
`;

// 2) MemberMultiWrapper: 서브 Wrapper
const MemberMultiWrapper = styled.div`
    width: ${getSize(2)};
    margin: 0 auto;

    ${(props) =>
        props.stype === 'myinfo'
            ? css`
                  overflow: hidden;
                  padding: 30px 0px;
                  margin: 30px auto;
                  border: 1px solid #dedede;
                  background: #fff;

                  .myinfo_flLeft {
                      float: left;
                      width: 370px;
                      padding: 10px 0 0 30px;

                      h2 {
                          font-size: 40px;
                          font-family: '맑은 고딕', sans-serif;
                          letter-spacing: -3px;
                      }
                      span {
                          color: #888;
                      }
                  }

                  ul.myinfo_flRight {
                      float: right;
                      width: 470px;

                      li {
                          float: left;
                          margin: 5px 0;
                          padding: 0 45px;
                          width: 100%;
                          height: 20px;
                          font-size: 14px;
                          line-height: 1.6;
                          vertical-align: top;
                          box-sizing: border-box;

                          strong.title {
                              float: left;
                              width: 40%;
                              font-weight: normal;
                              box-sizing: border-box;
                          }

                          strong.data {
                              float: left;
                              width: 47%;
                              padding: 0 10px;
                              text-align: right;
                              box-sizing: border-box;
                          }
                      }
                  }
              `
            : props.stype === 'menu' &&
              css`
                  padding: 30px 0;
                  ul {
                      li {
                          ${CustomLink} {
                              display: block;
                              padding: 30px 0;
                              border: 1px solid #e9e9e9;
                              color: #4d4c4c;

                              &:hover {
                                  border: 1px solid #c9c9c9;
                              }

                              span {
                                  margin-left: 10px;
                                  position: relative;
                                  top: -13px;
                              }
                              span.bold {
                                  font-size: 15pt;
                                  font-weight: bold;
                              }
                          }
                          margin-bottom: 20px;
                      }
                  }
              `};
`;

const MemberTemplate = () => {
    return (
        <MemberWrapper>
            <MemberMultiWrapper>
                <MemberPageNameWrapper
                    style={{ margin: '50px 0 20px' }}
                    stype="pagename"
                >
                    <p id="pageType">마이페이지</p>
                </MemberPageNameWrapper>
            </MemberMultiWrapper>

            <MemberMultiWrapper stype="myinfo">
                <div className="myinfo_flLeft">
                    <h2>
                        MY <span>PAGE</span>
                    </h2>
                </div>
                <ul className="myinfo_flRight">
                    <li>
                        <strong class="title">총주문</strong>
                        <strong class="data">
                            <span>10,800원 (1회)</span>
                        </strong>
                    </li>
                    <li>
                        <strong class="title">총적립금</strong>
                        <strong class="data">
                            <span>1,080원</span>
                        </strong>
                    </li>
                </ul>
            </MemberMultiWrapper>

            <MemberMultiWrapper stype="menu">
                <ul>
                    <li>
                        <CustomLink to="/">
                            <FontAwesomeIcon
                                icon={faListAlt}
                                size="4x"
                                style={{ marginLeft: '10px' }}
                            />
                            <span className="bold">Order</span>
                            <span>주문내역 조회</span>
                            <span>고객님께서 주문하신 상품의 주문내역을 확인하실 수 있습니다.</span>
                        </CustomLink>
                    </li>
                    <li>
                        <CustomLink to="/">
                            <FontAwesomeIcon
                                icon={faAddressCard}
                                size="4x"
                                style={{ marginLeft: '10px' }}
                            />
                            <span className="bold">Profile</span>
                            <span>회원 정보</span>
                            <span>고객님의 개인정보를 관리하는 공간입니다.</span>
                        </CustomLink>
                    </li>
                </ul>
            </MemberMultiWrapper>
        </MemberWrapper>
    );
};

export default MemberTemplate;
