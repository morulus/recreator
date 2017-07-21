export default function defaultInjector(state, next) {
  return {
    ...state,
    ...next,
  };
}
