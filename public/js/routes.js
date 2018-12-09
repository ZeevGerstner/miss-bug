
import bugApp from './pages/bug-app.cmp.js'
import bugDetails from './pages/bug-details.cmp.js'
import bugEdit from './pages/bug-edit.cmp.js'
import loginPage from './pages/login-page.cmp.js'
import signUp from './pages/sign-up.cmp.js'
import userList from './cmps/user.list.cmp.js'
import userDetails from './pages/user.details.cmp.js';

const routes = [
    {path: '/', component: loginPage},
    {path: '/signUp', component: signUp},
    {path: '/bug', component: bugApp},
    {path: '/bug/edit/:bugId?', component: bugEdit},
  { path: '/bug/:bugId', component: bugDetails },
  { path: '/user', component: userList },
    {path: '/user/:userId', component: userDetails},
  ];

Vue.use(VueRouter);
var myRouter = new VueRouter({routes})

export default myRouter;