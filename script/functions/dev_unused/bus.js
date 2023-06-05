class Bus {
  constructor() {
    this.chanels = {};
  }

  subscribe(chanel, listener) {
    if (!this.chanels[chanel]) this.chanels[chanel] = [];
    this.chanels[chanel].push(listener);
  }

  publish(chanel, data) {
    if (!this.chanels[chanel]) return;
    this.chanels[chanel].forEach(fn => {
      fn(data);
    });
  }
}

export default new Bus();