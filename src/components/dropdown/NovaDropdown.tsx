import {
  computed,
  defineComponent,
  type PropType,
  ref,
  type Ref,
  Teleport,
  Transition,
  type VNode,
  vShow,
  watch,
  withDirectives,
} from 'vue'
import { type EnvironmentContext, useEnvironment } from '@/uses/use-environment.ts'
import { durationLong, useDropdown } from '@/uses/use-dropdown.ts'
import { type EnvironmentProps, environmentProps } from '../environment/NovaEnvironment'
import { type Placement, type VueClass, type VueProps, type VueStyle } from '@/types/props.ts'
import { getFocusable } from '@/utils/dom.ts'

export interface DropdownProps extends EnvironmentProps {
  disabled?: boolean
  panelClass?: VueClass
  panelStyle?: VueStyle
  panelProps?: VueProps
  teleportToBody?: boolean
  environment?: EnvironmentContext
  placement?: Placement
  onOpenChange?: (open: boolean) => void
}

export interface DropdownInstance {
  close: () => void
}

export interface DropdownTriggerScoped {
  disabled: boolean
  triggerAutoFocusRef: Ref<HTMLElement | null>
}

export interface DropdownPanelScoped {
  panelAutoFocusRef: Ref<HTMLElement | null>
}

export const dropdownProps = {
  ...environmentProps,
  /**
   * 禁用状态，会阻止触发与键盘交互
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 作用于下拉面板的额外类名，可自定义尺寸与圆角
   * @default null
   */
  panelClass: {
    type: [String, Array, Object] as PropType<VueClass>,
    default: null as VueClass,
  },
  /**
   * 作用于下拉面板的内联样式
   * @default null
   */
  panelStyle: {
    type: Object as PropType<VueStyle>,
    default: null,
  },
  /**
   * 添加到下拉面板根节点的原生属性，如 data-*
   * @default null
   */
  panelProps: {
    type: Object as PropType<VueProps>,
    default: null,
  },
  /**
   * 是否将面板 Teleport 到 document.body，便于脱离溢出容器
   * @default true
   */
  teleportToBody: {
    type: Boolean,
    default: true,
  },
  /**
   * 环境上下文，内部使用
   * @default null
   */
  environment: {
    type: Object as PropType<EnvironmentContext>,
    default: null,
  },
  /**
   * 下拉面板定位，支持 bottomLeft 等多个预设位置
   * @default 'bottomLeft'
   */
  placement: {
    type: String as PropType<Placement>,
    default: 'bottomLeft',
  },
}

export const NovaDropdown = defineComponent({
  name: 'NovaDropdown',
  props: dropdownProps,
  emits: ['openChange'],
  setup(props, { emit, slots, expose }) {
    let trapped = false

    const environment = props.environment ?? useEnvironment(props)

    const triggerRef: Ref<HTMLElement | null> = ref(null)
    const triggerAutoFocusRef: Ref<HTMLElement | null> = ref(null)
    const panelRef: Ref<HTMLElement | null> = ref(null)
    const panelAutoFocusRef: Ref<HTMLElement | null> = ref(null)
    const trapHeaderRef: Ref<HTMLElement | null> = ref(null)
    const trapTrailerRef: Ref<HTMLElement | null> = ref(null)

    function trapHeaderFocus() {
      const focusable = getFocusable(panelRef.value)

      nextFocus(focusable?.[focusable.length - 1])
    }

    function trapTrailerFocus() {
      const focusable = getFocusable(panelRef.value)

      nextFocus(focusable?.[0])
    }

    function nextFocus(target: HTMLElement | undefined) {
      if (trapped) {
        return
      }

      trapped = true
      target?.focus()

      requestAnimationFrame(() => {
        trapped = false
      })
    }

    const classList = computed(() => {
      return [
        'nova-dropdown',
        {
          ['nova-dropdown-disabled']: props.disabled,
          ['nova-dropdown-opened']: dropdown.opened,
        },
      ]
    })
    const panelClassList = computed(() => {
      return ['nova-dropdown-panel', props.panelClass]
    })

    const {
      dropdown,
      close,
      onBeforeEnter,
      onAfterEnter,
      onBeforeLeave,
      onAfterLeave,
      onLeaveCancelled,
    } = useDropdown({
      triggerRef,
      panelRef,
      panelAutoFocusRef,
      triggerAutoFocusRef,
      props,
      onOpen: () => {
        emit('openChange', true)
      },
      onClose: () => {
        emit('openChange', false)
      },
    })

    // 使用 expose 暴露方法给父组件，父组件通过 ref 调用
    expose({
      close,
    })

    watch(
      () => props.disabled,
      (value) => {
        if (value) {
          dropdown.loaded = false
          dropdown.opened = false
        }
      },
    )

    return () => {
      const slotDefault = slots.default
      const slotTrigger = slots.trigger

      let slotTriggerNode: VNode[] | null = null

      if (slotTrigger) {
        slotTriggerNode = slotTrigger({
          disabled: props.disabled,
          triggerAutoFocusRef,
        })
      }

      function createTrigger() {
        return (
          <div ref={triggerRef} class="nova-dropdown-trigger">
            {slotTriggerNode}
          </div>
        )
      }

      function createPanel() {
        if (!dropdown.loaded || props.disabled) {
          return null
        }

        let beforeAppearFlag = false
        let afterAppearFlag = false

        const children = slotDefault?.({
          panelAutoFocusRef,
        })
        const panelCoreNode = (
          <div
            class={panelClassList.value}
            role="dialog"
            data-nova-theme={environment.themeRef.value}
            ref={panelRef}
            style={props.panelStyle}
            {...props.panelProps}
          >
            <div
              class="nova-trap"
              data-nova-trap="header"
              tabindex={0}
              ref={trapHeaderRef}
              onFocus={trapHeaderFocus}
            />
            {children}
            <div
              class="nova-trap"
              data-nova-trap="trailer"
              tabindex={0}
              ref={trapTrailerRef}
              onFocus={trapTrailerFocus}
            />
            <div class="nova-dropdown-panel-border" />
          </div>
        )

        function onBeforeAppear(el: Element) {
          if (beforeAppearFlag) {
            return
          }

          beforeAppearFlag = true
          onBeforeEnter(el)
        }

        function onAfterAppear(el: Element) {
          if (afterAppearFlag) {
            return
          }

          afterAppearFlag = true
          onAfterEnter(el)
        }

        return (
          <Teleport to="body" disabled={!props.teleportToBody}>
            <Transition
              name="nova-dropdown"
              duration={durationLong}
              appear
              onBeforeAppear={onBeforeAppear}
              onAfterAppear={onAfterAppear}
              onBeforeEnter={onBeforeEnter}
              onAfterEnter={onAfterEnter}
              onBeforeLeave={onBeforeLeave}
              onAfterLeave={onAfterLeave}
              onLeaveCancelled={onLeaveCancelled}
            >
              {() => withDirectives(panelCoreNode as VNode, [[vShow, dropdown.opened]])}
            </Transition>
          </Teleport>
        )
      }

      const panelNode = createPanel()
      const triggerNode = createTrigger()

      return (
        <div class={classList.value} data-nova-theme={environment.themeRef.value}>
          {triggerNode}
          {panelNode}
        </div>
      )
    }
  },
})
