import { useLocation } from "react-router-dom";
import Header from "../../components/header";
import Nav1 from "../../components/nav";
import "./base.css";
import Wheel from "../../components/wheel/wheel";
import { TodoWrapper } from "../../components/wheel/TodoWrapper";
import { useEffect, useState } from "react";
import axios from "axios";

function Search() {
  const location = useLocation();
  const [active, setActive] = useState(location.state.active);
  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    // Call API to get option
    axios
      .get("http://localhost:5000/dish")
      .then((res) => {
        const updatedOptionList = res.data.map((option) => option.name);
        setOptionList(updatedOptionList);
      })
      .catch((err) => console.log(err));
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
          {optionList.length > 0 ? (
            <div className="wheel_around1">
              <Wheel optionList={optionList} />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="wheel_around">
          <TodoWrapper />
        </div>
      </div>
    </div>
  );
}

export default Search;
