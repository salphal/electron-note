class EventBus {
  constructor() {
    this.events = {};
  }

  $on(name, listener) {
    if (!name || !listener) return;
    if (Array.isArray(name)) {
      for (let i = 0; i < name.length; i++) {
        this.$on(name[i], listener);
      }
    } else {
      if (!this.events[name]) {
        this.events[name] = [];
      }
      this.events[name].push(listener);
    }
  }

  $emit(name) {
    if (!this.events) return;
    let args = Array.prototype.slice.call(arguments, 1);
    for (let key in this.events) {
      if (this.events.hasOwnProperty(key) && key === name) {
        const listener = this.events[name];
        if (!listener) return;
        for (let i = 0; i < listener.length; i++) {
          if (typeof listener[i] === 'function') {
            listener[i](...args);
          }
        }
      }
    }
  }

  $once(name, listener) {
    if (!name || !listener) return;
    const that = this;
    const _listener = function () {
      listener.apply(that, arguments);
      that.$off(name);
    };
    this.$on(name, _listener);
  }

  $off(name) {
    if (!this.events || !name) return;
    if (Array.isArray(name)) {
      for (let i = 0; i < name.length; i++) {
        this.$off(name);
      }
    } else {
      if (this.events[name]) {
        delete this.events[name];
      }
    }
  }
}

module.exports = {
  EventBus,
};
