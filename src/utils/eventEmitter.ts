type EventCallback = (data?: any) => void;

class EventEmitter {
  private events: { [key: string]: EventCallback[] } = {};

  emit(eventName: string, data?: any) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => callback(data));
    }
  }

  addListener(eventName: string, callback: EventCallback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);

    // Return a subscription object with a remove method
    return {
      remove: () => {
        if (this.events[eventName]) {
          this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
        }
      }
    };
  }
}

const eventEmitter = new EventEmitter();

export const emitEvent = (eventName: string, data?: any) => {
  eventEmitter.emit(eventName, data);
};

export const addEventListener = (eventName: string, callback: EventCallback) => {
  return eventEmitter.addListener(eventName, callback);
}; 