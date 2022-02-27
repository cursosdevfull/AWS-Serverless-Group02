class Step02Controller {
  static async receiveStep02(event) {
    console.log(event);
    return event;
  }
}

export const receiveStep02 = Step02Controller.receiveStep02;
