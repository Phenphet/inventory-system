export {};

declare global {
  const $: typeof import('jquery');

  interface JQuery {
    DataTable: any;
  }
}
