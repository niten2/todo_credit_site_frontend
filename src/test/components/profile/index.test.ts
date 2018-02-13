import * as createTestContext from "react-cosmos-test/enzyme"
import fixture from "src/test/__fixtures__/profile/index"

const { mount, getWrapper } = createTestContext({ fixture })

describe("login", async () => {

  beforeEach(mount)

  it('renders text', async () => {

    console.log(getWrapper().text())

    // expect(getWrapper().text()).toContain("admin")
    // expect(getWrapper().text()).toContain("source code")
  })


})
