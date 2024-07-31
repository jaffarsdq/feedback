import { InsightsSharp, Logout } from "@mui/icons-material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CampaignIcon from "@mui/icons-material/Campaign";
import FeedbackIcon from "@mui/icons-material/Feedback";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import StyleIcon from "@mui/icons-material/Style";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import { Box, Button, Drawer, Typography } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MyComLogo from "../assets/MyComLogo.svg";

// import BottomNavigator from "../Components/BottomNavigator/BottomNavigator";
import NavbarDashboard from "../components/common/NavbarDashboard";
import { logout } from "../Redux/Slices/AuthSlice";

const mainMenus = ["Feedback", "Logout"];

const DashboardSubMenuOptions = {
    Dashboard: [],
    Customers: [],
    Campaigns: ["E-mail Template", "E-mail Campaign"],
    Promotions: [],
    Rewards: [],
    // Reports: [],
    Settings: [],
};

const DashboardSubOptions = ({ selectedMainMenu, subOptions, location }) => {
    // const { module, moduleType } = useSelector((state) => state.navigation);
    // const navigate = useNavigate();

    // // const { permissions } = useSelector((state) => state.auth);

    // // const permissionStatuses = extractPermissions(permissions);

    // useEffect(() => {
    //     if (
    //         moduleType &&
    //         module &&
    //         moduleType == "Reports" &&
    //         module != "Summary"
    //     ) {
    //         navigate(`/Insights/${module}/Reports`);
    //     } else if (module && moduleType != "Reports") {
    //         navigate(`/${module}`);
    //     }
    // }, [module, moduleType]);
    return (
        <Box sx={{ width: "100%" }}>
            {subOptions.map((subOption) => {
                const subRoute = subOption.replace(/\s+/g, "");
                const fullPath = `/${selectedMainMenu}/${subRoute}`;

                return (
                    <Box
                        key={subOption}
                        sx={{ marginLeft: "1rem", paddingLeft: "1rem" }}
                    >
                        <Link
                            style={{
                                textDecoration: "none",
                                opacity:
                                    location.pathname === fullPath ? 0.5 : 1,
                            }}
                            to={fullPath}
                        >
                            <Typography
                                sx={{
                                    width: "fit-content",
                                    cursor: "pointer",
                                    color: "rgba(115, 119, 145, 1)",
                                    "&:hover": {
                                        color: "rgba(115, 119, 145, 0.5)",
                                    },
                                    transition: "all ease 0.3s",
                                    margin: "1rem 0rem",
                                }}
                            >
                                {subOption}
                            </Typography>
                        </Link>
                    </Box>
                );
            })}
        </Box>
    );
};

const MenuOptions = ({
    isSelected,
    menuName,
    isOpen,
    toggleSubMenu,
    location,
    selectedMainMenu,
    setSelectedMainMenu,
}) => {
    const subOptions = DashboardSubMenuOptions[menuName] || [];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getIcon = (menuName) => {
        switch (menuName) {
            case "Dashboard":
                return <InsightsSharp />;
            case "Campaigns":
                return <CampaignIcon />;
            case "Customers":
                return <PeopleIcon />;
            case "Loyalty Ads":
                return <StyleIcon />;
            case "Rewards":
                return <MilitaryTechIcon />;
            case "Reports":
                return <AssessmentIcon />;
            case "Settings":
                return <SettingsIcon />;
            case "Feedback":
                return <FeedbackIcon />;
            case "Logout":
                return <Logout />;
            default:
                return null;
        }
    };

    const handleClick = () => {
        dispatch(setSelectedPage(menuName));
        if (menuName === "Logout") {
            dispatch(logout());
            navigate("/");
        } else if (subOptions.length === 0) {
            navigate(`/${menuName}`);
        } else {
            if (selectedMainMenu !== menuName) {
                toggleSubMenu(menuName);
            }
            setSelectedMainMenu(menuName);
            isSelected(true);
        }
    };

    return (
        <>
            {selectedMainMenu === menuName || !selectedMainMenu ? (
                <Button
                    sx={{
                        textTransform: "capitalize",
                        backgroundColor:
                            isOpen && selectedMainMenu === menuName
                                ? "rgba(93, 95, 239, 1)"
                                : "rgba(93, 95, 239, 0)",
                        color:
                            isOpen && selectedMainMenu === menuName
                                ? "white"
                                : "black",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                        borderTopRightRadius: "28px",
                        borderBottomRightRadius: "28px",
                        width: "99%",
                        padding: "0.5rem",
                        height: "50px",
                        gap: "24px",
                        "&:hover": {
                            backgroundColor:
                                isOpen && selectedMainMenu === menuName
                                    ? "rgba(93, 95, 239, 1)"
                                    : "rgba(93, 95, 239, 0.1)",
                            cursor: "pointer",
                        },
                        transition: "all ease 0.3s",
                    }}
                    onClick={handleClick}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            gap: "15px",
                            marginLeft: "1rem",
                        }}
                    >
                        {getIcon(menuName)}
                        <Typography
                            sx={{
                                marginTop: "4px",
                                fontSize: "16px",
                            }}
                        >
                            {menuName}
                        </Typography>
                    </Box>
                </Button>
            ) : null}
            {isOpen && selectedMainMenu === menuName && (
                <DashboardSubOptions
                    selectedMainMenu={selectedMainMenu}
                    subOptions={subOptions}
                    location={location}
                />
            )}
        </>
    );
};

