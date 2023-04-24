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
  const [idList, setIdList] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [winner, setWinner] = useState(null);

  const handleWheelFinished = (winner) => {
    setWinner(winner);
  };

  useEffect(() => {
    setActive(location.state.active);
  }, [location]);

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
        const updatedIdList = res.data.map((option) => option.id);
        const mergedArray = updatedOptionList.map((item, index) => {
          return { [item]: updatedIdList[index] };
        });
        setOptionList(updatedOptionList);
        setIdList(mergedArray);
      })
      .catch((err) => console.log(err));
  }, [active]);

  useEffect(() => {
    let URI = "";
    if (active === "dish") {
      if (winner === null) {
        URI = "https://bk-suggest.vercel.app/restaurant";
      } else {
        URI = `https://bk-suggest.vercel.app/restaurant/findbydish/:${winner}`;
      }
    } else if (active === "beverage") {
      if (winner === null) {
        URI = "https://bk-suggest.vercel.app/stall";
      } else {
        URI = `https://bk-suggest.vercel.app/stall/findbybeverage/${winner}`;
      }
    }
    axios
      .get(URI)
      .then((res) => {
        setRestaurantList(res.data);
      })
      .catch((err) => console.log(err));
  }, [winner, active]);
  console.log(restaurantList);
  return (
    <div>
      <Header />
      <Nav1 active={active} />
      {active !== "favoritePlace" && (
        <div className="wheel">
          <div className="wheel_around">
            {optionList.length > 0 ? (
              <div className="wheel_around1 pt-5">
                <Wheel
                  optionList={optionList}
                  idList={idList}
                  onFinished={handleWheelFinished}
                />
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
      <Row className="d-flex justify-content-evenly flex-wrap m-5 px-5">
        {active !== "favoritePlace" && (
          <h1 className="text-black mb-4">ĐỊA ĐIỂM GỢI Ý</h1>
        )}
        {restaurantList.map((props) => (
          <FavoriteCard info={props} key={props.id}></FavoriteCard>
        ))}
      </Row>
    </div>
  );
}

export default Search;
