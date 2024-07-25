import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
    //bring in userInfo from state
    const {userInfo} = useSelector(state => state.auth)

    //if userInfo exists, return outlet, otherwise navigate to login
    //when navigating to login, replace any past history
    return userInfo ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoutes;