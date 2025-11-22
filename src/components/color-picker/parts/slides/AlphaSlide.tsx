import { computed, defineComponent, ref } from 'vue'
import { type MovePosition, useMove } from '../../../../uses/use-move'
import { Color } from '../../color'
import { numberFixed } from '../../../../utils/utils'

interface AlphaSlideProps {
  alpha: number
  color: Color
  onMove?: (position: MovePosition) => void
}

const alphaSlideProps = {
  alpha: {
    type: Number,
    required: true,
  },
  color: {
    type: Object,
    required: true,
  },
}

export const AlphaSlide = defineComponent({
  name: 'AlphaSlide',
  props: alphaSlideProps,
  emits: ['move'],
  setup(props: AlphaSlideProps, { emit }) {
    const alphaSlideRef = ref<HTMLElement | null>(null)

    const alphaThumbStyle = computed(() => {
      const y = numberFixed(props.alpha)
      return {
        transform: `translate(0, ${y}px)`,
      }
    })

    useMove({
      ref: alphaSlideRef,
      move: (position) => {
        emit('move', position)
      },
    })

    return (): JSX.Element => {
      const { red, green, blue } = props.color.toCssRgba()
      const currColorRgb = `${red}, ${green}, ${blue}`
      const currColorLinearGradient = `linear-gradient(180deg, rgba(${currColorRgb}, 1), rgba(${currColorRgb}, 0))`

      const barStyle = {
        backgroundImage: currColorLinearGradient,
      }

      return (
        <div class="nova-color-picker-alpha-slide" ref={alphaSlideRef}>
          <div class="nova-color-picker-alpha-inner">
            <div class="nova-color-picker-alpha-bar" style={barStyle} />
          </div>
          <div class="nova-color-picker-alpha-thumb" style={alphaThumbStyle.value} />
        </div>
      )
    }
  },
})
