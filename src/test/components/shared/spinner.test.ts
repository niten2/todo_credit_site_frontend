import * as createTestContext from "react-cosmos-test/enzyme"
import fixture from "src/test/__fixtures__/shared/spinner"

const { mount, getWrapper } = createTestContext({ fixture })

describe("", () => {

  beforeEach(mount)

  it('should have users', async () => {
    console.log(getWrapper().text())

    // expect(getWrapper().text()).toContain("Users")
  })

})
