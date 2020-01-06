import { Controller } from "../.."
import { ControllerTestCase } from "../controller_test_case"

class ActionTimingController extends Controller {
  static targets = [ "button" ]
  buttonTarget!: HTMLButtonElement
  event?: Event

  connect() {
    this.buttonTarget.click()
  }

  record(event: Event) {
    this.event = event
  }
}

export default class ActionTimingTests extends ControllerTestCase<ActionTimingController> {
  controllerConstructor = ActionTimingController
  identifier = "c"
  fixtureHTML = `
    <div data-controller="c">
      <button data-target="c.button" data-action="c#record">Log</button>
    </div>
  `

  async "test triggering an action on connect"() {
    const { event } = this.controller
    this.assert.ok(event)
    this.assert.equal(event && event.type, "click")
  }
}
