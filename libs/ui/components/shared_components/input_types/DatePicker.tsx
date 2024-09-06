import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'

interface DatePickerComponentProps {
  value: Dayjs | null
  setValue: React.Dispatch<React.SetStateAction<Dayjs | null>>
  label: string
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  value,
  setValue,
  label,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer sx={{ color: 'darkgray' }} components={['DatePicker']}>
        <DatePicker
          label={label}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          sx={{ color: 'lightgray', width: 300, marginRight: 100 }}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default DatePickerComponent
