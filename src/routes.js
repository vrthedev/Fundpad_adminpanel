import Login from "views/pages/Login.js";
import User from "views/pages/User.js";
import Register from "views/pages/Register.js";
import Authorization from "views/pages/admin/Authorization";
import Bots from "views/pages/admin/Bots";
import Wallets from "views/pages/admin/Wallets";
import Setting from "views/pages/admin/Setting";
import Dashboard from "views/Dashboard";
import Project from "views/Project";
import ProjectDetail from "views/ProjectDetail";
import Pledge from "views/Pledge";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/bot",
  },
  {
    path: "/project",
    name: "Project",
    rtlName: "مشروع",
    icon: "tim-icons icon-app",
    component: Project,
    layout: "/bot",
  },
  {
    path: "/projectDetail/:id",
    name: "ProjectDetail",
    rtlName: "مشروع",
    mini: "L",
    rtlMini: "هعذا",
    component: ProjectDetail,
    layout: "/bot",
    hidden: true,
  },
  {
    path: "/pledge",
    name: "Pledge",
    rtlName: "يتعهد",
    icon: "tim-icons icon-coins",
    component: Pledge,
    layout: "/bot",
  },
  {
    path: "/login",
    name: "Login",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: Login,
    layout: "/auth",
    hidden: true,
  },
  {
    path: "/register",
    name: "Register",
    rtlName: "هعذاتسجيل الدخول",
    mini: "L",
    rtlMini: "هعذا",
    component: Register,
    layout: "/auth",
    hidden: true,
  },
  {
    path: "/settings",
    name: "Account Settings",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-key-25",
    component: User,
    layout: "/bot",
  },
  // {
  //   collapse: true,
  //   name: "Admin Panel",
  //   rtlName: "صفحات",
  //   icon: "tim-icons icon-paper",
  //   state: "adminCollapse",
  //   isManager: true, //use when item is for admin
  //   views: [
  //     {
  //       path: "/admin/wallets",
  //       name: "Wallets",
  //       rtlName: "لوحة القيادة",
  //       mini: "W",
  //       component: Wallets,
  //       layout: "/bot",
  //     },
  //     {
  //       path: "/admin/bots",
  //       name: "Bots",
  //       rtlName: "لوحة القيادة",
  //       mini: "B",
  //       component: Bots,
  //       layout: "/bot",
  //     },
  //     {
  //       path: "/admin/autorization",
  //       name: "Authorization",
  //       rtlName: "لوحة القيادة",
  //       mini: "A",
  //       component: Authorization,
  //       layout: "/bot",
  //     },
  //     {
  //       path: "/admin/settings",
  //       name: "Settings",
  //       rtlName: "لوحة القيادة",
  //       mini: "S",
  //       component: Setting,
  //       layout: "/bot",
  //     },
  //   ],
  // },
];

export default routes;
