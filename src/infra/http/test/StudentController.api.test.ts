import axios from 'axios';
const baseurl = 'http://localhost:4000/student';

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


test("Deve testar o GetOne da entidade Student", async() => {
    const newStudent = await postStudent()
    const getStudent = await axios.get(baseurl + '/' + newStudent.registration + '/' + newStudent.organizationId)
    expect(getStudent.data).toBeDefined()
}, 15000)

test("Deve testar o GetAll da entidade Student", async() => {
    const randomUser1 = Math.random().toString(36).slice(-15);
    const newLogin = await login()
    const newStudent = await postStudent()
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
}, 15000)