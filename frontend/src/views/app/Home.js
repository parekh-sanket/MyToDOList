import React from 'react';
import Header from '../../components/Header';
import TaskBox from '../../components/Taskbox';
import TaskList from '../../components/Tasklist';

const Home = () => {
    return <>
        <div className="container py-2">
			<Header />
            <div className="row align-items-md-stretch">
                <TaskBox/>
                <TaskList/>
            </div>
        </div>
    </>;
};

export default Home;
