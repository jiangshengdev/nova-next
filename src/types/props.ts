import { type HTMLAttributes, type StyleValue } from 'vue'

export interface VueProps {
  [key: string]: unknown
}

export type VueStyle = StyleValue

export type VueClass = HTMLAttributes['class']

export type Placement =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'rightTop'
  | 'right'
  | 'rightBottom'
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight'
  | 'leftTop'
  | 'left'
  | 'leftBottom'
