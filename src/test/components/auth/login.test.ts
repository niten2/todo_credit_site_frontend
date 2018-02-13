import * as createTestContext from "react-cosmos-test/enzyme"
import fixture from "src/test/__fixtures__/auth/login"

// import AuthProvider from "src/config/auth_provider"


describe("login", async () => {

  // beforeEach(async () => await mount())

  // it('renders text', async () => {
  //   expect(getWrapper().text()).toContain("admin")
  //   expect(getWrapper().text()).toContain("source code")
  // })


  it('renders text', async () => {

    await jest.mock('src/config/auth_provider', () => ({
      default: {
        saveToken: jest.fn(),
        saveRole: jest.fn(),
      }
    }))

    const { mount, getWrapper } = createTestContext({ fixture })

    await mount()

    // const p = Promise.resolve('success')


    // console.log(createTestContext({ fixture }))

    // console.log(getWrapper())


    // await mount()

    await getWrapper('.btn .btn-primary .px-4').simulate('click')

    // await p

    // await mount()

    const AuthProvider = require("src/config/auth_provider").default

    // console.log(AuthProvider)

    console.log(AuthProvider.saveToken.mock.calls)


  })


})
