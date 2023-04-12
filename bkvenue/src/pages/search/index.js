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
                    <div className='wheel_around1'>
                        <div className='wheel_around-haft'>
                            <div className='wheel_around-haft1'>
                                <div className='wheel_around-haft11'>
                                    <h3>Bún bò</h3>
                                </div>
                                <div className='wheel_around-haft12'>
                                    <h3>Hủ tiếu</h3>
                                </div>
                            </div>

                            <div className='wheel_around-haft1'>
                                <div className='wheel_around-haft13'>
                                    <h3>Cháo lòng</h3>
                                </div>
                                <div className='wheel_around-haft14'>
                                    <h3>Bún riêu</h3>
                                </div>
                            </div>

                        </div>
                        <div className='wheel_around-click'>
                            <button type="button" class="btn btn-warning btn-size1"><h2>Start</h2></button>
                            <button type="button" class="btn btn-success btn-size1"><h2>Stop</h2></button>
                        </div>
                    </div>
                    
                </div>
                <div className='wheel_around'>
                    <TodoWrapper  />

                </div>
            </div>
        </div>
    );
}

export default Search;