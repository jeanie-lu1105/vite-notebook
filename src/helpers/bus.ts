const bus = new EventTarget();

export function onBus(
  eventName: string,
  listener: EventListenerOrEventListenerObject,
) {
  bus.addEventListener(eventName, listener);
}

export function offBus(
  eventName: string,
  listener: EventListenerOrEventListenerObject,
) {
  bus.removeEventListener(eventName, listener);
}

export function emitBus(eventName: string, detail?: any) {
  bus.dispatchEvent(new CustomEvent(eventName, { detail }));
}

export default bus;
