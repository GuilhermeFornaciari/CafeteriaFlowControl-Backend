import axios from 'axios';
const baseurl = 'http://localhost:4000/manager';
const baseurlLogout = 'http://localhost:4000/logout';

async function login(organizationId?) {
    const randomUser = Math.random().toString(36).slice(-10);
    const randomUser1 = Math.random().toString(36).slice(-10);
    const dataPostOrganization = {
      organization: {
          name: 'CAED Cacoal'
      },
      manager: {
          name: randomUser,
          password: '12345678',
          type: 'Servidor da CAED',
      }
  }
    const inputLogin = {
      user : dataPostOrganization.manager.name,
      password: dataPostOrganization.manager.password
    }
    const inputPostManager = {
      name: randomUser1,
      password: dataPostOrganization.manager.password,
      type: dataPostOrganization.manager.type
    }
    const organizationPost = await axios.post('http://localhost:3000/Organization',
    dataPostOrganization);
    const AxiosOutput = await axios.post(
      'http://localhost:3000/Admin',
      inputLogin
    );
    const managerPost = await axios.post(
      'http://localhost:3000/Admin/' + organizationId, inputPostManager,
      {
        headers: {authorization: AxiosOutput.data.token}
      },
    )
    const ObjectLogin = {
      manager: {
        name: organizationPost.data.name,
        password: dataPostOrganization.manager.password,
        type: organizationPost.data.type,
        id: organizationPost.data.id,
        organizationId: organizationPost.data.organizationId
      },
      token : AxiosOutput.data.token
    }
    return ObjectLogin
}

async function loginInApi() {
    const newLogin = await login()
    const inputLogin = {
        name: newLogin.manager.name,
        password: newLogin.manager.password,
    }
    const getToken = await axios.post(baseurl, inputLogin)
    const objectLogin = {
      name: inputLogin.name,
      password: inputLogin.password,
      token: getToken.data.token
    }
    return objectLogin
  }

test("Deve testar o Logout", async() => {
    const newLogin = await login()
    const newLoginInApi = await loginInApi()
    const inputLogin = {
        name: newLogin.manager.name,
        password: newLogin.manager.password,
    }
    const getToken = await axios.post(baseurl, inputLogin)
    expect(getToken.data.token).toBeDefined()
    const logout = await axios.post(baseurlLogout + '/' + getToken.data.token,
    {},
    {
      headers: {authorization: newLoginInApi.token}
    },)
    expect(logout.data).toBeDefined()
}, 15000)