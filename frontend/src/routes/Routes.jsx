import { createBrowserRouter } from "react-router";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/common/Dashboard";
import Profile from "../pages/common/Profile";
import UserApproval from "../pages/settings/user-approval/UserApproval";
import ChangeUserDetails from "../pages/settings/change-user-details/ChangeUserDetails";
import AddData from "../pages/add-data/AddData";
import ViewData from "../pages/view-data/ViewData";
import CreateDataset from "../pages/experimental-data/create-dataset/CreateDataset";
import ManageDatasets from "../pages/experimental-data/manage-datasets/ManageDatasets";
import ExploreDatasets from "../pages/experimental-data/explore-datasets/ExploreDatasets";
import EditDataset from "../pages/experimental-data/edit-dataset/EditDataset";
import About from "../pages/about/About";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "/add-data",
                element: <AddData />
            },
            {
                path: "/view-data",
                element: <ViewData />
            },
            {
                path: "/dataset/create",
                element: <CreateDataset />
            },
            {
                path: "/dataset/manage",
                element: <ManageDatasets />
            },
            {
                path: "/dataset/explore",
                element: <ExploreDatasets />
            },
            {
                path: "/dataset/edit/:id",
                element: <EditDataset />
            },










            {
                path: "/about",
                element: <About />
            },
            {
                path: "/user-approval",
                element: <UserApproval />
            },
            {
                path: "/change-user-details",
                element: <ChangeUserDetails />
            },
            {
                path: "/profile",
                element: <Profile />
            }

        ]
    },
]);

export default router;