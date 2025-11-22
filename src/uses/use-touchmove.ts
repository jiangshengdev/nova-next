import { onBeforeUnmount, onMounted, reactive } from 'vue';
import { type MoveParams, type MovePosition } from './use-move';
import { getPaddingLeft, getPaddingTop } from '../utils/dom';

export interface TouchState {
  moving: boolean;
  holding: boolean;
}

interface TouchReturn {
  touch: TouchState;
}

export function useTouchmove(params: MoveParams): TouchReturn {
  const { ref, start, move, finish } = params;

  let rect = {} as DOMRect;
  const border = { top: 0, left: 0 };

  const state = reactive({
    touch: {
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

  function resolveTouchPosition(touch: Touch): MovePosition {
    const clientX =
      typeof touch.clientX === 'number'
        ? touch.clientX
        : touch.pageX - window.pageXOffset;
    const clientY =
      typeof touch.clientY === 'number'
        ? touch.clientY
        : touch.pageY - window.pageYOffset;

    const relativeX = clientX - getRectLeft() - border.left;
    const relativeY = clientY - getRectTop() - border.top;

    return { x: relativeX, y: relativeY };
  }

  function onTouchmove(e: TouchEvent): void {
    if (e.cancelable) {
      e.preventDefault();
    }

    if (state.touch.moving) {
      return;
    }

    const firstFinger = e.changedTouches[0];
    if (!firstFinger) {
      return;
    }

    state.touch.moving = true;
    requestAnimationFrame(() => {
      state.touch.moving = false;
    });

    const position = resolveTouchPosition(firstFinger);
    move?.call(null, position);
  }

  function onTouchend(e: TouchEvent): void {
    state.touch.holding = false;

    if (e.cancelable) {
      e.preventDefault();
    }

    const target: HTMLElement = ref.value as HTMLElement;
    target.removeEventListener('touchmove', onTouchmove);
    target.removeEventListener('touchend', onTouchend);
    target.removeEventListener('touchcancel', onTouchend);

    finish?.call(null);
  }

  function onTouchstart(e: TouchEvent): void {
    state.touch.holding = true;

    if (e.cancelable) {
      e.preventDefault();
    }

    const firstFinger = e.changedTouches[0];
    if (!firstFinger) {
      return;
    }

    const target: HTMLElement = ref.value as HTMLElement;
    rect = target.getBoundingClientRect();
    border.left = getPaddingLeft(target);
    border.top = getPaddingTop(target);

    const position = resolveTouchPosition(firstFinger);
    start?.call(null);
    move?.call(null, position);

    target.addEventListener('touchmove', onTouchmove);
    target.addEventListener('touchend', onTouchend);
    target.addEventListener('touchcancel', onTouchend);
  }

  onMounted(() => {
    const target: HTMLElement = ref.value as HTMLElement;
    target.addEventListener('touchstart', onTouchstart);
  });

  onBeforeUnmount(() => {
    const target: HTMLElement = ref.value as HTMLElement;
    target.removeEventListener('touchstart', onTouchstart);
    target.removeEventListener('touchmove', onTouchmove);
    target.removeEventListener('touchend', onTouchend);
    target.removeEventListener('touchcancel', onTouchend);
  });

  return {
    touch: state.touch,
  };
}
