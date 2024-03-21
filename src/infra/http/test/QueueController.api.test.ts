import axios from 'axios';

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
    const organizationPost = await axios.post('https://sosa-repo-main.vercel.app/Organization',
    dataPostOrganization);
    const AxiosOutput = await axios.post(
      'https://sosa-repo-main.vercel.app/Admin',
      inputLogin
    );
    const managerPost = await axios.post(
      'https://sosa-repo-main.vercel.app/Admin/' + organizationId, inputPostManager,
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
  const getToken = await axios.post("https://cafeteria-flow-control-backend.vercel.app/manager", inputLogin)
  const objectLogin = {
    name: inputLogin.name,
    password: inputLogin.password,
    token: getToken.data.token
  }
  return objectLogin
}

test("deve fazer um post em uma fila nova", async() => {
    const newLogin = await login()
    const newLoginInApi = await loginInApi()
    const validInput = {
        sequence: ['1°A AGRO', "1°B AGRO", "2°A AGRO", "2°B AGROPEC"],
        organizationId: newLogin.manager.organizationId,
    }
    const saveQueue = await axios.post("https://cafeteria-flow-control-backend.vercel.app/queue", validInput,
    {
        headers: {authorization: newLoginInApi.token}
    })
    expect(saveQueue.data.id).toBeDefined()
}, 15000)

test("deve fazer um GetAll das filas", async()=> {
    const newLogin = await login()
    const newLoginInApi = await loginInApi()
    const validInput = {
        sequence: ['1°A AGRO', "1°B AGRO", "2°A AGRO", "2°B AGROPEC"],
        organizationId: newLogin.manager.organizationId,
    }
    const saveQueue = await axios.post("https://cafeteria-flow-control-backend.vercel.app/queue", validInput,
    {
        headers: {authorization: newLoginInApi.token}
    })
    const validInput1 = {
        sequence: ['1°A TI', "1°B TI", "2°A TI", "2°B TIPEC"],
        organizationId: newLogin.manager.organizationId,
    }
    const saveQueue1 = await axios.post("https://cafeteria-flow-control-backend.vercel.app/queue", validInput1,
    {
        headers: {authorization: newLoginInApi.token}
    })
    const getQueue = await axios.get("https://cafeteria-flow-control-backend.vercel.app/queue/" + newLogin.manager.organizationId,
    {
        headers: {authorization: newLoginInApi.token}
    })
    expect(getQueue.data).toBeDefined()
}, 15000)

test.only("Deve testar o GetOne das filas", async() => {
    const newLogin = await login()
    const newLoginInApi = await loginInApi()
    const validInput = {
        sequence: ['1°A AGRO', "1°B AGRO", "2°A AGRO", "2°B AGROPEC"],
        organizationId: newLogin.manager.organizationId,
    }
    const saveQueue = await axios.post("https://cafeteria-flow-control-backend.vercel.app/queue", validInput,
    {
        headers: {authorization: newLoginInApi.token}
    })
    const getOneQueue = await axios.get("https://cafeteria-flow-control-backend.vercel.app/queue/getOne/" + saveQueue.data.id,
    {
        headers: {authorization: newLoginInApi.token}
    });
    console.log(getOneQueue.data)
    expect(getOneQueue.data).toBeDefined()
    expect(getOneQueue.data.organizationId).toBeDefined()
}, 15000)