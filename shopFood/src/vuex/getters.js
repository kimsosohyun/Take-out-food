export default {
  number (state) {

    return state.cardArr.reduce((total, num) => {
      return total + num.count;
    }, 0)
  },
  money (state) {
    return state.cardArr.reduce((total, num) => {
      return total + num.count * num.price;
    }, 0)
  }
}

