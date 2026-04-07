declare module "*.svelte" {
  import { SvelteComponentTyped } from "svelte";
  export default class extends SvelteComponentTyped<any, any, any> {}
}

declare module "single-spa-svelte" {
  export default function singleSpaSvelte(options: any): any;
}
