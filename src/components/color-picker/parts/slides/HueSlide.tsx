import { computed, defineComponent, ref } from 'vue'
import { type MovePosition, useMove } from '../../../../uses/use-move'
import { numberFixed } from '../../../../utils/utils'

interface HueSlideProps {
  hue: number
  onMove?: (position: MovePosition) => void
}

const hueSlideProps = {
  hue: {
    type: Number,
    required: true,
  },
}

export const HueSlide = defineComponent({
  name: 'HueSlide',
  props: hueSlideProps,
  emits: ['move'],
  setup(props: HueSlideProps, { emit }) {
    const hueSlideRef = ref<HTMLElement | null>(null)

    const hueThumbStyle = computed(() => {
      const y = numberFixed(props.hue)

      return {
        transform: `translate(0, ${y}px)`,
      }
    })

    useMove({
      ref: hueSlideRef,
      move: (position) => {
        emit('move', position)
      },
    })

    return () => {
      return (
        <div class="nova-color-picker-hue-slide" ref={hueSlideRef}>
          <div class="nova-color-picker-hue-inner">
            <div class="nova-color-picker-hue-bar" />
          </div>

          <div class="nova-color-picker-hue-thumb" style={hueThumbStyle.value} />
        </div>
      )
    }
  },
})
