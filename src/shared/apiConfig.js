const apiConfig = {
  authenticate: { url: "/api/authenticate", method: "post" },
  register: { url: "/api/register", method: "post" },
  changePassword: { url: "/api/change-password", method: "post" },

   //wallets
  getWallet: { url: "/api/wallet/read", method: "post" },
  lockWallet: { url: "/api/wallet/lock", method: "post" },
  adminWallet: { url: "/api/wallet/admin", method: "post" },
  //authorization
  readAuthoriztion: { url: "/api/authorization/read", method: "post" },
  addAuthoriztion: { url: "/api/authorization/add", method: "post" },
  deleteAuthorization: { url: "/api/authorization/delete", method: "post" },
  //setting
  read_setting: { url: "/api/setting/read", method: "post" },
  update_setting: { url: "/api/setting/update", method: "post" },
  delete_setting: { url: "/api/setting/delete", method: "post" },
  //dashboard
  dashboard: {
    url: "/api/dashboard/index",
    method: "post",
  },
  //project
  pro_get: {
    url: "/api/project/get",
    method: "post",
  },
  pro_upsert: {
    url: "/api/project/upsert",
    method: "post",
  },
  pro_del: {
    url: "/api/project/delete",
    method: "post",
  },
  //pledge
  pledge_get: {
    url: "/api/pledge/get",
    method: "post",
  },
  pledge_upsert: {
    url: "/api/pledge/upsert",
    method: "post",
  },
  pledge_del: {
    url: "/api/pledge/delete",
    method: "post",
  },
  //app user
  appuser_get: {
    url: "/api/appuser/get",
    method: "post",
  },
  appuser_changePassword: {
    url: "/api/appuser/changePassword",
    method: "post",
  },
  appuser_info: {
    url: "/api/appuser/info",
    method: "post",
  },
  account_info: {
    url: "/api/account/info",
    method: "post",
  },
  //profit
  profit_get: {
    url: "/api/profit/get",
    method: "post",
  },
  profit_add: {
    url: "/api/profit/add",
    method: "post",
  },
  profit_del: {
    url: "/api/profit/delete",
    method: "post",
  },
  profit_info: {
    url: "/api/profit/info",
    method: "post",
  },
  //news
  news_get: {
    url: "/api/news/get",
    method: "post",
  },
  news_upsert: {
    url: "/api/news/upsert",
    method: "post",
  },
  news_del: {
    url: "/api/news/delete",
    method: "post",
  },
  //news
  faq_get: {
    url: "/api/faq/get",
    method: "post",
  },
  faq_upsert: {
    url: "/api/faq/upsert",
    method: "post",
  },
  faq_del: {
    url: "/api/faq/delete",
    method: "post",
  },
  //appuser
  appuser_get: {
    url: "/api/appuser/get",
    method: "post",
  },
  appuser_upsert: {
    url: "/api/appuser/upsert",
    method: "post",
  },
  appuser_del: {
    url: "/api/appuser/delete",
    method: "post",
  },
  note_send: {
    url: "/api/firebase/notification",
    method: "post",
  },
  note_get: {
    url: "/api/notification/get",
    method: "post",
  },
  //pre_app_user
  preappuser_get: {
    url: "/api/additional/get",
    method: "post",
  },
  preappuser_upsert: {
    url: "/api/additional/upsert",
    method: "post",
  },
  preappuser_del: {
    url: "/api/additional/delete",
    method: "post",
  },
};

export default apiConfig;
