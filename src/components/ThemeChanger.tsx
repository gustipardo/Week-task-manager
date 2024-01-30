import { useTheme } from 'next-themes'
import { Switch } from '@tremor/react'
import { useState } from 'react'

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(theme === 'light')

  const handleSwitchChange = (value: boolean) => {
    setIsSwitchOn(value)
    if (value) setTheme('light')
    else setTheme('dark')
  }
  return (
      <Switch id="switch" name="switch" checked={isSwitchOn} onChange={handleSwitchChange} color='yellow'/>
  )
}
