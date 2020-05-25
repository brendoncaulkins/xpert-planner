import { TooltipListPipe } from './tooltip-list.pipe'

describe('ToolTipPipe', () => {
  describe('transform', () => {
    let items: string[]
    let pipe: TooltipListPipe

    beforeEach(() => {
      items = ['Thing 1', 'Thing 2', 'Thing 3']
      pipe = new TooltipListPipe()
    })

    it('should add bullet-points to each item', () => {
      const result = pipe.transform(items)
      const prefix = '• '
      items.forEach(i => expect(result).toContain(`${prefix}${i}`))
    })

    it('should add a newline to each item', () => {
      const result = pipe.transform(items)
      const suffix = '\n'
      items.forEach(i => expect(result).toContain(`${i}${suffix}`))
    })
  })
})
