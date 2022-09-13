const apiConfig = {
  authenticate: { url: "/api/authenticate", method: "post" },
  register: { url: "/api/register", method: "post" },
  changePassword: { url: "/api/change-password", method: "post" },
  //nft
  nft_addBot: { url: "/api/nft/addBot", method: "post" },
  nft_delBot: { url: "/api/nft/delBot", method: "post" },
  nft_readPlan: { url: "/api/nft/readPlan", method: "post" },
  nft_readLog: { url: "/api/nft/readLog", method: "post" },
  nft_letSell: { url: "/api/nft/letSell", method: "post" },
  nft_letApprove: { url: "/api/nft/letApprove", method: "post" },
  nft_letDel: { url: "/api/nft/letDel", method: "post" },
  nft_readAllPlans: { url: "/api/nft/readAllPlans", method: "post" },
  nft_readAllLogs: { url: "/api/nft/readAllLogs", method: "post" },
  nft_getContractInfo: { url: "/api/nft/getContractInfo", method: "post" },
  //pancake
  pan_addBot: { url: "/api/pan/addBot", method: "post" },
  pan_delBot: { url: "/api/pan/delBot", method: "post" },
  pan_readPlan: { url: "/api/pan/readPlan", method: "post" },
  pan_letSell: { url: "/api/pan/letSell", method: "post" },
  pan_letApprove: { url: "/api/pan/letApprove", method: "post" },
  pan_letDel: { url: "/api/pan/letDel", method: "post" },
  //uniswap
  uni_addBot: { url: "/api/uni/addBot", method: "post" },
  uni_delBot: { url: "/api/uni/delBot", method: "post" },
  uni_readPlan: { url: "/api/uni/readPlan", method: "post" },
  uni_letSell: { url: "/api/uni/letSell", method: "post" },
  uni_letApprove: { url: "/api/uni/letApprove", method: "post" },
  uni_letDel: { url: "/api/uni/letDel", method: "post" },
  //presale
  pre_add: { url: "/api/pre/add", method: "post" },
  pre_read: { url: "/api/pre/read", method: "post" },
  pre_del: { url: "/api/pre/del", method: "post" },
  //swingsale
  swing_add: { url: "/api/swing/add", method: "post" },
  swing_read: { url: "/api/swing/read", method: "post" },
  swing_del: { url: "/api/swing/del", method: "post" },
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
  //icy
  getTrendingCollections: {
    url: "/api/icy/getTrendingCollections",
    method: "post",
  },
  getContractInfo: { url: "/api/icy/getContractInfo", method: "post" },
  searchContracts: { url: "/api/icy/searchContracts", method: "post" },
  getTrades: { url: "/api/icy/getTrades", method: "post" },
  getTokens: { url: "/api/icy/getTokens", method: "post" },
  getTraits: { url: "/api/icy/getTraits", method: "post" },
  getHolders: { url: "/api/icy/getHolders", method: "post" },
  getNerdBooks: { url: "/api/icy/getNerdBooks", method: "post" },
  getNerdTrades: { url: "/api/icy/getNerdTrades", method: "post" },
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
