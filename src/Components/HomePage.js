import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "./Header";
import Moment from "react-moment";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const userData = useSelector((state) => state.currentUser);
  const [alluser, setAlluser] = useState([]);
  const [searchword, setSearchword] = useState("");

  const onGetData = async () => {
    try {
      const url = "https://otif-server-dot-otif-mx.uc.r.appspot.com/access";

      await axios.get(url).then((res) => {
        console.log(res);
        setAlluser(res.data);
      });

      //   console.log(getData);
    } catch (error) {
      console.log(error.message);
    }
  };
  const filtered = alluser.filter((datas) => {
    return datas.username.toLowerCase().includes(searchword.toLowerCase());
  });
  useEffect(() => {
    onGetData();
  }, []);

  return (
    <Container>
      <Header />
      <Wrapper>
        <Top>Welcome {userData ? <span>{userData.username}</span> : null}</Top>
        <input
          onChange={(e) => setSearchword(e.target.value)}
          placeholder="Search users"
        />
        <CardHold>
          {filtered?.map((props) => (
            <Card>
              <Name>
                <NameHold>
                  <FirstName>{props.first_name}</FirstName>
                  <LastName>{props.last_name}</LastName>
                </NameHold>
                <Points>Points: {props.otif_points_balance}</Points>
              </Name>
              <Holder>
                <UsernameHold>
                  username
                  <Username>{props.username}</Username>
                </UsernameHold>
                <EmailHold>
                  email
                  <Username>{props.email}</Username>
                </EmailHold>
              </Holder>
              <Holder>
                <PhoneNumberHold>
                  Phone No.
                  <Phone>{props.phone_num}</Phone>
                </PhoneNumberHold>
                <BirthDayHold>
                  Birthday
                  <Moment format="YYYY-MM-DD" style={{ fontWeight: "500" }}>
                    <Username>{props.birthday}</Username>
                  </Moment>
                </BirthDayHold>
              </Holder>
            </Card>
          ))}
        </CardHold>
      </Wrapper>
    </Container>
  );
};

export default HomeScreen;

const NameHold = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const Points = styled.div`
  font-size: 15px;
  margin-left: 50px;
  margin-top: 30px;

  @media (max-width: 430px) {
    margin: 10px 0;
  }
`;
const Top = styled.div`
  color: white;
  margin-top: 50px;
  font-size: 25px;
  font-weight: 500;
`;

const CardHold = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const BirthDayHold = styled.div`
  margin-top: 40px;
  display: flex;
  font-size: 15px;
  font-weight: 400;
  justify-content: center;
  flex-direction: column;
  margin-left: 60px;

  @media (max-width: 430px) {
    margin: 0;
    margin-top: 15px;
  }
`;

const Phone = styled.div`
  font-weight: 500;
  font-size: 18px;
`;

const PhoneNumberHold = styled.div`
  margin-top: 40px;
  display: flex;
  font-size: 15px;
  font-weight: 400;
  justify-content: center;
  flex-direction: column;
`;

const Holder = styled.div`
  width: 85%;
  display: flex;

  @media (max-width: 430px) {
    flex-direction: column;
  }
`;

const UsernameHold = styled.div`
  margin-top: 40px;
  display: flex;
  font-size: 15px;
  font-weight: 400;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 430px) {
    margin-top: 15px;
  }
`;

const EmailHold = styled.div`
  margin-top: 40px;
  display: flex;
  font-size: 15px;
  font-weight: 400;
  justify-content: center;
  flex-direction: column;
  margin-left: 80px;

  @media (max-width: 430px) {
    margin: 0;
    margin-top: 15px;
  }
`;

const Username = styled.div`
  font-weight: 500;
  font-size: 18px;
`;

const LastName = styled.div`
  font-size: 25px;
  font-weight: 600;
  margin: 0 10px;
  color: #26cd4d;
`;
const FirstName = styled.div`
  font-size: 25px;
  font-weight: 600;
  color: #26cd4d;
`;
const Name = styled.div`
  display: flex;
  width: 85%;
  align-items: center;

  @media (max-width: 430px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  height: 300px;
  width: 35%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #272b33;
  color: white;
  margin-right: 15px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 500px) {
    height: 400px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  flex-direction: column;

  input {
    margin: 30px 0;
    background-color: #0a0c10;
    border: 1px solid #272b33;
    border-radius: 5px;
    color: white;
    height: 35px;
    width: 350px;
    padding-left: 5px;
    outline: none;

    :focus {
      border: 1px solid #2a91ff;
    }
    @media (max-width: 768px) {
      width: 80%;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #0a0c10;
  height: 100%;
  min-height: 100vh;
`;
