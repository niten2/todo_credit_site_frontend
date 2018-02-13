let z = jest.mock('src/config/auth_provider', () => ({
  default: {
    saveToken: jest.fn(),
    saveRole: jest.fn(),
  }
}))

import * as createTestContext from "react-cosmos-test/enzyme"
import fixture from "src/test/__fixtures__/dashboard"
import AuthProvider from "src/config/auth_provider"

const { mount, getWrapper } = createTestContext({ fixture })

describe("<Dashboard />", () => {

  beforeEach(mount)

  // it('renders Description', async () => {
  //   expect(getWrapper().text()).toContain("Description")
  // })

  it('renders Description', async () => {
    await getWrapper('.btn .btn-primary .px-4').simulate('click')


    console.log(AuthProvider.saveToken.mock.calls)

  })

})

