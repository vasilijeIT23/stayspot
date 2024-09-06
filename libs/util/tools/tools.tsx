export function envelopInParent(jsonOne, jsonTwo, jsonThree) {
  return {
    admin: jsonOne,
    manager: jsonTwo,
    customer: jsonThree,
  }
}
