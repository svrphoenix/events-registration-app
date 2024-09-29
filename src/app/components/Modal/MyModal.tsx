'use client';

import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';
import RegistrationForm from '../RegistationForm/RegistrationForm';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface IModalProps {
  eventId: string;
}

const MyModal: FC<IModalProps> = ({ eventId }) => {
  const router = useRouter();

  return (
    <>
      <Modal isOpen={true} onOpenChange={() => router.back()}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Participant registration
              </ModalHeader>
              <ModalBody>
                <RegistrationForm eventId={eventId} submitAction={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default MyModal;
