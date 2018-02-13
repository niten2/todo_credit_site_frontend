import * as createTestContext from "react-cosmos-test/enzyme"
import fixture from "src/test/__fixtures__/auth/login"

const { mount, getWrapper } = createTestContext({ fixture })

describe("dashboard", () => {

  beforeEach(mount)

  // it('renders text', async () => {
  //   expect(getWrapper().text()).toContain("admin")
  //   expect(getWrapper().text()).toContain("source code")
  // })


  it('renders text', async () => {

   await getWrapper('.btn .btn-primary .px-4').simulate('click');

   console.log(11)
   console.log(getWrapper().text())
   console.log(11)

  })


})
