import { type StyleValue } from 'vue'

export interface VueProps {
  [key: string]: unknown
}

export type VueStyle = StyleValue

export type VueClass = unknown

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
