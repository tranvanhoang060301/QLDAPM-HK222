import { useLocation } from "react-router-dom";
import Header from "../../components/header";
import Nav1 from "../../components/nav";
import "./base.css";
import Wheel from "../../components/wheel/wheel";
import { TodoWrapper } from "../../components/wheel/TodoWrapper";
import FavoriteCard from "../../components/favoriteCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";

function Search() {
  const location = useLocation();
  const [active, setActive] = useState(location.state.active);
  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    let URI = `https://bk-suggest.vercel.app/${active}`;
    if (active === "whatever") {
      // URI get all food and beverage
      URI = `https://bk-suggest.vercel.app/dish`;
    }
    // Call API to get option
    axios
      .get(URI)
      .then((res) => {
        const updatedOptionList = res.data.map((option) => option.name);
        setOptionList(updatedOptionList);
      })
      .catch((err) => console.log(err));
  }, [active]);

  console.log(optionList)
  useEffect(() => {
    setActive(location.state.active);
  }, [location]);

  return (
    <div>
      <Header />
      <Nav1 active={active} />
      {active !== "favoritePlace" && (
        <div className="wheel">
          <div className="wheel_around">
            {optionList.length > 0 ? (
              <div className="wheel_around1">
                <Wheel optionList={optionList} />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="wheel_around">
            <TodoWrapper active={active} optionList={optionList} />
          </div>
        </div>
      )}
      <Row className="d-flex justify-content-around flex-wrap m-5 px-5">
        {active !== "favoritePlace" && (
          <h1 className="text-black mb-4">ĐỊA ĐIỂM GỢI Ý</h1>
        )}
        <FavoriteCard
          name="Bún bò Quán"
          address="113, Tân Bình, TPHCM"
          openingHours="7h-19h"
          dish="Bún bò"
          price="45-55k"
        />
        <FavoriteCard
          name="Bún bò Quán"
          address="113, Tân Bình, TPHCM"
          openingHours="7h-19h"
          dish="Bún bò"
          price="45-55k"
        />
        <FavoriteCard
          name="Bún bò Quán"
          address="113, Tân Bình, TPHCM"
          openingHours="7h-19h"
          dish="Bún bò"
          price="45-55k"
        />
      </Row>
    </div>
  );
}

export default Search;
