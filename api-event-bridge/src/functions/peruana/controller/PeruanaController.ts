class PeruanaController {
  static receivePeruanaOrder(event) {
    console.log(event);
  }
}

export const receivePeruanaOrder = PeruanaController.receivePeruanaOrder;
