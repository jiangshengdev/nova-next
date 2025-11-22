import { type Ref } from 'vue';
import { type MouseState, useMousemove } from './use-mousemove';
import { type TouchState, useTouchmove } from './use-touchmove';

export interface MovePosition {
  x: number;
  y: number;
}

interface MoveReturn {
  mouse: MouseState;
  touch: TouchState;
}

export interface MoveParams {
  ref: Ref<HTMLElement | null>;
  start?: () => void;
  move?: (position: MovePosition) => void;
  finish?: () => void;
}

export function useMove(params: MoveParams): MoveReturn {
  const mouseReturn = useMousemove(params);
  const touchReturn = useTouchmove(params);

  return {
    mouse: mouseReturn.mouse,
    touch: touchReturn.touch,
  };
}
