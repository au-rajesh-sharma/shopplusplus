import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
    //bring in userInfo from state
    const {userInfo} = useSelector(state => state.auth)

    //if userInfo exists and its admin user, return outlet, otherwise navigate to login
    //when navigating to login, replace any past history
    return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to='/login' replace />
}

export default AdminRoutes;