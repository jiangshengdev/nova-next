import { onBeforeUnmount, onMounted, reactive } from 'vue';
import { MoveParams, MovePosition } from './use-move';
import { getPaddingLeft, getPaddingTop } from '../utils/dom';

export interface MouseState {
  moving: boolean;
  holding: boolean;
}

interface MouseReturn {
  mouse: MouseState;
}

export function useMousemove(params: MoveParams): MouseReturn {
  const { ref, start, move, finish } = params;

  let rect = {} as DOMRect;
  const border = { top: 0, left: 0 };

  const state = reactive({
    mouse: {
      moving: false,
      holding: false,
    },
  });

  function getRectLeft(): number {
    return rect.left ?? rect.x ?? 0;
  }

  function getRectTop(): number {
    return rect.top ?? rect.y ?? 0;
  }

  function getClientCoordinate(event: MouseEvent, axis: 'x' | 'y'): number {
    const clientProp = axis === 'x' ? 'clientX' : 'clientY';
    const pageProp = axis === 'x' ? 'pageX' : 'pageY';
    const pageOffset = axis === 'x' ? window.pageXOffset : window.pageYOffset;

    const clientValue = event[clientProp as 'clientX' | 'clientY'];
    if (typeof clientValue === 'number') {
      return clientValue;
    }

    const pageValue = event[pageProp as 'pageX' | 'pageY'];
    if (typeof pageValue === 'number') {
      return pageValue - pageOffset;
    }

    return 0;
  }

  function resolvePosition(event: MouseEvent): MovePosition {
    const clientX = getClientCoordinate(event, 'x');
    const clientY = getClientCoordinate(event, 'y');
    const relativeX = clientX - getRectLeft() - border.left;
    const relativeY = clientY - getRectTop() - border.top;

    return { x: relativeX, y: relativeY };
  }

  function onMousemove(e: MouseEvent): void {
    e.preventDefault();

    if (state.mouse.moving) {
      return;
    }

    state.mouse.moving = true;
    requestAnimationFrame(() => {
      state.mouse.moving = false;
    });

    const position = resolvePosition(e);
    move?.call(null, position);
  }

  function onMouseup(): void {
    state.mouse.holding = false;

    document.removeEventListener('mousemove', onMousemove);
    document.removeEventListener('mouseup', onMouseup);

    finish?.call(null);
  }

  function onMousedown(e: MouseEvent): void {
    e.preventDefault();

    state.mouse.holding = true;

    const target: HTMLElement = ref.value as HTMLElement;
    rect = target.getBoundingClientRect();
    border.left = getPaddingLeft(target);
    border.top = getPaddingTop(target);

    const position = resolvePosition(e);
    start?.call(null);
    move?.call(null, position);

    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('mouseup', onMouseup);
  }

  onMounted(() => {
    const target: HTMLElement = ref.value as HTMLElement;
    target.addEventListener('mousedown', onMousedown);
  });

  onBeforeUnmount(() => {
    const target: HTMLElement = ref.value as HTMLElement;
    target.removeEventListener('mousedown', onMousedown);
    document.removeEventListener('mousemove', onMousemove);
    document.removeEventListener('mouseup', onMouseup);
  });

  return {
    mouse: state.mouse,
  };
}