export default function SideBar({ children }) {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [openSubMenu, setOpenSubMenu] = React.useState("");
    const [selectedMainMenu, setSelectedMainMenu] = React.useState("");
    const [isMenuOptionsClicked, setIsMenuOptionsClicked] =
        React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setIsSidebarOpen(Boolean(open));
    };

    const toggleSubMenu = (menu) => {
        setOpenSubMenu(openSubMenu === menu ? "" : menu);
    };

    const list = (anchor) => (
        <Box
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box
                sx={{
                    fontFamily: "Poppins",
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "white",
                        height: "100px",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: "0.5rem",
                            alignItems: "center",
                            height: "100%",
                            justifyContent: "center",
                        }}
                    >
                        <img src={MyComLogo} alt="MyCom logo" width={60} />
                        {/* <Typography
                            sx={{
                                color: "rgba(21, 29, 72, 1)",
                                fontSize: "20px",
                                fontWeight: "bold",
                            }}
                        >
                            CRM
                        </Typography> */}
                    </Box>
                </Box>
                <Button
                    sx={{
                        textTransform: "capitalize",
                        backgroundColor: isMenuOptionsClicked
                            ? "rgba(93, 95, 239, 0)"
                            : "rgba(93, 95, 239, 1)",
                        color: isMenuOptionsClicked ? "black" : "white",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                        borderTopRightRadius: "28px",
                        borderBottomRightRadius: "28px",
                        width: "99%",
                        padding: "0.5rem",
                        height: "50px",
                        gap: "24px",
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: isMenuOptionsClicked
                                ? "rgba(93, 95, 239, 0.2)"
                                : "rgba(93, 95, 239, 1)",
                        },
                    }}
                    onClick={() => {
                        setIsMenuOptionsClicked(false);
                        setSelectedMainMenu("");
                        setOpenSubMenu("");
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            gap: "15px",
                            marginLeft: "1rem",
                        }}
                    >
                        <WidgetsOutlinedIcon />
                        <Typography sx={{ marginTop: "4px", fontSize: "16px" }}>
                            Menu
                        </Typography>
                    </Box>
                </Button>
                <Box sx={{}}>
                    {mainMenus.map((menu) => (
                        <MenuOptions
                            isSelected={setIsMenuOptionsClicked}
                            key={menu}
                            menuName={menu}
                            isOpen={openSubMenu === menu}
                            toggleSubMenu={toggleSubMenu}
                            location={location}
                            selectedMainMenu={selectedMainMenu}
                            setSelectedMainMenu={setSelectedMainMenu}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ position: "relative" }}>
            <NavbarDashboard toggle={() => setIsSidebarOpen(true)} />
            {/* <FilterBar /> */}
            {/* {location.pathname.includes("Reports") && (
                <Box sx={{ backgroundColor: "#FAFBFC" }}>
                    <NavigationTabsDashboard />
                </Box>
            )} */}
            <div>
                <Drawer
                    anchor="left"
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                >
                    {list("left")}
                </Drawer>
            </div>
            <Box>
                {children}
                {/* <BottomNavigator /> */}
            </Box>
        </Box>
    );
}
