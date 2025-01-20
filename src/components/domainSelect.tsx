import { Button, Modal } from 'antd'
import { University, UserRound } from 'lucide-react';
import { FunctionComponent } from 'react'

interface Props {
  open: boolean;
  onCancel: () => void;
  onInstitution: () => void;
  onStudent: () => void;
}

const DomainSelect: FunctionComponent<Props> = ({ open, onCancel, onInstitution, onStudent }) => {
  const handleSelectStudent = () => {
    onStudent();
    onCancel();
  };

  const handleSelectInstitution = () => {
    onInstitution();
    onCancel();
  };

  return (
    <Modal
      title={null}
      open={open}
      footer={null}
      onCancel={onCancel}
      centered
    >
      <div className="flex items-center justify-center p-10 gap-10">
        <div className='flex flex-col items-center gap-3'>
          <Button
            onClick={handleSelectStudent}
            className='px-6 py-8 border-0 border-primary hover:border shadow bg-primary/20 rounded'
          >
            <UserRound />
          </Button>
          <p className='text-base'>I am a student</p>
        </div>
        <div className='flex flex-col items-center gap-3'>
          <Button
            onClick={handleSelectInstitution}
            className='px-6 py-8 border-0 border-primary hover:border shadow bg-primary/20 rounded'
          >
            <University />
          </Button>
          <p className='text-base'>This is an institution</p>
        </div>
      </div>
    </Modal>
  )
}

export default DomainSelect