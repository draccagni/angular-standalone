import singleSpaHtml from "single-spa-html";
import template from "./template.html";
import { BehaviorSubject } from "rxjs";

const htmlLifecycles = singleSpaHtml({
  template,
});

export const bootstrap = htmlLifecycles.bootstrap;
export const mount = htmlLifecycles.mount;
export const unmount = htmlLifecycles.unmount;

export const store$ = new BehaviorSubject({ name: "start", value: true });

export const message$ = new BehaviorSubject();

export const idle$ = new BehaviorSubject();

const store = new Map();

export function error(message) {
  message$.next({ type: "error", text: message });
}

export function warning(message) {
  message$.next({ type: "error", text: message });
}

export function info(message) {
  message$.next({ type: "info", text: message });
}

export function idle(enabled, text) {
  idle$.next({ enabled: enabled, text: text });
}

export function update(name, value) {
  store.set(name, value);
  store$.next({
    name: name,
    value: value,
  });
}

export function select(name) {
  return store.get(name);
}
