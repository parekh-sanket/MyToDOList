import React from 'react';
import { Link } from 'react-router-dom'
import { useAuthContext } from '../Auth';

const Header = () => {
    const { authState , dispatch } = useAuthContext()

    return <>
        <header className="row pt-2 mb-4 border-bottom">
            <div className="col-md-4">
                <Link to="/" className="text-dark text-decoration-none">
                    <span className="fs-3 header">To Do List</span>
                </Link>
            </div>

            {authState.isAuth ?
                (<button className="col-md-2 mt-1 mb-2 ms-auto btn btn-outline-danger" type="button"
                    onClick={()=>{
                        dispatch({
                            "type":"LOGOUT"
                        })
                    }}
                >
                    Log Out
                </button>) : 
                (<div className="col-md-2 ms-auto pt-1 pb-2">
                    <Link to="/login">
                        <button className="btn btn-primary btn-login text-uppercase fw-bold button" type="button">
                            Log In
                        </button>
                    </Link>{" "}
                    &nbsp;
                    <Link to="/signup">
                        <button className="btn btn-primary btn-login text-uppercase fw-bold button" type="button">
                            Sign Up
                        </button>
                    </Link>
                </div>)}


        </header>
    </>;
};

export default Header;
