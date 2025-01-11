import { FunctionComponent, ReactNode } from 'react'

interface Props {
  children: ReactNode;
  label: string;
  id: string;
}

const FieldContainer: FunctionComponent<Props> = ({ children, label, id }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        {label}
      </label>
      {children}
    </div>
  )
}

export default FieldContainer