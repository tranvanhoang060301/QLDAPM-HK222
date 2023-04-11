import Header from '../../components/header';
import Nav1 from '../../components/nav';
import './base.css';
import { TodoWrapper } from '../../components/wheel/TodoWrapper';

function Search() {
    return (
        <div>
            <Header />
            <Nav1 />
            <div className='wheel'>
                <div className='wheel_around'>
                    

                </div>
                <div className='wheel_around'>
                    <TodoWrapper  />

                </div>
            </div>
        </div>
    );
}

export default Search;