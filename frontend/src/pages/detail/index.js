import React from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

//component
import Header from "../../components/header/index";
import Button from "../../components/button/index";

//style
import { Container } from "./style";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const no = searchParams.get("timeline_no");
  const [detail, setDetail] = useState();

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      const res = await axios.get(`/api/timelines/${no}`);
      setDetail(res.data.timelines[0]);
    } catch (err) {
      console.log(err);
    }
  };

  //클립보드에 텍스트 복사하는 함수
  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었습니다.");
    } catch (e) {
      alert("복사에 실패하였습니다");
    }
  };

  return (
    <Container bg={detail?.bid.title}>
      <Header text={"탐라 상세"} link={"/timeline"} />
      <div className="container__title">{detail?.title}</div>
      <div className="img-container">
        {(detail?.contents || []).map((item, index) => {
          return (
            <div
              className="img-wrap"
              style={{ left: item.loc_x, top: item.loc_y }}
            >
              <img src={item.parts} className="img-wrap__sticker" />
              <div className="img-wrap__title">{item.title}</div>
            </div>
          );
        })}
      </div>
      <Button
        text={"링크 복사하기"}
        style={{ marginBottom: "10px" }}
        onClick={() =>
          handleCopyClipBoard(`http://localhost:3000?timeline_no=${no}`)
        }
      />
      <Link to={`/timeline`}>
        <Button text={"목록으로 돌아가기"} style={{ marginBottom: "10px" }} />
      </Link>
    </Container>
  );
};

export default Index;
