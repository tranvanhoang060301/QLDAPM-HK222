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
  const [dishList, setDishList] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [winner, setWinner] = useState(null);

  const handleWheelFinished = (winner) => {
    setWinner(winner);
  };

  const updateOptionList = (id) => {
    setDishList(dishList.filter((dishes) => dishes.id !== id));
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
        const mergedDishArray = updatedIdList.map((item, index) => {
          return { "id" : item, "name": updatedOptionList[index] };
        });
        setOptionList(updatedOptionList);
        setDishList(mergedDishArray);
      })
      .catch((err) => console.log(err));
      setWinner(null);
  }, [active]);

  useEffect(() => {
    let URI = "";
    if (active === "dish") {
      if (winner === null) {
        URI = "https://bk-suggest.vercel.app/restaurant";
      } else {
        URI = `https://bk-suggest.vercel.app/restaurant/findbydish/${winner}`;
      }
    } else if (active === "beverage") {
      if (winner === null) {
        URI = "https://bk-suggest.vercel.app/stall";
      } else {
        URI = `https://bk-suggest.vercel.app/stall/findbybeverage/${winner}`;
      }
    } else if (active === "whatever") {
        URI = "https://bk-suggest.vercel.app/restaurant";
      
        axios
          .get("https://bk-suggest.vercel.app/stall")
          .then((res) => {
            setRestaurantList((prevList) => [...prevList, ...res.data]);
          })
          .catch((err) => console.log(err));
    }
    axios
      .get(URI)
      .then((res) => {
        setRestaurantList(res.data);
      })
      .catch((err) => console.log(err));
  }, [winner, active]);
  // console.log(winner);
  console.log(restaurantList);
  console.log(dishList);
  console.log(optionList);
  return (
    <div>
      <Header />
      <Nav1 active={active} />
      {active !== "favoritePlace" && (
        <div className="wheel">
          <div className="wheel_around">
            {dishList.length > 0 ? (
              <div className="wheel_around1 pt-5">
                <Wheel
                  optionList={dishList}
                  onFinished={handleWheelFinished}
                />
              </div>
            ) : (
              <>
                <h2 className="mt-5 text-white">Bạn xem các địa điểm gợi ý bên dưới nhé!</h2>
              </>
            )}
          </div>
          <div className="wheel_around">
            <TodoWrapper active={active} optionList={dishList} onOptionItemChange={updateOptionList}/>
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
