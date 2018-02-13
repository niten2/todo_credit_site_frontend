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

   // console.log(getWrapper().text())

   await getWrapper('.btn .btn-primary .px-4').simulate('click');

   console.log(getWrapper().text())




    // expect(getWrapper().text()).toContain("admin")
    // expect(getWrapper().text()).toContain("source code")
  })


})
