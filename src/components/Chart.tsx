import { CursorArrowRaysIcon } from '@heroicons/react/16/solid'
import { BarChart, Card, ProgressCircle } from '@tremor/react'

const data = [
  {
    date: 'Jan 23',
    bpm: 167,
    effort: 23,
    recovery: 40,
    strain: 1.1,
    sleep: 89
  },
  {
    date: 'Feb 23',
    bpm: 121,
    effort: 78,
    recovery: 45,
    strain: 4.1,
    sleep: 79
  },
  // ...
  {
    date: 'Aug 23',
    bpm: 135,
    effort: 53,
    recovery: 36,
    strain: 2.3,
    sleep: 67
  },
  {
    date: 'Sep 23',
    bpm: 150,
    effort: 38,
    recovery: 43,
    strain: 1.7,
    sleep: 87
  }
]

const valueFormatter = (number) => `${Intl.NumberFormat('us').format(number).toString()}bpm`

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

const customTooltip = ({ payload, active, label }) => {
  if (!active || !payload) return null

  const categoryPayload = payload[0]
  if (!categoryPayload) return null

  const selectedItem = data.find((d) => d.date === label)
  if (!selectedItem) return null

  return (
    <div className="rounded-lg pl-6 pr-8 py-4 bg-white drop-shadow-md border border-gray-200">
      {payload.map((item, idx) => {
        const selectedItem = data.find((d) => d.date === item.payload.date)
        if (!selectedItem) return null
        return (
          <div key={idx} className="flex items-center space-x-6">
            <ProgressCircle value={selectedItem.effort} radius={45} color="violet">
              <ProgressCircle value={selectedItem.recovery} radius={36} color="fuchsia" />
            </ProgressCircle>
            <div className="space-y-1">
              <div>
                <h4 className="text-sm text-gray-500">Effort</h4>
                <p className="font-medium text-violet-600">{selectedItem.effort}%</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500">Recovery</h4>
                <p className="font-medium text-fuchsia-700">{selectedItem.recovery}%</p>
              </div>
            </div>
            <div className="space-y-1">
              <div>
                <h4 className="text-sm text-gray-500">Strain</h4>
                <p className="font-medium text-gray-700">{selectedItem.strain}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500">Sleep</h4>
                <p className="font-medium text-gray-700">{selectedItem.sleep}%</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Chart () {
  return (
    <Card>
        <div className="sm:-translate-y-10 flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Average BPM</h3>
            <div className="flex items-center space-x-2">
                <CursorArrowRaysIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                <span className="text-sm text-gray-500">Hover for vitals breakdown</span>
            </div>
        </div>
        <BarChart
          className="hidden sm:block mt-16 h-72"
          data={data}
          index="date"
          categories={['bpm']}
          stack={true}
          colors={['blue']}
          valueFormatter={valueFormatter}
          yAxisWidth={70}
          showLegend={false}
          showGradient={false}
          customTooltip={customTooltip}
        />
        <BarChart
          className="sm:hidden mt-16 h-80"
          data={data}
          index="date"
          categories={['bpm']}
          stack={true}
          colors={['blue']}
          valueFormatter={valueFormatter}
          showYAxis={false}
          showLegend={false}
          showGradient={false}
          customTooltip={customTooltip}
        />
    </Card>
  )
}
