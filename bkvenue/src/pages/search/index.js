import { useLocation } from "react-router-dom";
import Header from "../../components/header";
import Nav1 from "../../components/nav";
import "./base.css";
import Wheel from "../../components/wheel/wheel";
import { TodoWrapper } from "../../components/wheel/TodoWrapper";
import { useEffect, useState } from "react";

const foodArr = ["Hủ tiếu", "Cháo lòng", "Bún riêu", "Bún bò"];

const beverageArr = ["Phúc Long", "Highland", "Circle K", "Starbuck"];

function Search() {
  const location = useLocation();
  const [active, setActive] = useState(location.state.active);
  const [optionList, setOptionList] = useState(foodArr);

  useEffect(() => {
    // Call API to get option

    setOptionList(foodArr);
  }, []);

  useEffect(() => {
    setActive(location.state.active);
  }, [location]);

  return (
    <div>
      <Header />
      <Nav1 active={active} />
      <div className="wheel">
        <div className="wheel_around">
          <div className="wheel_around1">
            <Wheel option={optionList}/>
          </div>
        </div>
        <div className="wheel_around">
          <TodoWrapper />
        </div>
      </div>
    </div>
  );
}

export default Search;
