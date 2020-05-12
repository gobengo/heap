import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";
import { MinHeap } from "./heap.ts";

export const testDefinitions: Array<Deno.TestDefinition> = [
  {
    name: "can build MinHeap",
    fn(): void {
      let heap = MinHeap([3, 1, 2]);
      assertEquals(Boolean(heap), true);
      assertEquals(heap.length, 3);
      // Note: this doens't really test the minHeap aspect
      // because the pushes happen to be in correct order
      assertEquals(heap.pop(), 1);
    },
  },
  {
    name: "can peek() min value",
    fn(): void {
      let heap = MinHeap();
      assertEquals(Boolean(heap), true);
      heap.push(3);
      heap.push(1);
      heap.push(2);
      assertEquals(heap.peek(), 1);
    },
  },
  {
    name: "can push(val) values",
    fn(): void {
      let heap = MinHeap([4]);
      assertEquals(Boolean(heap), true);
      heap.push(3);
      heap.push(1);
      heap.push(2);
      assertEquals(heap.length, 4);
      assertEquals(heap.peek(), 1);
    },
  },
  {
    name: "can pop() min value",
    fn(): void {
      let heap = MinHeap();
      assertEquals(Boolean(heap), true);
      heap.push(3);
      heap.push(1);
      heap.push(32);
      heap.push(2);
      heap.push(31);
      heap.push(33);
      assertEquals(heap.pop(), 1);
      assertEquals(heap.peek(), 2);
      assertEquals(heap.pop(), 2);
    },
  },
];

if ((typeof Deno !== "undefined") && (typeof Deno.test === "function")) {
  testDefinitions.forEach(Deno.test);
}
