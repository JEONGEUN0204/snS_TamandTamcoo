import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
      setDetail({ ...res.data.timelines[0], bg: "sky" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container bg={detail?.bid.title}>
      <Header text={"탐라 완성"} />
      <div className="container__title">{detail?.title}</div>
      <div className="img-wrap">
        {(detail?.contents || []).map((item) => {
          return (
            <img
              src={item.parts}
              className="img-wrap__sticker"
              style={{ left: item.loc_x, top: item.loc_y }}
            />
          );
        })}
      </div>
      <Link to={`/decoration?timeline_no=${no}`}>
        <Button text={"하나 더 추가하기"} style={{ marginBottom: "10px" }} />
      </Link>
    </Container>
  );
};

export default Index;
