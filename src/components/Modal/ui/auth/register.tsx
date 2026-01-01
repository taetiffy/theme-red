"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";

import styles from "@/styles/auth/register.module.css";
import { StepAll } from "@/containers/StepAll";
import { UseCustomDisclosureReturn } from "@/hooks/useCustomDisclosure";
import Image from "next/image";

export default function RegisterModal({ disclosure }: { disclosure: UseCustomDisclosureReturn }) {

  return (
    <Modal
      isOpen={disclosure.state.isOpen}
      onClose={disclosure.state.onClose}
      placement="center"
      className={`${styles.RegisterModal}`}
    >
      <ModalContent className={styles.RegisterContentRoot}>
        <div className={styles.RegisterContainer}>
          <div className={`flex flex-col md:flex-row`}>
            <div className={'h-0 md:h-170 w-full md:w-[50%] md:block hidden overflow-hidden'}>
              <Image width="1080" height="240" alt='banner' className={'w-full h-full object-cover object-top'} src="https://cdn.zabbet.com/KPFM/lobby_settings/a688dc32-91b0-43be-955d-a83422edbfc4.jpg"  />
            </div>

            <div className={styles.RegisterPanel}>
              <div className={styles.RegisterCard}>
                <ModalHeader className={styles.RegisterHeader}>
                  <div className="flex flex-col justify-center items-center">
                    <span className=" text-center text-2xl">สมัครสมาชิก</span>
                    <span className=" text-center text-base text-white/70 font-light">ลงทะเบียนด้วยเบอร์โทรศัพท์</span>
                  </div>
                </ModalHeader>

                <ModalBody>
                  <StepAll />
                </ModalBody>
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
