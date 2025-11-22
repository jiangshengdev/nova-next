import { computed, defineComponent, ref } from 'vue'
import { type MovePosition, useMove } from '../../../uses/use-move'
import { Color } from '../color'
import { numberFixed } from '../../../utils/utils'

interface HsvPanelProps {
  color: Color
  hueReg: number
  saturation: number
  value: number
  onMove: (position: MovePosition) => void
}

const hsvPanelProps = {
  color: {
    type: Object,
    required: true,
  },
  hueReg: {
    type: Number,
    required: true,
  },
  saturation: {
    type: Number,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
}

export const HsvPanel = defineComponent({
  name: 'HsvPanel',
  props: hsvPanelProps,
  emits: ['move'],
  setup(props: HsvPanelProps, { emit }) {
    const hsvRef = ref<HTMLElement | null>(null)

    const hsvStyle = computed(() => {
      const bg = Color.fromHsva(props.hueReg, 1, 1).toCssRgbaString()

      return {
        background: `linear-gradient(90deg, hsl(0, 0%, 100%), ${bg})`,
      }
    })

    const moveReturn = useMove({
      ref: hsvRef,
      move: (position) => {
        emit('move', position)
      },
    })

    const cursorClassList = computed(() => {
      return [
        'nova-color-picker-cursor',
        {
          'nova-color-picker-cursor-holding': moveReturn.mouse.holding || moveReturn.touch.holding,
        },
      ]
    })

    return () => {
      const x = numberFixed(props.saturation)
      const y = numberFixed(props.value)

      const { red, green, blue } = props.color
      const currColor = new Color(red, green, blue).toCssHexString()
      const cursorStyle = {
        backgroundColor: currColor,
        transform: `translate(${x}px, ${y}px)`,
      }
      return (
        <div class="nova-color-picker-hsv" ref={hsvRef}>
          <div class="nova-color-picker-hsv-inner">
            <div class="nova-color-picker-hue-saturation" style={hsvStyle.value} />
            <div class="nova-color-picker-value" />
          </div>
          <div class={cursorClassList.value} style={cursorStyle} />
        </div>
      )
    }
  },
})
