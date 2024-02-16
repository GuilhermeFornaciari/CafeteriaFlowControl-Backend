import axios from 'axios';
const baseurl = 'https://cafeteria-flow-control-backend.vercel.app/student';
const baseurlManager = 'http://localhost:4000/manager';

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

async function postTwoStudent() {
    const randomUser1 = Math.random().toString(36).slice(-15);
    const randomUser2 = Math.random().toString(36).slice(-15);
    const newLogin = await login()
    const organizationId = newLogin.manager.organizationId
    const postParam1 = {
        name: 'Julio César Aguiar',
        className: '2022 A TI',
        type: false,
        registration: randomUser1,
    }
    const AxiosPost1 = await axios.post('http://localhost:3000/Student/' + organizationId ,
    postParam1,
    {
      headers: {authorization: newLogin.token}
    },
    );
    const postParam2 = {
      name: 'Thiciane Fernanda Frata Borges',
      className: '2022 B TI',
      type: false,
      registration: randomUser2,
    }
    const AxiosPost2 = await axios.post('http://localhost:3000/Student/' + organizationId ,
    postParam2,
    {
      headers: {authorization: newLogin.token}
    },
    );
    const objectReturn = {
      registration1: AxiosPost1.data.registration,
      registration2: AxiosPost2.data.registration,
      organizationId: organizationId,
    }
    return objectReturn
}

async function postStudent() {
  const randomUser1 = Math.random().toString(36).slice(-15);
  const newLogin = await login()
  const organizationId = newLogin.manager.organizationId
  const postParam = {
      name: 'Julio César Aguiar',
      className: '2022 A TI',
      type: false,
      registration: randomUser1,
  }
  const AxiosPost = await axios.post('http://localhost:3000/Student/' + organizationId ,
  postParam,
  {
    headers: {authorization: newLogin.token}
  },
  );
  const AxiosGetOne = await axios.get(
      'http://localhost:3000/Student/'+ organizationId + '/' + AxiosPost.data.id,
      {
          headers: {authorization: newLogin.token}
      },
    );
  const studentObject = {
    name: AxiosGetOne.data.props.name,
    className: AxiosGetOne.data.props.className,
    registration: AxiosGetOne.data.props.registration,
    type: AxiosGetOne.data.props.type,
    id: AxiosPost.data.id,
    organizationId: organizationId,
  }
  return studentObject;
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

test("Deve testar o GetOne da entidade Student", async() => {
    const newStudent = await postStudent()
    const newLoginInApi = await loginInApi()
    const getStudent = await axios.get('https://cafeteria-flow-control-backend.vercel.app/student' + '/' + newStudent.registration + '/' + newStudent.organizationId,
    {
      headers: {authorization: newLoginInApi.token}
    })
    expect(getStudent.data).toBeDefined()
}, 15000)

test("Deve testar o GetAll da entidade Student", async() => {
  const students = await postTwoStudent()
  const newLoginInApi = await loginInApi()
  const getStudent = await axios.get('https://cafeteria-flow-control-backend.vercel.app/student' + '/' + students.organizationId,
  {
    headers: {authorization: newLoginInApi.token}
  })
  const getRegistration1 = getStudent.data.find((element) => element.registration == students.registration1)
  expect(getRegistration1).toBeDefined()
  const getRegistration2 = getStudent.data.find((element) => element.registration == students.registration2)
  expect(getRegistration2).toBeDefined()
}, 15000)