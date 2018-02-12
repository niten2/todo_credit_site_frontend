import * as createTestContext from "react-cosmos-test/enzyme"
import fixture from "src/test/__fixtures__/auth/login"

const { mount, getWrapper } = createTestContext({ fixture })

describe("dashboard", () => {

  beforeEach(mount)

  it('renders Description', async () => {
    expect(getWrapper().text()).toContain("admin")
    expect(getWrapper().text()).toContain("source code")
  })

})
